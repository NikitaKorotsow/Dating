import CryptoJS from "crypto-js";
import { configurationService } from "../../app.config";
import { ConfigurationService } from "../../Services/Configurations/ConfigurationService";

export class GeneraterCrypt {
    private readonly _configurationService: ConfigurationService = configurationService;

    static encrypt(data: string): string {
        const thisObj = new GeneraterCrypt();
        return CryptoJS.AES.encrypt(data, thisObj._configurationService.SECRET_KEY).toString();
    }

    static decrypt(data: string): string {
        const thisObj = new GeneraterCrypt();
        return CryptoJS.AES.decrypt(data, thisObj._configurationService.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }
}
