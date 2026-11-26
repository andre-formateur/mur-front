export function showError(id, message) {
    const el = document.querySelector(`#${id}`)
    el.textContent = message;
}

export function hideError(id) {
    const el = document.querySelector(`#${id}`)
    el.textContent = "";
}