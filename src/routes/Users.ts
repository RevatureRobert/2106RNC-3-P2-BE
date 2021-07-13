import StatusCodes from "http-status-codes";
import {Request, Response} from "express";

import UserDao from "../daos/User/UserDao";
import {paramMissingError} from "@shared/constants";
import User from "../entities/User";

const userDao = new UserDao();
const {BAD_REQUEST, CREATED, OK} = StatusCodes;

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllUsers(req: Request, res: Response) {
    const users = await userDao.getAll();
    return res.status(OK).json({users});
}

/**
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function addOneUser(req: Request, res: Response) {
    const {username, first_name, last_name, phone_number, publicName} =
        req.params;

    const user = new User(
        username,
        first_name,
        last_name,
        phone_number,
        publicName
    );

    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError
        });
    }
    await userDao.add(user);
    return res.status(CREATED).end();
}

/**
 * Update one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function updateOneUser(req: Request, res: Response) {
    const {username, first_name, last_name, phone_number, publicName} =
        req.params;

    const user = new User(
        username,
        first_name,
        last_name,
        phone_number,
        publicName
    );

    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError
        });
    }

    await userDao.update(user);
    return res.status(OK).end();
}

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteOneUser(req: Request, res: Response) {
    const {username} = req.params;
    await userDao.delete(username);
    return res.status(OK).end();
}
