export function formatDate(date) {
    return new Date(date).toDateString().split(" ").splice(1).join(" ");
}