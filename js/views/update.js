import { isUserLogged } from "../utils/auth.js";

function onPageLoad() {
    !isUserLogged() ? window.location.href = "/" : null;
}

onPageLoad()