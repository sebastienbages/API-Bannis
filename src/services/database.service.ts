import { inject, injectable } from "inversify";
import { Connection, createConnection, ObjectType } from "typeorm";
import { TYPES } from "../core/types.core";
import { Logger } from "./logger.service";

@injectable()
export class DatabaseService {
    private static connection: Connection;

    public constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

    public async getConnection(): Promise<Connection> {
        if (DatabaseService.connection) {
            return DatabaseService.connection;
        }

        try {
            DatabaseService.connection = await createConnection();
            this.logger.log("INFO", "Connection established");
        } catch (e) {
            this.logger.log("ERROR", "Cannot establish database connection", e);
            process.exit(1);
        }

        return DatabaseService.connection;
    }

    public async getRepository<T>(repository: ObjectType<T>): Promise<T> {
        const connection = await this.getConnection();
        return connection.getCustomRepository<T>(repository);
    }
}