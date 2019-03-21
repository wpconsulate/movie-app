import Algolia from "../Algolia";
import { Index } from 'algoliasearch';
import Config from "../../Config";
//@ts-ignore
class UserIndex extends Algolia {
    
    public index: Index

    constructor() {
        super(Config.ALGOLIA_USERS_INDEX_NAME)
        this.index = this.algolia.initIndex(Config.ALGOLIA_USERS_INDEX_NAME)
    }

    public async addOrUpdateIndexRecord(item: firebase.database.DataSnapshot) {
        return await super.addOrUpdateIndexRecord(item, this.index)
    }

    public async deleteIndexRecord(item: firebase.database.DataSnapshot) {
        return await super.deleteIndexRecord(item, this.index)
    }

}

export default UserIndex