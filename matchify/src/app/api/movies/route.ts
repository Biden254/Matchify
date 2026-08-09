import {NextRequest, NextResponse} from "next/server";

export  async function GET() {
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: "TMDB API Key is missing in the server environment variables." },
            { status: 500}
        );
    }

    try {
        // TMDB Provider ID for Netflix = 8
        // Region = US
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&with_watch_providers=8&watch_region=US&sort_by=popularity.desc&page=1';

        const response = await fetch(url, {
            next: { revalidate: 3600}, // Cache responses for 1 hour
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from TMDB, status: ' + response.status);
        }

        const  data = await response.json();

        // Transform the data to clean prps for MovieCard compoent
        const movies = data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Poster",
            rating: Number(movie.vote_average.toFixed(1)),
            overview: movie.overview || "No synopsis available.",
            provider: "Netflix",
        }));

        return NextResponse.json({ movies });
    }
    catch (error) {
        console.error("Error fetching data from TMDB:", error);
        return NextResponse.json(
            { error: "Failed to fetch data from TMDB."},
            { status: 500}
        );
    }
}