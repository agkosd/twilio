import axios from "axios";

export async function generateCuteAnimalImage(): Promise<string> {
    try {
        const res = await axios.get("https://dog.ceo/api/breeds/image/random");
        const message = res.data.message;

        return message;
    } catch (e) {
        return "www.google.com"
    }
}