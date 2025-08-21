import * as bcrypt from 'bcrypt';
export class GeneraterHash {

    static async hashPassword(data: string): Promise<string> {
        return await bcrypt.hash(data, 10);
    }

    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
