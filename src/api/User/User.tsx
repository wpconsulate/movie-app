import IUser from './UserInterface'
import Model from '../Model'
// import Watchlist from '../Watchlist';

interface UserProperties {
  email: string
  name: string
  password: string
}
class User extends Model implements IUser  {
  static ENTITY = 'users'
  private id: number
  private email: string
  private name: string
  // private watchlist: Watchlist

  
  constructor(email: string, name: string) {
    super();
    this.email = email
    this.name = name
    // this.watchlist = new Watchlist(this.id.toString())
  }

  public async create(data: UserProperties) {
    return await this.database.ref(User.ENTITY).set(data);
  }

  public async update(data: UserProperties) {
    var results = this.database.ref(User.ENTITY);          
    return await results.child(this.id.toString()).update(data);  
  }

  public async delete() {
    var results = this.database.ref(User.ENTITY);          
    results.child(this.id.toString()).remove();   
  }

  public getId(): number {
    return this.id
  }

  // public getWatchlist(): Watchlist {
  //   return this.watchlist
  // }

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
