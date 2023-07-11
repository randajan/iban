import { getCountry } from "./class/Country";
import { validIBAN } from "./const";



export const validateIBAN = iban=>{
    return validIBAN.test(iban);
}

export const formatIBAN = iban=>{
    if (!validateIBAN(iban)) { return ""; } 
    return String(iban).split('').reduce((a, b) => a + ((a.length + 1) % 5 === 0 ? ' ' : '') + b);
}

export const getIBAN = (country, bank, account, format=false)=>getCountry(country).getIBAN(bank, account, format);