import IGenre from './Genre'
interface IMovie {
  getId(): number

  setOverview(overview: string): void
  getOverview(): string

  setPoster(poster: string): void
  getPoster(): string

  setTitle(title: string): void
  getTitle(excerpt?: number): string

  // tslint:disable-next-line: adjacent-overload-signatures
  setOverview(overview: string): void
  // tslint:disable-next-line: adjacent-overload-signatures
  getOverview(): string

  getPopularity(): number

  getReleaseDate(): Date

  getRevenue(): number

  getGenres(): Array<IGenre> | null

  getRuntime(): string

  getBackdrop(width?: string | number): string
}

export default IMovie
