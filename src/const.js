


export const validPatternPart = /^([0-9]+)([anc])$/;

export const validIBAN = /^[A-Z]{2}[0-9]{2}[0-9A-Z]{11,30}$/;

export const unitsToRegEx = {
    "a":"[A-Z]",
    "n":"[0-9]",
    "c":"[A-Z0-9]"
}