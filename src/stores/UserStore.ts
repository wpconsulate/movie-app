import { observable, action } from 'mobx'

class UserStore {
    @observable
    isLoggedIn: boolean = false

    @action.bound
    setIsLoggedIn(loggedIn: boolean) {
        this.isLoggedIn = loggedIn
    }
}

export default new UserStore()
