# WhatsApp Chatbot with Twilio and TypeScript

This project implements a WhatsApp chatbot using Twilio, TypeScript, and Express. The chatbot interacts with users based on a decision tree, sending them cute animal images and stoic quotes as needed.

## Features

- **WhatsApp Integration**: Communicate with users via WhatsApp.
- **Decision Tree**: Guide users through a predefined set of questions and responses.
- **Cute Dog Images**: Send cute dog images to users.
- **Daily Stoic Quotes**: Send daily stoic quotes to users.
- **SMS Support**: Send SMS messages for specific scenarios.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Twilio Account](https://www.twilio.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone 
2. Install the required packages:
    ```bash
    npm install
3. Create a .env file in the root folder with the following variables: 
    PORT=3000
    GOOGLE_API_KEY=your_google_gemini_key
    TWILIO_ACCOUNT_SID=your_account_sid
    TWILIO_AUTH_TOKEN=your_auth_token
    TWILIO_WHATSAPP_NUMBER=your_whatsapp_number
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
4. To run the project in dev mode:
    ```bash
    npm run dev
