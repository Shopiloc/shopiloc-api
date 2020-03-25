import * as zipcodes from "zipcodes"

const storeUtil = {
    generatePostalCodes: (country: string, postalCode: string): string[] => {
        postalCode = postalCode.toLowerCase().trim()
        country = country.toLowerCase()

        let postalCodes;
        if (country == "canada" || country == "united states"){
            const postalCodesInRadius = zipcodes.radius(postalCode, 5);
            if (country.toLowerCase() == "canada"){
                let area = postalCode.substr(0, 3);
                postalCodes.push(area.toLowerCase());
            } else {
                postalCodes.push(postalCode);
            }
                
            postalCodesInRadius.forEach(code => {
                code = code.toLowerCase()
                postalCodes.push(code)
            });
        } else {
            if (postalCode.includes(",")) {
                const postalCodeBuffer = postalCode.split(",");
                postalCodeBuffer.forEach(code => {
                    if (code != " ") {
                        let codes = code.trim().split(/\s*,\s*/);
                        code = codes[0].replace(/ /g,'');
                        code = code.toLowerCase();
                        if (code != "") {
                            postalCodes.push(code);
                        }
                    }
                });
            } else {
                postalCodes = postalCode;
            }
        }

        return postalCodes;
    }
}

export { storeUtil };