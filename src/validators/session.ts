import { body, query, ValidationChain } from "express-validator/check";

export function sessionValidator(method: string): ValidationChain[] {
    switch (method) {
        case "POST /sessions/login": {
            return [
                body("email", "Invalid or missing 'email'").exists().isEmail(),
                body("password", "Invalid or missing 'password'").exists().isString()
            ];
        }
        case "POST /sessions/introspect": {
            return [
                query("token", "Missing 'token'").exists()
            ];
        }
    }
}