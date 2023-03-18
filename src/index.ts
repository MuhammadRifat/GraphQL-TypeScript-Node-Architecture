import { NextFunction } from 'express';
import express, { Application, Request, Response } from 'express';
import { Server } from 'http';
import config from '../config/config';
import { connectDB } from './db/db';
import logger from './logger/logger';
import ErrorHandler from './middlewares/errorHandler.middleware';
import path from "path";
import session from 'express-session';
import { auth } from './middlewares/auth.middleware';
import { userRouter } from './modules/users';
import { authRouter } from './modules/auth';

import { dashboardRouter } from './router/dashboardRouter';
const app: Application = express();
const port: number = Number(config.server.port) || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1); // trust first proxy

// application middleware
app.use('/static', express.static('public'));
app.use(session({
    name: "authorization",
    secret: String(config.session.secret),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // This will only work if you have https enabled!
        maxAge: 60000 // 1 hours
    }
}));
app.use(express.json());
app.use('/', userRouter);
app.use('/', authRouter);

app.use("/dashboard", dashboardRouter);

app.get('/', (req: Request, res: Response) => {
    return res.render("index", {
        title: "Journal"
    });
});

app.get('/academic-journal', auth('author'), (req: Request, res: Response) => {
    console.log(req.session.user);
    return res.render("academic-journal", {
        title: "Journal"
    });
});


app.get('/journal-details', (req: Request, res: Response) => {
    return res.render("journal-details", {
        title: "Journal"
    });
});


app.get('/article-details', (req: Request, res: Response) => {
    return res.render("article-details", {
        title: "Journal"
    });
});

app.get('/authors-information', (req: Request, res: Response) => {
    return res.render("authors-information", {
        title: "Journal"
    });
});

app.get('/blog', (req: Request, res: Response) => {
    return res.render("blog", {
        title: "Journal"
    });
});

app.get('/contact', (req: Request, res: Response) => {
    return res.render("contact", {
        title: "Journal"
    });
});

app.get('/contact-journal', (req: Request, res: Response) => {
    return res.render("contact-journal", {
        title: "Journal"
    });
});


app.get('/current-issue', (req: Request, res: Response) => {
    return res.render("current-issue", {
        title: "Journal"
    });
});

app.get('/volume-issue', (req: Request, res: Response) => {
    return res.render("volume-issue", {
        title: "Journal"
    });
});

app.get('/editorial-board', (req: Request, res: Response) => {
    return res.render("editorial-board", {
        title: "Journal"
    });
});

app.get('/information', (req: Request, res: Response) => {
    return res.render("information", {
        title: "Journal"
    });
});

app.get('/login', (req: Request, res: Response) => {
    return res.render("login", {
        title: "Journal"
    });
});

app.get('/news', (req: Request, res: Response) => {
    return res.render("news", {
        title: "Journal"
    });
});

app.get('/news-details', (req: Request, res: Response) => {
    return res.render("news-details", {
        title: "Journal"
    });
});

app.get('/registration', (req: Request, res: Response) => {
    return res.render("registration", {
        title: "Journal"
    });
});


app.all('*', (req: Request, res: Response, next: NextFunction) => {
    logger.error("Route not found!");
    return res.render("404");
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