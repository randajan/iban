import { unitsToRegEx, validPatternPart } from "../const";


const decodePart = partStr=>{
    const m = partStr.match(validPatternPart);
    if (!m || m.length < 3) { throw Error(`Invalid pattern part '${partStr}'`) }
    return { size:parseInt(m[1]), unit:m[2] };
}

class Pattern {
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

        this.regex = new RegExp("^"+this.regexStr+"$");
    
    }

    simplify(value) {
        return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    }

    validate(value, simplify=true) {
        if (!value) { throw Error(`Missing ${this.label}`); }
        if (simplify) { value = this.simplify(value); }
        const passed = this.regex.test(value);
        return { value, passed }
    }

    isValid(value, simplify=true) {
        return this.validate(value, simplify).passed;
    }

    align(value) {
        const vld = this.validate(value, true);
        if (vld.passed) { return vld.value.padStart(this.size, "0"); }
        throw Error(`Provided ${this.label} '${value}' doesn't match pattern '${this.patternStr}'`);
    }
}

export const getPattern = (label, patternStr)=>new Pattern(label, patternStr);