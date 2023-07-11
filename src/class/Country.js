import iso7064 from "iso-7064";
import countriesDefs from "../countriesDefs";
import { getPattern } from "./Pattern";
import { formatIBAN, validateIBAN } from "../index";
import { validIBAN } from "../const";

const _cache = {};

class Country {
    constructor(countryCode) {
        if (!countryCode) { throw Error(`Missing countryCode`); }

        const countryRaw = countriesDefs[countryCode];
        if (!countryRaw) { throw Error(`Unknown countryCode '${countryCode}'`); }

        this.code = countryCode;
        this.label = countryRaw.country;
        this.bank = getPattern("bankCode", countryRaw.bank);
        this.account = getPattern("accountCode", countryRaw.account);
    
    }

    align(bank, account) {
        return this.bank.align(bank)+this.account.align(account);
    }

    getIBAN(bank, account, format=false) {
        const bban = this.align(bank, account);

        const iban = this.code + ('0' + (98 - iso7064.computeWithoutCheck(bban + this.code + '00'))).slice(-2) + bban;

        return format ? formatIBAN(iban) : iban;
    }

}

export const getCountry = countryCode=>_cache[countryCode] || (_cache[countryCode] = new Country(countryCode));
