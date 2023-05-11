import { NextFunction } from 'express';
import express, { Application, Request, Response } from 'express';
import { Server } from 'http';
import config from '../config/config';
import { connectDB } from './db/db';
import logger from './logger/logger';
import ErrorHandler from './middlewares/errorHandler.middleware';
import { graphqlHTTP } from 'express-graphql';
import resolvers from './modules/users/user.resolver';
import schema from './schema.graphql';

const app: Application = express();
const port: number = Number(config.server.port) || 8080;

// application middleware
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    logger.error("Route not found!");
    return res.status(404).json({ message: "Route not found!" });
});

app.use(ErrorHandler.errorHandler);

// start server
let dbClient: any;
let server: Server;

const startServer = async () => {
    try {
        dbClient = await connectDB();
        server = app.listen(port, () => {
            logger.info(`Server run on the port ${port}`);
        });
    } catch (error: any) {
        logger.error(error.message);
        process.exit(1);
    }
}
startServer();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: string) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (dbClient) dbClient.close();
    if (server) {
        server.close();
    }
});