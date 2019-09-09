export function validateProduct(product) {
    return product && typeof product === "string"; 
}

export function validateQuantity(quantity) {
    if (!quantity) {
        return false;
    }

    if (typeof quantity !== "string") {
        return false;
    }

    const number = Number(quantity);
    if (!number) {
        return false;
    }

    const roundedNumber = Math.floor(number);
    if (String(roundedNumber) !== quantity){
        return false;
    }

    if (roundedNumber < 1 || roundedNumber > 1000) {
        return false;
    }

    return true;
}

export function validateActive(active) {
    return active && (active === activeValues.yes || active === activeValues.no); 
}

export const activeValues = {
    yes: "Yes",
    no: "No"
};

export const validMessage = "Looks good!";

export const errorMessages = {
    product: "Product must be provided and valid",
    quantity: "Quantity must be provided and have value between 1 and 1000",
    active: "Active must be valid",
};