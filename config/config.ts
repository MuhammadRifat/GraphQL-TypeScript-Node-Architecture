import dotenv from 'dotenv';
dotenv.config({ path: __dirname + `/../.env.${process.env.NODE_ENV || 'development'}` });

const config = {
    server: {
        port: process.env.PORT,
    },
    session: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiresIn: process.env.JWT_TOKEN_EXPIRES_IN
    },
    origin: process.env.ORIGIN,
    db: {
        journal: {
            url: "mongodb://0.0.0.0:27017/journal",
            collections: {
                journals: "journals",
                articles: "articles",
                users: "users",
                counters: "counters"
            }
        }
    },
    log4js: {
        appenders: {
            out: {
                type: "stdout"
            },
            console: {
                type: "console"
            },
            everything: {
                type: "file",
                filename: "D:/JS/logs/everything.log",
            }
        },
        categories: {
            default: {
                appenders: ["console", "everything"],
                level: "debug"
            }
        },
    },
    statusCode: {
        CONTINUE: 100,
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        NOT_ACCEPTED: 406,
        REQUEST_TIMEOUT: 408,
        UNPROCESSABLE: 422,
        INTERNAL_SERVER_ERROR: 500,
        NOT_IMPLEMENTED: 501,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIME_OUT: 504,
    }
};

export default config;