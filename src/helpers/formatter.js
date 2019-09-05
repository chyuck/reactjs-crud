export function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}