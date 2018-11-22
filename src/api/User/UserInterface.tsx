interface IUser {
    getId(): number;
    
    setEmail(email: string): void;
    getEmail(): string;
    
	setUsername(username: string): void;
    getUsername() : string;
    
	setFirstName(newFirstName: string): void;
    getFirstName(): string;
    
	setSurname(surname: string): void;
    getSurname(): string;

    getName(): string;

    toString(): string;
}
export default IUser;