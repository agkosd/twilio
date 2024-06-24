import { twilioClient } from "..";

export async function sendWhatsAppMessage(to: string, message: string) {
    await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to
    });
}

export async function sendSmsMessage(to: string, message: string) {
    await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to
    });
}