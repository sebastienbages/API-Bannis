import { injectable } from "inversify";

@injectable()
export class Logger {
    public log(level: "DEBUG" | "INFO" | "ERROR", message: string, object?: any): void {
        const time = new Date().toISOString();
        console.log(`${time} - ${level} - ${message} - ${object}`);
    }
}