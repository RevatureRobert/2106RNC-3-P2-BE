import StatusCodes from "http-status-codes";
import {Request, Response} from "express";
import logger from "@shared/Logger";
import MessagesDao from "@daos/Messages/MessagesDao";
import {paramMissingError} from "@shared/constants";
import Message from "@entities/Messages";

const messageDao = new MessagesDao();
const {BAD_REQUEST, CREATED, OK} = StatusCodes;

export async function getAll(req: Request, res: Response) {
    const msg = await messageDao.getAll();
    return res.status(OK).json({msg});
}

export async function getMessages(req: Request, res: Response) {
    logger.info("i made it to the message.ts file getMessages");
    const {messages} = req.body;
    logger.info(messages);
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError
        });
    }
    const msg = await messageDao.getMessages(messages);
    return res.status(OK).json({msg});
}

export async function getMessageGroups(req: Request, res: Response) {
    const {messages} = req.body;
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError
        });
    }
    const msg = await messageDao.getGroups(messages);
    return res.status(OK).json({msg});
}

export async function updateMessage(req: Request, res: Response) {
    const {messages} = req.body;
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError
        });
    }
    const msg = await messageDao.getGroups(messages);
    return res.status(OK).json({msg});
}

export async function deleteMessage(req: Request, res: Response) {
    const {messages} = req.body;
    const {parentMessageId, messageId} = req.params;
    await messageDao.deleteMessage(messages, parentMessageId, messageId);
    return res.status(OK).end();
}
