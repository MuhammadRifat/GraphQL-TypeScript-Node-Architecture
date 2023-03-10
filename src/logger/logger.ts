import log4js from "log4js";
import config from "../../config/config";

log4js.configure(config.log4js);

let logger = log4js.getLogger();

export default logger;