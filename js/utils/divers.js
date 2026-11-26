export function formatDate(date) {
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Paris",
    }).format(new Date(date));
}