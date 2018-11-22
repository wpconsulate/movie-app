
interface MovieInterface {
	getId(): number;
    
    setOverview(overview: string): void;
	getOverview(): string;
    
    setPoster(poster: string): void;
    getPoster(): string; 
    
	setTitle(title: string): void;
	getTitle(): string;
}

export default MovieInterface;