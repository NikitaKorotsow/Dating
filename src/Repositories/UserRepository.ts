import { Repository } from "typeorm";
import { User } from "../Models/Entities/Users";
import { UserFilter } from "../Models/Filters/UserFilter";

export class UserRepository {
    private readonly _repository: Repository<User>;

    constructor(repository: Repository<User>) {
        this._repository = repository;
    }

    public async getAll(): Promise<User[] | null> {
        try {
            return await this._repository.find();
        } catch (error) {
            return null;
        }
    }

    public async getById(id: number): Promise<User | null> {
        try {
            return await this._repository.findOne({
                where: {
                    id: id,
                },
            })
        } catch (error) {
            return null;
        }
    }

    public async getByAge(age: number): Promise<User[] | null> {
        try {
            return await this._repository.find({
                where: {
                    age: age,
                }
            })
        } catch (error) {
            return null;
        }
    }

    public async getByCity(city: string): Promise<User[] | null> {
        try {
            return await this._repository.find({
                where: {
                    city: city,
                }
            });
        } catch (error) {
            return null;
        }
    }

    public async getByGender(gender: string): Promise<User[] | null> {
        try {
            return await this._repository.find({
                where: {
                    gender: gender,
                }

            })
        } catch (error) {
            return null;
        }
    }

    public async getByIsDeleted(isDeleted: boolean): Promise<User[] | null> {
        try {
            return await this._repository.find({
                where: {
                    isDeleted: isDeleted,
                }
            })
        } catch (error) {
            return null;
        }
    }
    public async getByEmail(email: string): Promise<User | null> {
        try {
            return await this._repository.findOne({
                where: {
                    email: email,
                }
            });
        } catch (error) {
            return null;
        }
    }


    public async getByLogin(login: string): Promise<User | null> {
        try {
            return await this._repository.findOne({
                where: {
                    login: login,
                }
            });
        } catch (error) {
            return null;
        }
    }


    public async create(filter: UserFilter): Promise<User> {
        const entity: User = await this._repository.create();
        Object.assign(entity, filter);
        return await this._repository.save(entity);
    }

    public async update(entity: User, filter: UserFilter): Promise<User> {
        Object.assign(entity, filter);
        return await this._repository.save(entity);
    }
}