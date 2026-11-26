import { getCurrentUser, disconnectUser } from "../models/authModel.js";
import { getAllMessages, createMessage, deleteMessage } from "../models/messageModel.js";
import { getToken, removeToken, isUserLogged } from "../utils/auth.js";
import { buildPost } from "../builders/builder.js";
import { showError } from "../utils/error.js";

const container = document.querySelector("#message-list");

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

        displayMessage();
        

    } catch (error) {
        removeToken();
        window.location.href = "/";
    }

}

async function onPostDelete(id, item) {
    const token = getToken();
    try {
        await deleteMessage(id, token.token)
        item.remove();
        addEmptyPostMessage();
    } catch (error) {
        showError("wall-error", error)
    }
}

async function displayMessage() {
    const token = getToken();

    const messages = await getAllMessages(token.token);

    messages.forEach(message => {
        const post = buildPost(message, token.user, onPostDelete);
        container.appendChild(post);
    })
    
    addEmptyPostMessage();
}

onPageLoad();

// Clique sur le bouton de déconnexion
document.querySelector("#logout-button").addEventListener("click", async () => {
    const dataToken = getToken();
    removeToken();
    try {
        await disconnectUser(dataToken);
    } finally {
        window.location.href = "/"
    }
})

// Soumission du message
document.querySelector("#message-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = getToken();
    
    // On récupère la valeur du contenu
    const contentTextarea = document.querySelector("#content");
    const content = contentTextarea.value;

    try {
        // Créer le message en l'envoyant à l'API
        const message = await createMessage(content, token.token)

        // Afficher le message dans le mur
        const post = buildPost(message, token.user, onPostDelete);
        container.prepend(post);

        contentTextarea.value = "";
        removeEmptyPostMessage();
    } catch (error) {
        showError("message-error", error);
    }

})


function removeEmptyPostMessage() {
    const li = document.querySelectorAll(".empty");

    li.forEach(item => {
        item.remove();
    })
}

function addEmptyPostMessage() {
    const items = container.querySelectorAll("li");

    if(items.length === 0) {
        const li = document.createElement("li");
        li.classList.add("empty");
        li.textContent = "Aucun message trouvé";
        container.appendChild(li);
    }
}