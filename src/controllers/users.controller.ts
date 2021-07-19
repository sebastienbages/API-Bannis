import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { TYPES } from "../core/types.core";
import { UserRepository } from "../entities/user.entity";
import { DatabaseService } from "../services/database.service";

@controller("/users")
export class UsersController {
    public constructor(@inject(TYPES.DatabaseService) private readonly database: DatabaseService) {}

    @httpGet("/")
    public async index(req: Request, res: Response) {
        const userRepository = await this.database.getRepository(UserRepository);

        const users = await userRepository.find();
        return res.json(users);
    }
}