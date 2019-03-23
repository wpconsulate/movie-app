import { observable, action, computed } from 'mobx'

export interface Message {
  type: 'success' | 'error'
  message: string
}

class MessageStore {
  @observable
  messages: Array<Message> = []

  @action.bound
  addToMessage(message: Message) {
    this.messages.push(message)
  }

  @action.bound
  removeMessage(message: Message) {
    const index = this.messages.findIndex(item => item === message)
    delete this.messages[index]
  }

  @computed
  get errorMessages() {
    return this.messages.filter(message => message.type === 'error')
  }

  @computed
  get successMessages() {
    return this.messages.filter(message => message.type === 'success')
  }

  @computed
  get message() {
    return this.messages.pop()
  }
}

export default new MessageStore()
