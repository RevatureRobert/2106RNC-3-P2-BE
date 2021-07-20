/* eslint-disable max-len */
import express from "express";
//TODO Call this from server.ts
/**
 * Import this function from the server script, call it during initialization and provide it with the express application. It will add a piece of middleware which
 * redirects all http requests to https.
 * 
 * @param app The server's main express application.
 * 
 * @since 0.0.0
 */
export function ensureHttps(app: express.Application): void{

    app.all("*", (req: express.Request, res: express.Response, next: express.NextFunction) => {

        if(req.secure)
          return next();
        
        res.redirect(301, `https://${req.hostname}${req.url}`);
    
    });

}