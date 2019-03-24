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
        value: query
      }
    ])

    const response = await axios.get(url)
    const data = response.data.results
    return data
  }

  public async searchAutocomplete(query: string) {
    const url = this.url.getUrl('search/multi', [
      {
        param: 'query',
        value: query
      }
    ])
    const response = await axios.get(url)
    const data = response.data.results
    const results: any = []
    data.forEach((item: any) => {
      if (item.media_type === 'movie') {
        results.push({
          id: item.id,
          name: item.title,
          release_date: item.release_date
            ? new Date(item.release_date).getFullYear().toString()
            : undefined
        })
      } else if (item.media_type === 'person') {
        item.known_for.forEach((subItem: any) => {
          if (subItem.media_type === 'movie') {
            results.push({
              id: subItem.id,
              name: subItem.title,
              release_date: subItem.release_date
                ? new Date(subItem.release_date).getFullYear().toString()
                : undefined
            })
          } else {
            results.push({
              id: subItem.id,
              name: subItem.name,
              release_date: subItem.release_date
                ? new Date(subItem.release_date).getFullYear().toString()
                : undefined
            })
          }
        })
      } else {
        results.push({
          id: item.id,
          name: item.name,
          release_date: item.release_date
            ? new Date(item.release_date).getFullYear().toString()
            : undefined
        })
      }
    })

    return results
  }
}

export default Search
