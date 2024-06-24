import express,
{
    Express,
    Request,
    Response
} from "express";

import bodyParser from 'body-parser';
import twilio from 'twilio';
import dotenv from 'dotenv';

import { decisionTree } from "./decisionTree";
import { sendSmsMessage, sendWhatsAppMessage } from "./external/twilio";
import { generateCuteAnimalImage } from "./external/generateAnimal";
import { scheduleDailyStoicQuote } from "./external/getStoicQuote";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

export const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req: Request, res: Response) => {
    res.send("");
});

const usersNeedingDailyQuotes: Set<string> = new Set();
app.post('/webhook', async (req: Request, res: Response) => {
    const incomingMessage = req.body.Body.toLowerCase().trim();
    const fromNumber = req.body.From;

    try {
        let responseMessage;

        switch (incomingMessage) {
            case '1':
            case 'y':
                responseMessage = "Glad to hear that! Would you like to recieve daily stoic quotes? reply with 'daily-quote'";
                break;
            case '2':
            case 'n':
                responseMessage = decisionTree[2];
                break;
            case 'yes':
                const imageUrl = await generateCuteAnimalImage();
                const response = new twilio.twiml.MessagingResponse();
                const message = response.message("Here's a cute animal image for you:");

                message.media(imageUrl);
                response.message("Did this help you? reply with 'Y' or 'N' ")
                responseMessage = response.toString();
                break;
            case 'daily-quote':
                usersNeedingDailyQuotes.add(fromNumber);
                responseMessage = "Great! We'll send you a daily stoic quote.";
                scheduleDailyStoicQuote(fromNumber);
                break;
            case 'no':
                if (incomingMessage.includes('did this help')) {
                    responseMessage = decisionTree["no"];
                } else {
                    responseMessage = decisionTree["final_no"];
                    await sendSmsMessage(fromNumber.replace("whatsapp:",""), responseMessage);
                    res.sendStatus(200);
                    return;
                }
                break;
            default:
                responseMessage = decisionTree.initial;
        }

        if (responseMessage.includes('<Response>')) {
            res.type('text/xml').send(responseMessage);
        } else {
            await sendWhatsAppMessage(fromNumber, responseMessage);
            res.sendStatus(200);
        }
    } catch (error) {
        console.error('Error:', error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});