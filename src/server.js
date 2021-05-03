import dotenv from "dotenv";
import express, { static } from "express";
import { join, resolve } from "path";
const app = express();

dotenv.config();

const configs = {
    caminho: "build",
    forcarHTTPS: (process.env.REACT_APP_HTTPS ? (process.env.REACT_APP_HTTPS === "YES") : true),
    port: process.env.PORT
}

// HTTPS
if (configs.forcarHTTPS)
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"] === "http")
            res.redirect(`https://${req.headers.host}${req.url}`);
        else
            next();
    });

app.use(static(configs.caminho)); 

app.get("*", (req, res) => {    
    res.sendFile(join(resolve("./"), configs.caminho, "index.html"));
});

app.listen(configs.port, () => {
    console.log(`App na ${configs.port}!`);
});