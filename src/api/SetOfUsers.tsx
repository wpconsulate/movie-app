import User from './User';

class SetOfUsers extends Array<User>{
        constructor() {
        super();
    }

    public addUser(aUser: User) {
        super.push(aUser);
    }
    
    public removeUser(aNum: number) {
        if(this.findUserByID(aNum) != 0){
            super.slice(aNum);
        }       
    }
    public showUsers(){
        let list = 'Users: '

        this.forEach(element => {
            list = list += " "
            list = list += element.getNickname();
            list = list += " -";
        });

        return list;
    }

    public findUserByID(aNum: number): User {
        let check = 0
        this.forEach((element: User) => {
            if(element.getId() === aNum){
                check = aNum;
            }
        });
        return check;
    }
}
export default SetOfUsers;