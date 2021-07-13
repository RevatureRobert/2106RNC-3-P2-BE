import bcrypt from "bcrypt";

export interface IUser {
    username: string; // this is their email address
    first_name: string;
    last_name: string;
    phone_number: string;
    publicName: string; // this is their public facing names
    userNameHash: string;
}

class User implements IUser {
    public username: string;
    public first_name: string;
    public last_name: string;
    public phone_number: string;
    public publicName: string;
    public userNameHash: string;

    constructor(
        username: string,
        userNameHash?: string,
        first_name?: string,
        last_name?: string,
        phone_number?: string,
        publicName?: string
    ) {
        this.username = username;
        this.first_name = first_name || "";
        this.last_name = last_name || "";
        this.phone_number = phone_number || "";
        this.publicName = publicName || "";
        this.userNameHash =
            userNameHash || String(this.updatePassTest(username));
    }

    async updatePassTest(x: string) {
        const saltRounds = 10;
        const password = x;
        return bcrypt.hash(password, saltRounds);
    }
}

export default User;
