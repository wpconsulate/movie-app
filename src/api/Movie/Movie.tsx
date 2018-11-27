import MovieInterface from "./MovieInteface";

class Movie implements MovieInterface {

	static ENTITY = 'movie';

	private id: number;
	private overview: string;
	private poster: string;
	private title: string;
	
	constructor(id: number, title: string, poster?: string) {
		this.id = id;
		this.title = title;
		this.poster = poster;
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
		this.poster = newPoster;
	}

	public getPoster(): string {
		return this.poster;
	}

	public setTitle(newTitle: string) {
		this.title = newTitle;
	}

	public getTitle(): string {
		return this.title;
	}

}

export default Movie;