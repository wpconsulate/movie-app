import algoliasearch, { Client, Index, QueryParameters } from 'algoliasearch'
import firebase from 'firebase';
import Config from '../Config'

class Algolia {

    public algolia: Client
    private index: Index

    constructor(index: string) {
        this.algolia = algoliasearch(Config.ALGOLIA_APP_ID, Config.ALGOLIA_ADMIN_KEY)
        this.index = this.algolia.initIndex(index);
    }

    public async addOrUpdateIndexRecord<T extends Index>(item: firebase.database.DataSnapshot, index: T) {

        const record = item.val()

        record.objectID = item.key

        return await index.saveObject(record);
    }

    public async deleteIndexRecord<T extends Index>(item: firebase.database.DataSnapshot, index: T) {
        const objectID = item.key;
        return await index.deleteObject(objectID);
    }
    public async clearIndex() {
        return await this.index.clearIndex();
    }

    public async search(query: QueryParameters) {
        return await this.index.search(query);
    }

    public async add<T>(data: T) {
        return await this.index.addObject(data);
    }

    public async addMany<T>(data: T[]) {
        return await this.index.addObjects(data);
    }

    public async save<T>(data: T) {
        return await this.index.saveObject(data);
    }

    public async saveMany(data: object[]) {
        return await this.index.saveObjects(data);
    }

    public async update<T>(data: T) {
        return await this.index.partialUpdateObject(data);
    }

    public async updateMany<T>(data: T[]) {
        return await this.index.partialUpdateObjects(data);
    }

    public async delete(objectId: string) {
        return await this.index.deleteObject(objectId);
    }

    public async deleteMany(objectIds: string[]) {
        return await this.index.deleteObjects(objectIds);
    }

    public async getManyByIds(objectIds: string[]) {
        return await this.index.getObjects(objectIds);
    }

    public async getById<T>(objectId: string) {
        return await this.index.getObject(objectId) as T;
    }
}

export default Algolia