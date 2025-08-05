import * as bcrypt from 'bcrypt';
import { configurationService } from "../../app.config";
import { ConfigurationService } from "../../Services/Configurations/ConfigurationService";
export class GeneraterHash {
    private readonly _configurationService: ConfigurationService = configurationService;

    static async hashPassword(data: string): Promise<string> {
        return await bcrypt.hash(data, 10);
    }

    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
