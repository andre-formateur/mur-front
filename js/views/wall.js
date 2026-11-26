import { getCurrentUser, disconnectUser } from "../models/authModel.js";
import { getAllMessages } from "../models/messageModel.js";
import { getToken, removeToken, isUserLogged } from "../utils/auth.js";
import { buildPost } from "../builders/builder.js";

async function onPageLoad() {

    !isUserLogged() ? window.location.href = "/" : null;

    // On récupère le token de l'utilisateur
    const dataToken = getToken();

    // Récupérer l'utilisateur courant
    try {
        const currentUser = await getCurrentUser(dataToken);

        // On va afficher l'utilisateur
        const username = document.querySelector("#username");
        username.textContent = currentUser.username;

        createMessage();
        

    } catch (error) {
        removeToken();
        window.location.href = "/";
    }

}

async function createMessage() {
    const token = getToken();

    const messages = await getAllMessages(token.token);
    const container = document.querySelector("#message-list");

    messages.forEach(message => {
        const post = buildPost(message, token.user);
        container.appendChild(post);
    })
}

onPageLoad();

document.querySelector("#logout-button").addEventListener("click", async () => {
    const dataToken = getToken();
    removeToken();
    try {
        await disconnectUser(dataToken);
    } finally {
        window.location.href = "/"
    }
})