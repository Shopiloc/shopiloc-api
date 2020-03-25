import { body, param, ValidationChain } from "express-validator/check";

export function storeValidator(method: string): ValidationChain[] {
    switch (method) {
        case "GET /stores": {
            return [];
        }
        case "GET /stores/:storeId": {
            return [
                param("storeId", "Invalid or missing ':storeId'").exists().isMongoId()
            ];
        }
        case "POST /stores": {
            return [
                body("email", "Invalid or missing 'email'").exists().isEmail(),
                body("firstName", "Invalid or missing 'firstName'").exists().isString(),
                body("lastName", "Invalid or missing 'lastName'").exists().isString(),
                body("country", "Invalid or missing 'country'").exists().isString(),
                body("postalCodes", "Invalid or missing 'postalCodes'").exists().isString(),
                body("storeName", "Invalid or missing 'storeName'").exists().isString(),
                body("industry", "Invalid or missing 'industry'").exists().isString()
            ];
        }
        case "PUT /stores/:storeId": {
            return [
                param("storeId", "Invalid or missing ':storeId'").exists().isMongoId(),
            ];
        }
        case "DELETE /stores/:storeId": {
            return [
                param("storeId", "Invalid or missing ':storeId'").exists().isMongoId()
            ];
        }
    }
}
