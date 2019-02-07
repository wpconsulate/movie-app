import { SetOfMovies } from "../api";

export interface SearchScreenState {
    searchInput: string
    isLoading: boolean,
    results: any
}