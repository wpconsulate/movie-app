import algoliasearch, { Client, Index, QueryParameters } from 'algoliasearch'
import firebase from 'firebase'
import Config from '../Config'

class Algolia {
  public algolia: Client
  private index: Index

  constructor(index: string) {
    this.algolia = algoliasearch(
      Config.ALGOLIA_APP_ID,
      Config.ALGOLIA_ADMIN_KEY
    )
    this.index = this.algolia.initIndex(index)
  }

  public async addOrUpdateIndexRecord<T extends Index>(
    item: firebase.database.DataSnapshot,
    index: T
  ) {
    const record = item.val()

    record.objectID = item.key

    return index.saveObject(record)
  }

  public async deleteIndexRecord<T extends Index>(
    item: firebase.database.DataSnapshot,
    index: T
  ) {
    const objectID = item.key
    return index.deleteObject(objectID as string)
  }
  public async clearIndex() {
    return this.index.clearIndex()
  }

  public async search(query: QueryParameters) {
    return this.index.search(query)
  }

  public async add<T>(data: T) {
    return this.index.addObject(data)
  }

  public async addMany<T>(data: Array<T>) {
    return this.index.addObjects(data)
  }

  public async save<T>(data: T) {
    return this.index.saveObject(data)
  }

  public async saveMany(data: Array<object>) {
    return this.index.saveObjects(data)
  }

  public async update<T>(data: T) {
    return this.index.partialUpdateObject(data)
  }

  public async updateMany<T>(data: Array<T>) {
    return this.index.partialUpdateObjects(data)
  }

  public async delete(objectId: string) {
    return this.index.deleteObject(objectId)
  }

  public async deleteMany(objectIds: Array<string>) {
    return this.index.deleteObjects(objectIds)
  }

  public async getManyByIds(objectIds: Array<string>) {
    return this.index.getObjects(objectIds)
  }

  public async getById<T>(objectId: string) {
    return (await this.index.getObject(objectId)) as T
  }
}

export default Algolia
