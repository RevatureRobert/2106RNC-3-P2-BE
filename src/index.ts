/* eslint-disable @typescript-eslint/no-unsafe-call */
// @ts-ignore
import express, {NextFunction, Request, Response} from "serverless-express/express";
// @ts-ignore
import serverlessHandler from "serverless-express/handler"
import StatusCodes from "http-status-codes";
import "express-async-errors";
import BaseRouter from "./routes";
import logger from "./shared/Logger";

process.env.SERVERLESS_EXPRESS_PLATFORM = "aws";
export const app = express();
const {BAD_REQUEST} = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Add APIs
app.use("/api", BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message
    });
});

// Export express instance
export const handler = serverlessHandler(app);
