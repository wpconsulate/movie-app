import { Url } from '../api/Url'
import axios from 'axios'
class Search {
  private url: Url
  constructor() {
    this.url = new Url()
  }

  public async search(query: string) {
    const url = this.url.getUrl('search/multi', [
      {
        param: 'query',
        value: query,
      },
    ])

    const response = await axios.get(url)
    const data = response.data.results
    return data
  }

  public async searchAutocomplete(query: string) {
    const url = this.url.getUrl('search/multi', [
      {
        param: 'query',
        value: query,
      },
    ])

    const response = await axios.get(url)
    const data = response.data.results
    let results: any[] | { name: any; release_date: string; id: number }[] = []
    data.forEach((item: any) => {
      if (item.media_type === 'movie') {
        results.push({
          name: item.title,
          id: item.id,
          release_date: item.release_date
            ? new Date(item.release_date).getFullYear().toString()
            : null,
        })
      } else if (item.media_type === 'person') {
        item.known_for.forEach((subItem: any) => {
          if (subItem.media_type === 'movie') {
            results.push({
              name: subItem.title,
              id: subItem.id,
              release_date: subItem.release_date
                ? new Date(subItem.release_date).getFullYear().toString()
                : null,
            })
          } else {
            results.push({
              name: subItem.name,
              id: subItem.id,
              release_date: subItem.release_date
                ? new Date(subItem.release_date).getFullYear().toString()
                : null,
            })
          }
        })
      } else {
        results.push({
          name: item.name,
          id: item.id,
          release_date: item.release_date
            ? new Date(item.release_date).getFullYear().toString()
            : null,
        })
      }
    })

    return results
  }
}

export default Search
