import IUser from './UserInterface'

class User implements IUser {
  private id: number
  private email: string
  private name: string

  constructor(email: string, name: string) {
    this.email = email
    this.name = name
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

  public setName(newName: string) {
    this.name = newName
  }

  public getName(): string {
    return this.name
  }
}

export default User
