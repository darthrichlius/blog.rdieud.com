import { Router } from "express";
import { AuthController } from "~/resources/controllers";
import { SchemaValidationMiddleware as schemaVerify } from "~/middlewares";
import { loginPayload, registerPayload } from "~/resources/schemas";

const AuthRoutes = Router();

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Authenticate the API user and provide the authentication token
 *    tags: [Authentication]
 *    security: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                pattern: '^(?=.*[\d])[\w\d]{3,20}$'
 *                description: The title of your user
 *              password:
 *                type: string
 *                format: password
 *                pattern: '^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*[A-Z])(?=.*\d).{8,20}$'
 *                description: The password used for authentication (will be encrypted)
 *    responses:
 *      200:
 *        description: The operation response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/AuthResponse"
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      401:
 *         $ref: '#/components/responses/Unauthorized'
 *      403:
 *         $ref: '#/components/responses/Forbidden'
 *      500:
 *         $ref: '#/components/responses/InternalError'
 */
AuthRoutes.post("/login", [schemaVerify(loginPayload)], AuthController.login);
/**
 * ! /!\ NOTICE /!\
 * Registration is different from "User.create"
 * Registration implies:
 *  - Break the current connection if exists
 *  - Create an account
 *  - Provide a a token
 */

/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Register and Authenticate a new user
 *    tags: [Authentication]
 *    security: []
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - firstname
 *               - lastname
 *             properties:
 *               username:
 *                 type: string
 *                 pattern: '^(?=.*[\d])[\w\d]{3,20}$'
 *                 description: The title of your user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email related to the user
 *               password:
 *                 type: string
 *                 format: password
 *                 pattern: '^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*[A-Z])(?=.*\d).{8,20}$'
 *                 description: The password used for authentication (will be encrypted)
 *               firstname:
 *                 type: string
 *                 description: The user firstname
 *               lastname:
 *                 type: string
 *                 description: The user lastname
 *    responses:
 *      200:
 *        description: The operation response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/AuthResponse"
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      401:
 *         $ref: '#/components/responses/Unauthorized'
 *      403:
 *         $ref: '#/components/responses/Forbidden'
 *      500:
 *         $ref: '#/components/responses/InternalError'
 */
AuthRoutes.post(
  "/signup",
  [schemaVerify(registerPayload)],
  AuthController.register
);

/**
 * @swagger
 * /register:
 *  post:
 *    summary: (ALIAS) Register and Authenticate a new user
 *    tags: [Authentication]
 *    security: []
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - firstname
 *               - lastname
 *             properties:
 *               username:
 *                 type: string
 *                 pattern: '^(?=.*[\d])[\w\d]{3,20}$'
 *                 description: The title of your user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email related to the user
 *               password:
 *                 type: string
 *                 format: password
 *                 pattern: '^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*[A-Z])(?=.*\d).{8,20}$'
 *                 description: The password used for authentication (will be encrypted)
 *               firstname:
 *                 type: string
 *                 description: The user firstname
 *               lastname:
 *                 type: string
 *                 description: The user lastname
 *    responses:
 *      200:
 *        description: The operation response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/AuthResponse"
 *      400:
 *         $ref: '#/components/responses/BadRequest'
 *      401:
 *         $ref: '#/components/responses/Unauthorized'
 *      403:
 *         $ref: '#/components/responses/Forbidden'
 *      500:
 *         $ref: '#/components/responses/InternalError'
 */
AuthRoutes.post(
  "/register",
  [schemaVerify(registerPayload)],
  AuthController.register
);

export default AuthRoutes;
