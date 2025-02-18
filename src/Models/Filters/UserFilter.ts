export class UserFilter {
    public age: number | null = null;
    public city: string | null = null;
    public gender: string | null = null;
    public isDeleted: boolean | null = null;
    public login: string;
    public password: string;
    public email: string;
    public name: string | null = null;

    public withAge(age: number): UserFilter {
        this.age = age;
        return this;
    }

    public withCity(city: string): UserFilter {
        this.city = city;
        return this;
    }

    public withGender(gender: string): UserFilter {
        this.gender = gender;
        return this;
    }

    public withIsDeleted(flag: boolean): UserFilter {
        this.isDeleted = flag;
        return this;
    }

    public withLogin(str: string): UserFilter {
        this.login = str;
        return this;
    }

    public withPassword(str: string): UserFilter {
        this.password = str;
        return this;
    }
    public withEmail(str: string): UserFilter {
        this.email = str;
        return this;
    }

    public withName(str: string): UserFilter {
        this.name = str;
        return this;
    }
}