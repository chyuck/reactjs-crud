import { activeValues } from "./validator";

export function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

export function formatActive(active) {
    return active ? activeValues.yes : activeValues.no;
}