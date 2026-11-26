import { getToken, isUserLogged } from "../utils/auth.js";
import { getMessageById, updateMessage } from "../models/messageModel.js";
import { hideError, showError } from "../utils/error.js";

const content = document.querySelector("#content");

// Récupération de l'ID
const params = new URLSearchParams(document.location.search);
const id = Number(params.get("id"));

async function onPageLoad() {
    !isUserLogged() ? window.location.href = "/" : null;

    // Récupération du message
    const token = getToken();

    try {
        const message = await getMessageById(id, token.token);

        // Affichage du message
        content.value = message.content;
    } catch (error) {
        showError("error", error)
    }


}

onPageLoad()

document.querySelector("#edit-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    hideError("error", error);

    const message = content.value;
    const token = getToken();

    try {
        const post = await updateMessage(id, message, token.token);
        
        window.location.href = "/mur.html";
    } catch(error) {
        showError("error", error);
    }


})