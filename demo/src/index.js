
import { info, log } from "@randajan/simple-lib/node";
import { getIBAN } from "../../dist/index.js";


console.log(getIBAN("CZ", "3030", "1440052036"));
console.log(getIBAN('GB', 'WEAK123456', '12345678', true));