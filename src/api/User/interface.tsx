interface IUser {
    getId(): number;
    
    setEmail(newEmail: string): void;
    getEmail(): string;
    
	setNickname(newNickname: string): void;
    getNickname() : string;
    
	setFirstName(newFirstName: string): void;
    getFirstName(): string;
    
	setSurname(newSurname: string): void;
    getSurname(): string;
}
export default IUser;