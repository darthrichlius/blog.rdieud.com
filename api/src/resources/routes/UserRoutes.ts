/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *         - password
 *         - firstname
 *         - lastname
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           pattern: '^(?=.*[\d])[\w\d]{3,20}$'
 *           description: The title of your user
 *         email:
 *           type: string
 *           format: email
 *           description: The email related to the user
 *         password:
 *           type: string
 *           format: password
 *           pattern: '^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*[A-Z])(?=.*\d).{8,20}$'
 *           description: The password used for authentication (will be encrypted)
 *         firstname:
 *           type: string
 *           description: The user firstname
 *         lastname:
 *           type: string
 *           description: The user lastname
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added (Automatically generated)
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date of the last update (Automatically generated)
 *       example:
 *         id: 1
 *         username: johnDoe_1
 *         email: john.doe@domain.tld
 *         password: Pwd.12345678
 *         firstname: John
 *         lastname: Doe
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-11T04:05:06.157Z
 */
import { Router } from "express";

import {
  IsAuthenticatedMiddleware as checkAuthenticated,
  CheckPermissionMiddleware as checkPermission,
  SchemaValidationMiddleware as schemaValidation,
} from "~/middlewares";

import { UserController } from "~/resources/controllers";
import { userCreatePayload, userUpdatePayload } from "~/resources/schemas";

const UserRoutes = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Collection of the Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
UserRoutes.get("/", [checkAuthenticated], UserController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The User response by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
UserRoutes.get("/:id", [checkAuthenticated], UserController.getUserById);

/**
 * @swagger
 * /users/username/{username}:
 *   get:
 *     summary: Get the user by username
 *     tags: [Users]
 *     parameters:
 *      - in: path
 *        name: username
 *        schema:
 *          type: string
 *        required: true
 *        description: The user username
 *     responses:
 *       200:
 *         description: The User response by username
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: "#/components/schemas/User"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
UserRoutes.get(
  "/username/:username",
  [checkAuthenticated],
  UserController.getUserByUsername
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags:
 *       - Users
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *     responses:
 *       204:
 *         description: The resource was deleted successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
UserRoutes.delete(
  "/:id",
  [checkAuthenticated, checkPermission()],
  UserController.deleteUser
);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update the User by id
 *     tags:
 *       - Users
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: The updated User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
UserRoutes.patch(
  "/:id",
  [checkAuthenticated, checkPermission(), schemaValidation(userUpdatePayload)],
  UserController.updateUser
);

/**
 * The main differences between this operation and the register one lie on the permission and the response
 * The "User.Create" operation response is the User object while register response is the token
 * The common usage of "User.Create" is to create a new user by an existing user who has the proper permissions
 *
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
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
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
UserRoutes.post(
  "/",
  [checkAuthenticated, checkPermission(), schemaValidation(userCreatePayload)],
  UserController.createUser
);

export default UserRoutes;
