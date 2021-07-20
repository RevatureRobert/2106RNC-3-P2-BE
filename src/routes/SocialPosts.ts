import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import logger from "../shared/Logger";
import SocialPostDao from "../daos/SocialPost/SocialPostDao";
import { paramMissingError } from "../shared/constants";

const socialPostDao = new SocialPostDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

//************************************************************************************************
//* Get Operators
//************************************************************************************************

/** COMPLETED!
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllPosts(req: Request, res: Response) {
  logger.info("getAllPosts Controller");
  const posts = await socialPostDao.getAll();
  return res.status(OK).json({posts});
}

/** COMPLETED!
 *
 * @param req
 * @param res
 * @returns
 */
export async function getMainPosts(req: Request, res: Response) {
  logger.info("getMainPosts Controller");
  const { socialPosts } = req.body;
  if (!socialPosts) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const post = await socialPostDao.getPost(socialPosts);
  return res.status(OK).json({ post });
}

/** COMPLETED!
 *
 * @param req
 * @param res
 * @returns
 */
export async function getComments(req: Request, res: Response) {
  logger.info("getComments Controller");
  const { socialPosts } = req.body;
  if (!socialPosts) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const post = await socialPostDao.getComments(socialPosts);
  return res.status(OK).json({ post });
}

//************************************************************************************************
//* Post Operators
//************************************************************************************************

/** COMPLETED!
 *
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function addMainPost(req: Request, res: Response) {
  logger.info("addMainPost Controller");
  const { socialPosts } = req.body;
  if (!socialPosts) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  await socialPostDao.addMainPost(socialPosts);
  return res.status(CREATED).end();
}

/** COMPLETED!
 *
 * @param req
 * @param res
 * @returns
 */
export async function addComment(req: Request, res: Response) {
  logger.info("addComment Controller");
  const { socialPosts } = req.body;
  if (!socialPosts) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  await socialPostDao.addComment(socialPosts);
  return res.status(CREATED).end();
}

//************************************************************************************************
//* Put Operators
//************************************************************************************************

/** COMPLETED!
 *
 * @param req
 * @param res
 * @returns
 */
export async function addLikeDislike(req: Request, res: Response) {
  logger.info("addLikeDislike Controller");
  const { socialPosts } = req.body;
  if (!socialPosts) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  await socialPostDao.addMainPost(socialPosts);
  return res.status(CREATED).end();
}

/** COMPLETED!
 *
 * Update one post.
 *
 * @param req
 * @param res
 * @returns
 */
export async function updateOnePost(req: Request, res: Response) {
  logger.info("updateOnePost Controller");
  const { socialPosts } = req.body;
  if (!socialPosts) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  await socialPostDao.updateComment(socialPosts);
  return res.status(OK).end();
}

//************************************************************************************************
//* Delete Operators
//************************************************************************************************

/** COMPLETED!
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteOnePost(req: Request, res: Response) {
  logger.info("deleteOnePost Controller");
  const { socialPosts } = req.body;
  if (!socialPosts) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  await socialPostDao.deletePost(socialPosts);
  return res.status(OK).end();
}
