export interface IFab {
    email: string;
    displayName: string;
    friend: boolean;
}

class Fab implements IFab {
    public email: string;
    public displayName: string;
    public friend: boolean;

    constructor(email: string, displayName: string, friend: boolean) {
        this.email = email;
        this.displayName = displayName;
        this.friend = friend;
    }
}

export default Fab;
