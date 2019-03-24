import { Database } from '..';
// import Authentication from '../Authentication';

export enum ReviewType {
    movie = 'movie',
    movieReview = 'movieReview',
    actors = 'actors'
}

interface Review {
    getLikes(id: number) : any
    create(id:number, type: ReviewType) : any
}

class Likes extends Database implements Review {
    constructor() {
        super();
    }

    getLikes(id :number) : Promise<{count : number, id : number, type: string }> {
      return new Promise((resolve, reject) => {
        this.database.ref(`liked/${id.toString()}`)
          .on('value', snap => {
            if (!snap) return reject()
              return resolve(snap.val())
          })
      })
    }

    async create(id: number , type: ReviewType) {
      let count = 0;
      await this.database.ref(`liked/${id}`).once(
        'value',
        element => {
          if(element.val()) {
            count = element.val().count;
        }
        count++;
      } 
        ).then(() => { if(count != 0) { this.database.ref(`liked/${id}`).set( { type,id,count}) } } );
    }

    public async setLike(id: number, type:ReviewType) {
      let count = 0;
      await this.database.ref(`liked/${id}`).once(
        'value',
        element => {
          if(element.val()) {
            count = element.val().count;
        }
        count++;
      } 
        ).then(() => { if(count != 0) { this.database.ref(`liked/${id}`).set( { type,id,count}) } } );
    }

    public async write(collection: string, data: object) {
        return await this.database.ref(collection).set(data)
      }
     
      public read(collection: string) {
        return new Promise((resolve, reject) => {
          this.database.ref(collection)
            .on('value', snap => {
              if (!snap) return reject()
              return resolve(snap.val())
            })
        })
      }
}

export default Likes
