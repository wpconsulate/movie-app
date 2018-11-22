import User from './User/User';

class SetOfUsers extends Array<User>{
    
    constructor() {
        super();
    }

    public addUser(aUser: User) {
        super.push(aUser);
    }
    
    public removeUser(aNum: number) {
        const user = this.findUserById(aNum);
        if(user){
            super.slice(aNum);
        }       
    }

    public showUsers(){
        let list = 'Users: '

        this.forEach(element => {
            list = list += " "
            list = list += element.getName();
            list = list += " -";
        });

        return list;
    }

    public findUserById(id: number): User|null {
        for (let i = 0; i < this.length; i++) {
            if (this[i].getId() === id) {
                return this[i];
            }
        }

        return null;
    }
}
export default SetOfUsers;