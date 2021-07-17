import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../core/types.core";
import {Logger} from "../services/logger.service";

@controller("/")
export class HomeController {

    constructor(@inject(TYPES.Logger) private readonly _logger: Logger) {
    }
    @httpGet("")
    public index(req: Request, res: Response) {
        return res.send("Hello world");
    }
}