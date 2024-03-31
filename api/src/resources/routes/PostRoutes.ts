/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - slug
 *         - title
 *         - isPublished
 *         - userId
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated ID of the post
 *         slug:
 *           type: string
 *           formt: slug
 *           description: The slug of the post for SEO-friendly URLs. The slug is unique and autommatically generated based on the title
 *         title:
 *           type: string
 *           description: The title of the post
 *         body:
 *           type: string
 *           description: The content/body of the post
 *         isPublished:
 *           type: boolean
 *           description: Indicates if the post is published or not
 *         userId:
 *           type: integer
 *           description: The ID reference to the User (the author of the post)
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the Post was added (Automatically generated)
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date of the last update (Automatically generated)
 *       example:
 *         id: 1
 *         slug: Just-another-post-title
 *         title: Just anothe post title
 *         body: Lorem ipsum
 *         isPublished: false
 *         userId: 1
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-11T04:05:06.157Z
 */
import { Router } from "express";
import {
  IsAuthenticatedMiddleware as checkAuthenticated,
  CheckPermissionMiddleware as checkPermission,
  SchemaValidationMiddleware as schemaValidation,
} from "~/middlewares";

import { PostController } from "~/resources/controllers";
import { postCreatePayload, postUpdatePayload } from "~/resources/schemas";

const PostRoutes = Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lists all the available posts
 *     tags: [Posts]
 *     security: []
 *     responses:
 *       200:
 *         description: Collection of the Posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Post"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
PostRoutes.get("/", [], PostController.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get the Post by id
 *     tags: [Posts]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Post id
 *     responses:
 *       200:
 *         description: The Post response by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Post"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
PostRoutes.get("/:id", [], PostController.getPostById);

/**
 * @swagger
 * /posts/slug/{slug}:
 *   get:
 *     summary: Get the Post by slug
 *     tags: [Posts]
 *     security: []
 *     parameters:
 *      - in: path
 *        name: slug
 *        schema:
 *          type: string
 *        required: true
 *        description: The Post slug
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
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
PostRoutes.get("/slug/:slug", [], PostController.getPostBySlug);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Remove the Post by id
 *     tags:
 *       - Posts
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Post id
 *     responses:
 *       204:
 *         description: The resource was deleted successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
PostRoutes.delete("/:id", [], PostController.deletePost);

/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Update the Post by id
 *     tags:
 *       - Posts
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Post"
 *     responses:
 *       200:
 *         description: The updated Post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
PostRoutes.patch(
  "/:id",
  [checkAuthenticated, checkPermission(), schemaValidation(postUpdatePayload)],
  PostController.updatePost
);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new Post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                - title
 *                - isPublished
 *                - userId
 *             properties:
 *                title:
 *                  type: string
 *                  description: The title of the post
 *                body:
 *                  type: string
 *                  description: The content/body of the post
 *                isPublished:
 *                  type: boolean
 *                  description: Indicates if the post is published or not
 *                userId:
 *                  type: integer
 *                  description: The ID reference to the User (the author of the post)
 *     responses:
 *       200:
 *         description: The created Post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
PostRoutes.post(
  "/",
  [checkAuthenticated, checkPermission(), schemaValidation(postCreatePayload)],
  PostController.createPost
);

export default PostRoutes;
