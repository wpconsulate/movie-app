import IUser from './interface';

class User implements IUser {
	private id: number;
	private email: string;
	private nickname: string;
	private firstName: string;
	private surname: string;
	
	constructor(newEmail: string, newNickname: string, newFirstName: string, newSurname: string) {
		this.email = newEmail;
		this.nickname = newNickname;
		this.firstName = newFirstName;
		this.surname = newSurname;
    }
	
	public getId() {
		return this.id;
	}
	
	public setEmail(newEmail: string) {
		this.email = newEmail;
	}

	public getEmail() {return this.email;}
	
	public setNickname(newNickname: string) {
		this.nickname = newNickname;
	}
	
	public getNickname() {
		return this.nickname;
	}
	
	public setFirstName(newFirstName: string) {
		this.firstName = newFirstName;
	}
	
	public getFirstName() {
		return this.firstName;
	}
	
	public setSurname(newSurname: string) {
		this.surname = newSurname;
	}
	
	public getSurname() {
		return this.surname;
	}
}

export default User;