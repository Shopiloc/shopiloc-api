import { Router } from "express";
import { sessionController } from "../controllers/session";
import { sessionValidator } from "../validators/session";

const sessionRouter: Router = Router();

/**
 * @swagger
 * /sessions/login:
 *  post:
 *      description: Creates a new token
 *      tags:
 *          - Sessions
 *      parameters:
 *          - in: body
 *            name: sessionData
 *            description: email and password
 *            schema:
 *                type: object
 *                properties:
 *                    email:
 *                        type: string
 *                    password:
 *                        type: integer
 *                example:
 *                    email: "example@gmail.com"
 *                    password: "password"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Returns new Token
 *          400:
 *              description: Invalid email or password
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal server error
 */
sessionRouter.post("/login", sessionValidator("POST /sessions/login"), sessionController.login);

/**
 * @swagger
 * /sessions/introspect:
 *  post:
 *      description: Validates token
 *      tags:
 *          - Sessions
 *      parameters:
 *          - in: query
 *            name: token
 *            schema:
 *                 type: boolean
 *            description: ?token=JWT_TOKEN
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Returns payload and token status
 *          401:
 *              description: Returns token status
 *          422:
 *              description: Validation error
 */
sessionRouter.post("/introspect", sessionValidator("POST /sessions/introspect"), sessionController.introspect);

export { sessionRouter };