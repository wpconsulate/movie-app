import IUser from './UserInterface'
import Database from '../Database';

class User implements IUser {
  private id: number
  private email: string
  private name: string
  private db: Database

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

  public getSnapshot(): firebase.database.DataSnapshot {
    let snapshot: firebase.database.DataSnapshot = null;
    this.db.getCollection('users').orderByChild('email').equalTo(this.email).on('value', (value) => {
      snapshot = value
    })
    return snapshot
  }
}

export default User
