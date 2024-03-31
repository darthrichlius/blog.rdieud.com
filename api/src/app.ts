import fs from "fs";
import Express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import winston from "winston";
import expressWinston from "express-winston";
import dotenv from "dotenv";

import { Sequelize } from "sequelize";

// Configure dotenv
dotenv.config();

const app: Application = Express();

import AuthRoutes from "~/resources/routes/AuthRoutes";
import UserRoutes from "~/resources/routes/UserRoutes";
import PostRoutes from "~/resources/routes/PostRoutes";

// Sequelize model imports
import { UserModel } from "~/resources/models/UserModel";
import { PostModel } from "~/resources/models/PostModel";

import parametersConfig from "./config/parameters";
import securityConfig from "./config/security";

import ExceptionsHandler from "~/middlewares/errors/ExceptionsHandlerMiddleware";
import UnknownRoutesHandler from "~/middlewares/errors/UnknownRoutesHandlerMiddleware";
import { SQLiteDBService } from "./services/DBService";

import swaggerUi from "swagger-ui-express";
/**
 * ! IMPORTANT !
 * Using "swagger-jsdoc" isn't ideal as it complicates writing due to formatting issues.
 * Correctly formatting valid comments is challenging because of indent-related difficulties.
 * "swagger-jsdoc" will be used exclusively for USER and POST models to diversify our definition approaches.
 */
import swaggerJSDoc from "swagger-jsdoc";

const { server: appServerConf, modules: appModulesConf } = parametersConfig;

const API_PORT = process.env.PORT || appServerConf.port;

//*
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection:", reason);
  // @todo log this error ?
});
//*/

/*
  @academics
    As a reminder, middleware MUST be loaded BEFORE the routes 
    Indeed, if it is loaded after the route to the root path, ...
    ...  the request never reaches it and the app doesn’t print “LOGGED”, ...
    ... because the route handler of the root path terminates the request-response cycle
*/
// Create a writeable stream for the access log file
const accessLogStream = fs.createWriteStream("log/access.log", { flags: "a" });
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    {
      stream: accessLogStream,
    }
  )
);
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set ...
// ... of middlewares and controllers.
app.use(Express.json());

const _swaggerJsdoc = swaggerJSDoc(appModulesConf?.OPENAPI);

/* eslint-disable no-var */
declare global {
  var sequelize: any; // 👈️ disables type checking for property
}

global.sequelize = SQLiteDBService.init(
  `./storage/${securityConfig.database.name}.db`
);

// Initialising Models on sequelize
UserModel.initialize(global.sequelize);
PostModel.initialize(global.sequelize);

// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
global.sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/", AuthRoutes);
    app.use("/users", UserRoutes);
    app.use("/posts", PostRoutes);

    /*
     API DOC
     */
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(_swaggerJsdoc));

    /*
      Handle unkown routes
      */
    app.use("*", UnknownRoutesHandler);

    // Use express-winston only in production
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "test"
    ) {
      // Error handling middleware
      app.use(
        expressWinston.errorLogger({
          transports: [
            new winston.transports.File({
              filename: "log/error.log",
              level: "error",
            }),
          ],
          format: winston.format.json(),
        })
      );
    }

    /**
     * Error Hangling
     * @see https://expressjs.com/en/guide/error-handling.html
     * /!\ This must be the last `app.use`
     */
    app.use(ExceptionsHandler);

    app.get("/status", (req, res) => {
      res.send({
        status: "running",
      });
    });

    app.listen(API_PORT, () => {
      console.log(`Listening on post ${API_PORT}`);
    });
  })
  .catch((err: string) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });

export default app;
