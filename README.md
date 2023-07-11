
# Node @randajan/iban
[![NPM Version](http://img.shields.io/npm/v/@randajan/iban.svg?style=flat-square)](https://npmjs.com/package/@randajan/iban)
[![License](http://img.shields.io/npm/l/@randajan/iban.svg?style=flat-square)](http://opensource.org/licenses/MIT)

This library provides utility functions for validating and formatting International Bank Account Numbers (IBAN) using iso-7064 lib.

## Installation

Install the package using npm:

```bash
npm install @randajan/iban
```

or 

```bash
yarn add @randajan/iban
```

## Usage

Import the necessary functions from the @randajan/iban package:

```js
import { validateIBAN, formatIBAN, getIBAN } from '@randajan/iban';
```

### validateIBAN(iban)

This function validates the given IBAN.

Parameters:

- iban (string): The IBAN to validate.

Returns:

- true if the IBAN is valid.
- false if the IBAN is invalid.

### formatIBAN(iban)

This function formats the given IBAN by adding spaces every 4 characters.

Parameters:

- iban (string): The IBAN to format.

Returns:

- The formatted IBAN string with spaces every 4 characters.

### getIBAN(country, bank, account, format = false)

This function generates a valid IBAN for the specified country, bank, and account details.

Parameters:

- country (string): The country code (e.g., "GB", "DE").
- bank (string): The bank code.
- account (string): The account number.
- format (boolean): Optional. If true, the generated IBAN will be formatted with spaces every 4 characters (default is false).

Returns:

- The generated valid IBAN string.

## Examples

```js
import { validateIBAN, formatIBAN, getIBAN } from 'iban-utils';

const iban = 'GB32WEAK12345612345678';

console.log(validateIBAN(iban));  // Output: true
console.log(formatIBAN(iban));    // Output: 'GB32 WEAK 1234 5612 3456 78'

const generatedIBAN = getIBAN('GB', 'WEAK123456', '12345678', true);
console.log(generatedIBAN);      // Output: 'GB32 WEAK 1234 5612 3456 78'
```

## License
This project is licensed under the MIT License - see the [LICENSE file](https://github.com/randajan/iban/blob/main/LICENSE) for details.
