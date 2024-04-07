export enum ContentTypes {
    "Movie" = "movie",
    "Series" = "series",
    "Episode" = "episode"
}

export interface ContentBase {
    Poster: string
    Title: string
    Year: string
    Type: ContentTypes
    imdbID: string
}


export interface ContentDetailModel extends ContentBase {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: { Source: string; Value: string }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}