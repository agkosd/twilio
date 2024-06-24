import { sendWhatsAppMessage } from "./twilio";
import { GoogleGenerativeAI } from "@google/generative-ai";

import cron from "node-cron";

export function scheduleDailyStoicQuote(to: string) {
    cron.schedule('0 9 * * *', async () => {  // Every day at 9 AM
        const stoicQuote = await getStoicQuote();
        await sendWhatsAppMessage(to, stoicQuote);
    }, {
        scheduled: true,
        timezone: "America/New_York"
    });
}

export async function getStoicQuote(): Promise<string> {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Generate a stoic quote"

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
}