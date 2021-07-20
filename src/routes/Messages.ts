
import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import logger from '../shared/Logger';
import MessagesDao from '../daos/Messages/MessagesDao';
import { paramMissingError } from '../shared/constants';

const messageDao = new MessagesDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

//************************************************************************************************
//* get operators
//************************************************************************************************

/** COMPLETED!
 * 
 * ! this is only to be used for testing purposes
 * @param res 
 * @returns 
 */
export async function getAll(res: Response) {
    logger.info("getAll Messages Controller");
    const msg = await messageDao.getAll();
    return res.status(OK).json({msg});
}

export async function getMessages(req: Request, res: Response) {
    logger.info("getMessages Controller");
    const { messages } = req.body;
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const msg = await messageDao.getMessages(messages);
    return res.status(OK).json({msg});
}

export async function getMessageGroups(req: Request, res: Response) {
    logger.info("getMessageGroups Controller");
    const { messages } = req.body;
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const msg = await messageDao.getGroups(messages);
    return res.status(OK).json({msg});
}

//************************************************************************************************
//* Post Operators
//************************************************************************************************

export async function addMainMessage(req: Request, res: Response) {
    logger.info("updateMessage Controller");
    const { messages } = req.body;
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const msg = await messageDao.addMainMessage(messages);
    return res.status(CREATED).json({msg});
}

export async function addSubMessage(req: Request, res: Response) {
    logger.info("updateMessage Controller");
    const { messages } = req.body;
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const msg = await messageDao.addSubMessage(messages);
    return res.status(CREATED).json({msg});
}

//************************************************************************************************
//* Put Operators
//************************************************************************************************

export async function updateMessage(req: Request, res: Response) {
    logger.info("updateMessage Controller");
    const { messages } = req.body;
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const msg = await messageDao.updateMessage(messages);
    return res.status(OK).json({msg});
}

//************************************************************************************************
//* Delete Operators
//************************************************************************************************

export async function deleteMessage(req: Request, res: Response) {
    logger.info("deleteMessage Controller");
    const { messages } = req.body;
    await messageDao.deleteMessage(messages);
    return res.status(OK).end();
}

export async function deleteMessageGroup(req: Request, res: Response) {
    logger.info("deleteMessageGroup Controller");
    const { messages } = req.body;
    await messageDao.deleteMessageGroup(messages);
    return res.status(OK).end();
}