export const decisionTree = {
    initial: "How are you feeling today? Reply with '1' for good or '2' for not good.",
    2: "Would you like to see an image of a cute animal? Reply with 'yes' or 'no'.",
    "yes": "Did this help? Reply with 'yes' or 'no'.",
    "no": "Would you like to see more images of cute animals? Reply with 'yes' or 'no'.",
    "final_no": `
                We understand how hard it might be. Please remember that its Okay to not be okay. 
                We will send you a message on more details on how to avail more help. Please visit: https://findahelpline.com/
            `
};