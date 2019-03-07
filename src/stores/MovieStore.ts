import { observable, action } from 'mobx'

class MovieStore {
  @observable
  showMenu: boolean = false

  @action.bound
  setShowMenu(show: boolean) {
    this.showMenu = show
  }
}

export default new MovieStore()
