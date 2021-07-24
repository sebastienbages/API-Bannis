import { validate } from "class-validator";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, requestBody, requestParam } from "inversify-express-utils";
import { TYPES } from "../core/types.core";
import { User, UserRepository } from "../entities/user.entity";
import { DatabaseService } from "../services/database.service";
import { FetchUserMiddleware } from "../middlewares/fetchUser.middleware";

interface UserBody {
    email: string;
    password: string;
}

@controller("/users")
export class UsersController {
    public constructor(@inject(TYPES.DatabaseService) private readonly database: DatabaseService) {}

    @httpGet("/")
    public async index(req: Request, res: Response) {
        const userRepository = await this.database.getRepository(UserRepository);
        const users = await userRepository.find();
        return res.json(users);
    }

    @httpPost("/")
    public async create(@requestBody() body: UserBody, req: Request, res: Response) {
        const repository = await this.database.getRepository(UserRepository);
        const user = new User();
        user.email = body.email;
        user.password = body.password;

        const errors = await validate(user);
        if (errors.length !== 0) {
            return res.status(400).json({ errors });
        }

        await repository.save(user);
        return res.sendStatus(201);
    }

    @httpGet("/:userId", TYPES.FetchUserMiddleware)
    public async show(req: any) {
        return req.user;
    }

    @httpPut("/:userId", TYPES.FetchUserMiddleware)
    public async update(
        @requestBody() body: UserBody,
        req: any,
        res: Response
    ) {
        req.user.email = body.email ?? req.user.email;
        req.user.password = body.password ?? req.user.password;

        const errors = await validate(req.user);
        if (errors.length !== 0) {
            return res.status(400).json({ errors });
        }
        const repository = await this.database.getRepository(UserRepository);
        await repository.save(req.user);
        return res.sendStatus(204);
    }

    @httpDelete("/:userId")
    public async destroy(@requestParam("userId") userId: number, req: any, res: Response) {
        const repository = await this.database.getRepository(UserRepository);
        await repository.delete(req.user);
        return res.sendStatus(204);
    }
}