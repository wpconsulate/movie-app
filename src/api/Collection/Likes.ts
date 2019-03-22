import { Database } from '..';
// import Authentication from '../Authentication';

export enum ReviewType {
    movie = 'movie',
    movieReview = 'movieReview',
    actors = 'actors'
}

interface Review {
    getReview(id: string) : Promise<{}>
    create(id:number, type: ReviewType) : any
}

class Likes extends Database implements Review {
    constructor() {
        super();
    }

    async getReview(id :string) {
        return this.read(id);
    }

    async create(id: number , type: ReviewType) {
        await this.write('likes', {
            type,
            id
        })
    }

    public async write(collection: string, data: object) {
        return await this.database.ref(collection).set(data)
      }
    
    
     
      public read(collection: string) {
        return new Promise((resolve, reject) => {
          this.database.ref(collection)
            .on('value', snap => {
              if (!snap.val()) return reject()
              return resolve(snap.val())
            })
        })
      }
}

export default Likes
