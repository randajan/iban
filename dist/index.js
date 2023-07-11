// src/class/Country.js
import iso7064 from "iso-7064";

// src/countriesDefs.js
var countriesDefs_default = {
  "AD": { "country": "Andorra", "bank": "4n 4n", "account": "12c" },
  "AL": { "country": "Albania", "bank": "8n", "account": "16c" },
  "AT": { "country": "Austria", "bank": "5n", "account": "11n" },
  "BA": { "country": "Bosnia and Herzegovina", "bank": "3n 3n", "account": "8n 2n" },
  "BE": { "country": "Belgium", "bank": "3n", "account": "7n 2n" },
  "BG": { "country": "Bulgaria", "bank": "4a 4n", "account": "2n 8c" },
  "CH": { "country": "Switzerland", "bank": "5n", "account": "12c" },
  "CY": { "country": "Cyprus", "bank": "3n 5n", "account": "16c" },
  "CZ": { "country": "Czech Republic", "bank": "4n", "account": "16n" },
  "DE": { "country": "Germany", "bank": "8n", "account": "10n" },
  "DK": { "country": "Denmark", "bank": "4n", "account": "9n 1n" },
  "EE": { "country": "Estonia", "bank": "2n", "account": "2n 11n 1n" },
  "ES": { "country": "Spain", "bank": "4n 4n", "account": "2n 10n" },
  "FI": { "country": "Finland", "bank": "6n", "account": "7n 1n" },
  "FO": { "country": "Faroe Islands", "bank": "4n", "account": "9n 1n" },
  "FR": { "country": "France", "bank": "5n 5n", "account": "11c 2n" },
  "GB": { "country": "United Kingdom", "bank": "4a 6n", "account": "8n" },
  "GE": { "country": "Georgia", "bank": "2a", "account": "16n" },
  "GI": { "country": "Gibraltar", "bank": "4a", "account": "15c" },
  "GL": { "country": "Greenland", "bank": "4n", "account": "9n 1n" },
  "GR": { "country": "Greece", "bank": "3n 4n", "account": "16c" },
  "HR": { "country": "Croatia", "bank": "7n", "account": "10n" },
  "HU": { "country": "Hungary", "bank": "3n 4n", "account": "1n 15n 1n" },
  "IE": { "country": "Ireland", "bank": "4a 6n", "account": "8n" },
  "IL": { "country": "Israel", "bank": "3n 3n", "account": "13n" },
  "IS": { "country": "Iceland", "bank": "4n", "account": "2n 16n" },
  "IT": { "country": "Italy", "bank": "1a 5n 5n", "account": "12c" },
  "KW": { "country": "Kuwait", "bank": "4a", "account": "22c" },
  "KZ": { "country": "Kazakhstan", "bank": "3n", "account": "13c" },
  "LB": { "country": "Lebanon", "bank": "4n", "account": "20c" },
  "LI": { "country": "Liechtenstein", "bank": "5n", "account": "12c" },
  "LT": { "country": "Lithuania", "bank": "5n", "account": "11n" },
  "LU": { "country": "Luxembourg", "bank": "3n", "account": "13c" },
  "LV": { "country": "Latvia", "bank": "4a", "account": "13c" },
  "MC": { "country": "Monaco", "bank": "5n 5n", "account": "11c 2n" },
  "ME": { "country": "Montenegro", "bank": "3n", "account": "13n 2n" },
  "MK": { "country": "Macedonia", "bank": "3n", "account": "10c 2n" },
  "MR": { "country": "Mauritania", "bank": "5n 5n", "account": "11n 2n" },
  "MT": { "country": "Malta", "bank": "4a 5n", "account": "18c" },
  "MU": { "country": "Mauritius", "bank": "4a 4n", "account": "15n 3a" },
  "NL": { "country": "Netherlands", "bank": "4a", "account": "10n" },
  "NO": { "country": "Norway", "bank": "4n", "account": "6n 1n" },
  "PL": { "country": "Poland", "bank": "8n", "account": "16n" },
  "PT": { "country": "Portugal", "bank": "4n 4n", "account": "11n 2n" },
  "RO": { "country": "Romania", "bank": "4a", "account": "16c" },
  "RS": { "country": "Serbia", "bank": "3n", "account": "13n 2n" },
  "SA": { "country": "Saudi Arabia", "bank": "2n", "account": "18c" },
  "SE": { "country": "Sweden", "bank": "3n", "account": "16n 1n" },
  "SI": { "country": "Slovenia", "bank": "5n", "account": "8n 2n" },
  "SK": { "country": "Slovak Republic", "bank": "4n", "account": "16n" },
  "SM": { "country": "San Marino", "bank": "1a 5n 5n", "account": "12c" },
  "TN": { "country": "Tunisia", "bank": "2n 3n", "account": "13n 2n" },
  "TR": { "country": "Turkey", "bank": "5n", "account": "1c 16c" }
};

