import algoliasearch, { Client, Index } from 'algoliasearch'
import firebase from 'firebase';
import Config from '../Config'

class Algolia {
    
    public algolia: Client

    constructor() {
        this.algolia = algoliasearch(Config.ALGOLIA_APP_ID, Config.ALGOLIA_API_KEY)
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

}

export default Algolia