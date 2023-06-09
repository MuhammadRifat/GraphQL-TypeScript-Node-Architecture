import dotenv from 'dotenv';
dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV || 'development'}` });

const config = {
    server: {
        port: process.env.PORT,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        accessTokenExpiresIn: process.env.JWT_TOKEN_EXPIRES_IN
    },
    origin: process.env.ORIGIN,
    db: {
        url: process.env.DB_URL,
        host: process.env.DB_HOST,
        user: process.env.DB_HOST,
        password: process.env.DB_HOST,
        name: process.env.DB_NAME
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
                filename: "everything.log",
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