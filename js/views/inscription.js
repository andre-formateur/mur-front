import { registerUser } from "../models/authModel.js";
import { setToken } from "../utils/auth.js";
import { showError, hideError } from "../utils/error.js";

document.querySelector("#register-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const errorId = "error";
    hideError(errorId);


    // Récupérer l'usernme, l'email et le password
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        // Essayer de se connecter avec l'email et le password
        const dataToken = await registerUser(username, email, password);

        // On stock le token et l'expiration reçu dans le localStorage 
        setToken(dataToken);

        // On redirige vers le wall
        window.location.href = "/mur.html";
    } catch (error) {
        showError(errorId, error);
    }


})