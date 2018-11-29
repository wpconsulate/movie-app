import MovieInterface from "./MovieInteface";
import Config from "../../Config";

interface MovieProperties {
	id: number;
	title: string;
	poster_path: string;
	popularity: number;
	release_date: string;
	revenue: number;
}
class Movie implements MovieInterface {

	static ENTITY = 'movie';

	private id: number;
	private overview: string;
	private poster_path: string;
	private title: string;
	private popularity: number;
	private release_date: string;
	private revenue: number;
	
	constructor(movie: MovieProperties) {
		this.id = movie.id;
		this.title = movie.title;
		this.poster_path = movie.poster_path;
		this.popularity = movie.popularity;
		this.release_date = movie.release_date;
		this.revenue = movie.revenue;
	}
	
	public getId(): number {
		return this.id;
	}

	public setOverview(newOverview: string): void {
		this.overview = newOverview;
	}

	public getOverview(): string {
		return this.overview;
	}

	public setPoster(newPoster: string): void {
		this.poster_path = newPoster;
	}

	public getPoster(width?: string | number): string {
		let posterWidth = (width) ? `w${width}` : 'original';
		return Config.IMAGE_URL+posterWidth+this.poster_path;
	}

	public setTitle(newTitle: string) {
		this.title = newTitle;
	}

	public getTitle(excerpt?:number): string {
		if(excerpt)
		{
			return this.title.substr(0, excerpt) + '...';
		}
		return this.title;
	}

	public getPopularity(): number {
		return this.popularity;
	}

	public getReleaseDate(): Date {
		return new Date(this.release_date);
	}

	public getRevenue(): number {
		return this.revenue;
	}

}

export default Movie;