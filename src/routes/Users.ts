import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import UserDao from "../daos/User/UserDao";
import { paramMissingError } from "../shared/constants";

const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

//************************************************************************************************
//* Get Operators
//************************************************************************************************

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllUsers(req: Request, res: Response) {
  const users = await userDao.getAll();
  return res.status(OK).json({ users });
}

/**
 * Get one user by the username.
 *
 * @param req
 * @param res
 * @returns
 */
 export async function getOneUser(req: Request, res: Response) {
  const { username } = req.params;
  if (!username) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  } else {
    const userData = await userDao.getOne(username);
    return res.status(OK).json(userData);
  }
}

//************************************************************************************************
//* Post Operators
//************************************************************************************************

/**
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function addOneUser(req: Request, res: Response) {
  const { user } = req.body;
  if (!user) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  } else {
    await userDao.addUser(user);
    return res.status(CREATED).end();
  }
}

//************************************************************************************************
//* Put Operators
//************************************************************************************************

/**
 * Update one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function updateOneUser(req: Request, res: Response) {
  const { user } = req.body;
  if (!user) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const userData = await userDao.updateUser(user);
  return res.status(OK).json({ userData });
}

//************************************************************************************************
//* Delete Operators
//************************************************************************************************

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteOneUser(req: Request, res: Response) {
  const { user } = req.body;
  if (!user) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  } else {
    await userDao.deleteUser(user);
    return res.status(OK).end();
  }
}
