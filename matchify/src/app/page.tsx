"use client";

import { useEffect, useState } from "react";
import MovieCard, { MovieProps } from "@/components/MovieCard";

export default function Home() {
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const res = await fetch("/api/movies");
                if (!res.ok) {
                    throw new Error("Failed to fetch movies from server.");
                }
                const data = await res.json();
                if (data.movies && data.movies.length > 0) {
                    setMovies(data.movies);
                } else {
                    setError("No movies found.");
                }
            } catch (err: any) {
                console.error("Error loading movies:", err);
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, []);

    return (
        <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100">
            {/* App Header */}
            <div className="text-center mb-8 space-y-2">
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                    Matchify<span className="text-rose-500">.</span>
                </h1>
                <p className="text-slate-400 text-sm sm:text-base font-medium">
                    Find what to watch together, without the endless scrolling.
                </p>
            </div>

            {/* Dynamic Content */}
            {loading ? (
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-400 font-medium animate-pulse text-sm">
                        Fetching popular Netflix titles...
                    </p>
                </div>
            ) : error ? (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-center max-w-sm">
                    <p className="font-semibold text-sm">{error}</p>
                    <p className="text-xs text-rose-400/80 mt-1">
                        Ensure your TMDB_API_KEY is set in .env.local
                    </p>
                </div>
            ) : (
                <MovieCard movie={movies[0]} />
            )}
        </main>
    );
}