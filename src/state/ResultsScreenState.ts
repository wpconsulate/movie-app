import { SetOfMovies } from '../api'

export interface IResultsScreenState {
  isLoading: boolean
  movies: SetOfMovies
  title: String
}
