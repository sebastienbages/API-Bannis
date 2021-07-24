import { Container } from "inversify";
import { Logger } from "../services/logger.service";
import { TYPES } from "./types.core";
import { HomeController } from "../controllers/home.controller";
import { DatabaseService } from "../services/database.service";
import { UsersController } from "../controllers/users.controller";
import { FetchUserMiddleware } from "../middlewares/fetchUser.middleware";

export const container = new Container();
container.bind(TYPES.Logger).to(Logger);
container.bind(TYPES.HomeController).to(HomeController);
container.bind(TYPES.DatabaseService).to(DatabaseService);
container.bind(TYPES.UsersController).to(UsersController);
container.bind(TYPES.FetchUserMiddleware).to(FetchUserMiddleware);