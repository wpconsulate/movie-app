
interface MovieInterface {
	getId(): number;
    
    setOverview(overview: string): void;
	getOverview(): string;
    
    setPoster(poster: string): void;
    getPoster(): string; 
    
	setTitle(title: string): void;
	getTitle(excerpt?:number): string;

	setOverview(overview: string): void;
	getOverview(): string;

	getPopularity(): number;

	getReleaseDate(): Date;

	getRevenue(): number;
}

export default MovieInterface;