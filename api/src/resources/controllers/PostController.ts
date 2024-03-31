import { Request, Response } from "express";

import PostService from "~/resources/services/PostService";
import {
  InternalErrorException,
  sendApiExceptionResponseError,
} from "~/utils/exception";

const PostController = {
  getAllPosts: (req: Request, res: Response) => {
    const { query: filters } = req;

    PostService.findAll(filters)
      .then((posts) => {
        return res.status(200).json({
          status: true,
          data: posts,
        });
      })
      .catch((err) => {
        sendApiExceptionResponseError(
          res,
          new InternalErrorException(err.message.tostring())
        );
      });
  },

  getPostById: (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;

    PostService.findOne({ id })
      .then((post) => {
        res.status(200).json({
          status: true,
          data: post,
        });
      })
      .catch((err) => {
        sendApiExceptionResponseError(
          res,
          new InternalErrorException(err.message.tostring())
        );
      });
  },

  getPostBySlug: (req: Request, res: Response) => {
    const {
      params: { slug },
    } = req;

    PostService.findOne({ slug })
      .then((post) => {
        res.status(200).json({
          status: true,
          data: post,
        });
      })
      .catch((err) => {
        sendApiExceptionResponseError(
          res,
          new InternalErrorException(err.message.tostring())
        );
      });
  },

  deletePost: (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;

    PostService.delete({ id })
      .then((numberOfEntriesDeleted) => {
        res.status(200).json({
          status: true,
          data: numberOfEntriesDeleted,
        });
      })
      .catch((err) => {
        sendApiExceptionResponseError(
          res,
          new InternalErrorException(err.message.tostring())
        );
      });
  },

  updatePost: (req: Request, res: Response) => {
    /*
      @todos
        - User can provide an options where they decide if they want a 204 (no body) or 200 (affectedRows and/or updated data)
    */
    const {
      params: { id },
      body: payload,
    } = req;

    PostService.update({ id }, payload)
      .then((numberOfEntriesAffected) => {
        return PostService.findOne({ id });
      })
      .then((post) => {
        return res.status(200).json({
          status: true,
          data: post,
        });
      })
      .catch((err) => {
        sendApiExceptionResponseError(
          res,
          new InternalErrorException(err.message.tostring())
        );
      });
  },

  createPost: (req: Request, res: Response) => {
    const { body: payload } = req;

    PostService.add(payload)
      .then((post) => {
        res.status(200).json({
          status: true,
          data: post,
        });
      })
      .catch((err) => {
        sendApiExceptionResponseError(
          res,
          new InternalErrorException(err.message.tostring())
        );
      });
  },
};

export default PostController;