// src/const.js
var validPatternPart = /^([0-9]+)([anc])$/;
var validIBAN = /^[A-Z]{2}[0-9]{2}[0-9A-Z]{11,30}$/;
var unitsToRegEx = {
  "a": "[A-Z]",
  "n": "[0-9]",
  "c": "[A-Z0-9]"
};

// src/class/Pattern.js
var decodePart = (partStr) => {
  const m = partStr.match(validPatternPart);
  if (!m || m.length < 3) {
    throw Error(`Invalid pattern part '${partStr}'`);
  }
  return { size: parseInt(m[1]), unit: m[2] };
};
var Pattern = class {
  constructor(label, patternStr) {
    this.label = label;
    this.patternStr = patternStr;
    this.parts = [];
    this.size = 0;
    this.regexStr = "";
    for (const partStr of String(patternStr).split(" ")) {
      const part = decodePart(partStr);
      const { size, unit } = part;
      this.parts.push(part);
      this.size += size;
      this.regexStr += `${unitsToRegEx[unit]}{0,${size}}`;
    }
    this.regex = new RegExp("^" + this.regexStr + "$");
  }
  simplify(value) {
    return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  }
  validate(value, simplify = true) {
    if (!value) {
      throw Error(`Missing ${this.label}`);
    }
    if (simplify) {
      value = this.simplify(value);
    }
    const passed = this.regex.test(value);
    return { value, passed };
  }
  isValid(value, simplify = true) {
    return this.validate(value, simplify).passed;
  }
  align(value) {
    const vld = this.validate(value, true);
    if (vld.passed) {
      return vld.value.padStart(this.size, "0");
    }
    throw Error(`Provided ${this.label} '${value}' doesn't match pattern '${this.patternStr}'`);
  }
};
var getPattern = (label, patternStr) => new Pattern(label, patternStr);

// src/class/Country.js
var _cache = {};
var Country = class {
  constructor(countryCode) {
    if (!countryCode) {
      throw Error(`Missing countryCode`);
    }
    const countryRaw = countriesDefs_default[countryCode];
    if (!countryRaw) {
      throw Error(`Unknown countryCode '${countryCode}'`);
    }
    this.code = countryCode;
    this.label = countryRaw.country;
    this.bank = getPattern("bankCode", countryRaw.bank);
    this.account = getPattern("accountCode", countryRaw.account);
  }
  align(bank, account) {
    return this.bank.align(bank) + this.account.align(account);
  }
  getIBAN(bank, account, format = false) {
    const bban = this.align(bank, account);
    const iban = this.code + ("0" + (98 - iso7064.computeWithoutCheck(bban + this.code + "00"))).slice(-2) + bban;
    return format ? formatIBAN(iban) : iban;
  }
};
var getCountry = (countryCode) => _cache[countryCode] || (_cache[countryCode] = new Country(countryCode));

// src/index.js
var validateIBAN = (iban) => {
  return validIBAN.test(iban);
};
var formatIBAN = (iban) => {
  if (!validateIBAN(iban)) {
    return "";
  }
  return String(iban).split("").reduce((a, b) => a + ((a.length + 1) % 5 === 0 ? " " : "") + b);
};
var getIBAN = (country, bank, account, format = false) => getCountry(country).getIBAN(bank, account, format);
export {
  formatIBAN,
  getIBAN,
  validateIBAN
};
//# sourceMappingURL=index.js.map
