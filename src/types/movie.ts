export interface Movie {
	id: number;
	title: string;
	image: string;
	genres: string[];
	description: string;
	rating: number;
}

export type MovieFormData = Omit<Movie, 'id'>;
