import "./pre-start"; // Must be the first import
import http from "http";
import https from "https";
import fs from "fs";
import app from "@server";
import logger from "@shared/Logger";

// Start the server
const httpPort = Number(process.env.HTTPPORT || 8080);
const httpsPort = Number(process.env.HTTPSPORT || 8081);
http.createServer(app).listen(httpPort, () => {
    logger.info("Http server started on port: " + httpPort);
});
https
    .createServer(
        {
            key: fs.readFileSync("server.key"),
            cert: fs.readFileSync("server.cert")
        },
        app
    )
    .listen(httpsPort, () => {
        logger.info("Https server started on port: " + httpsPort);
    });
