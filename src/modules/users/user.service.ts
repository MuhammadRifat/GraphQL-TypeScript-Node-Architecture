import { Service } from "../common/common.service";
import { User } from "./user.model";


class ChainService extends Service {
    constructor(Model: unknown) {
        super(Model);
    }

    // create extra service here if needed..
}

const userService = new ChainService(User);

export {
    userService
};
