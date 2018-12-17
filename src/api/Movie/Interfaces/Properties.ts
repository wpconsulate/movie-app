import { IGenre } from './'

interface IProperties {
  id: number
  title: string
  poster_path: string
  popularity: number
  release_date: string
  revenue: number
  genres: Array<IGenre>
  runtime: number
  backdrop_path: string
  overview: string
}
export default IProperties
