import { Router } from "express";
import { storeController } from "../controllers/store";
import { storeValidator } from "../validators/store";

const storeRouter: Router = Router();

/**
 * @swagger
 * /stores:
 *  get:
 *      description: Gets all Stores
 *      tags:
 *          - Stores
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: Returns all Stores
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal server error
 */
storeRouter.get("/", storeValidator("GET /stores"), storeController.index);

/**
 * @swagger
 * /stores/{storeId}:
 *  get:
 *      description: Gets a specific Store
 *      tags:
 *          - Stores
 *      parameters:
 *          - in: path
 *            name: storeId
 *            description: ID of the Store to get
 *            schema:
 *                  type: string
 *                  required: true
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: Returns specific Store
 *          404:
 *              description: Store with given ID not found
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal server error
 */
storeRouter.get("/:storeId", storeValidator("GET /stores/:storeId"), storeController.show);

/**
 * @swagger
 * /stores:
 *  post:
 *      description: Creates a new Store
 *      tags:
 *          - Stores
 *      parameters:
 *          - in: body
 *            name: storeData
 *            description: Properties of the new Store
 *            schema:
 *                type: object
 *                properties:
 *                    email:
 *                        type: string
 *                example:
 *                    email: "example@gmail.com"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Returns new Store
 *          400:
 *              description: Store already exists
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal server error
 */
storeRouter.post("/", storeValidator("POST /stores"), storeController.create);

/**
 * @swagger
 * /stores/{storeId}:
 *  put:
 *      description: Updates a specific Store
 *      tags:
 *          - Stores
 *      parameters:
 *          - in: path
 *            name: storeId
 *            description: ID of the Store to update
 *            schema:
 *                type: string
 *                required: true
 *          - in: body
 *            name: storeData
 *            description: properties to be can be updated
 *            schema:
 *                type: object
 *                properties:
 *                    email:
 *                        type: string
 *                example:
 *                    email: "example@gmail.com"
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: Returns updated Store
 *          404:
 *              description: Store not found
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal server error
 */
storeRouter.put("/:storeId", storeValidator("PUT /stores/:storeId"), storeController.update);

/**
 * @swagger
 * /store/{storeId}:
 *  delete:
 *      description: Deletes a specific Store
 *      tags:
 *          - Stores
 *      parameters:
 *           - in: path
 *             name: storeId
 *             schema:
 *                 type: string
 *                 required: true
 *             description: ID of the Store to delete
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: Store was successfully deleted
 *          422:
 *              description: Validation error
 *          500:
 *              description: Internal server error
 */
storeRouter.delete("/:storeId", storeValidator("DELETE /stores/:storeId"), storeController.delete);

export { storeRouter };