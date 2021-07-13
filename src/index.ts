/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// import "./pre-start"; // Must be the first import
// import http from "http";
// import https from "https";
// import fs from "fs";
// import app from "@server";
// import logger from "@shared/Logger";

// Start the server
// const httpPort = Number(process.env.HTTPPORT || 8080);
// const httpsPort = Number(process.env.HTTPSPORT || 8081);
// http.createServer(app).listen(httpPort, () => {
//     logger.info("Http server started on port: " + httpPort);
// });
// https
//     .createServer(
//         {
//             key: fs.readFileSync("server.key"),
//             cert: fs.readFileSync("server.cert")
//         },
//         app
//     )
//     .listen(httpsPort, () => {
//         logger.info("Https server started on port: " + httpsPort);
//     });

import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import serverless from "serverless-http";
import express from "serverless-express/express";

// @ts-ignore
import express, {NextFunction, Request, Response} from "@vendia/serverless-express";
import handler from "serverless-express/handler"
// import actualExpress from "express";
import StatusCodes from "http-status-codes";
import "express-async-errors";

import BaseRouter from "./routes";
import logger from "@shared/Logger";
// const express = serverlessExpress as actualExpress.Express;

const app = express() //as express1.Application;
const {BAD_REQUEST} = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
    app.use(helmet());
}

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

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));
// app.get('*', (req: Request, res: Response) => {
//     res.sendFile('index.html', {root: viewsDir});
// });

// Export express instance
export default app;
// module.exports.handler = serverless(app);
