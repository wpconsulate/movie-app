import IUser from './UserInterface'

class User implements IUser {
  private id: number
  private email: string
  private firstName: string
  private username: string
  private surname: string

  constructor(
    email: string,
    username: string,
    firstName: string,
    surname: string
  ) {
    this.email = email
    this.firstName = firstName
    this.surname = surname
    this.username = username
  }

  public getId(): number {
    return this.id
  }

  public setEmail(newEmail: string): void {
    this.email = newEmail
  }

  public getEmail(): string {
    return this.email
  }

  public setUsername(newUsername: string): void {
    this.username = newUsername
  }

  public getUsername(): string {
    return this.username
  }

  public setFirstName(newFirstName: string) {
    this.firstName = newFirstName
  }

  public getFirstName(): string {
    return this.firstName
  }

  public setSurname(newSurname: string): void {
    this.surname = newSurname
  }

  public getSurname(): string {
    return this.surname
  }

  public getName(): string {
    return `${this.firstName} ${this.surname}`
  }

  public toString(): string {
    return `Email: ${this.email} \n Username: ${this.username} \n Firstname: ${
      this.firstName
    } \n Surname: ${this.surname}`
  }
}

export default User
