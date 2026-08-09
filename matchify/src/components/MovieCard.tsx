import React from "react";
import Image from "next/image";

export interface MovieProps {
    id: number;
    title: string;
    poster: string;
    rating: number;
    overview: string;
    provider: string;
}

const defaultMovie: MovieProps = {
    id: 1,
    title: "Stranger Things",
    poster: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3w3s.jpg",
    rating: 8.7,
    overview:
        "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    provider: "Netflix",
};

export default function MovieCard({ movie = defaultMovie }: { movie?: MovieProps }) {
    return (
        <div className="w-80 sm:w-96 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 text-white shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            {/* Poster Container */}
            <div className="relative h-96 w-full bg-slate-950">
    <Image
        src={movie.poster}
    alt={movie.title}
    fill
    sizes="(max-width: 640px) 320px, 384px"
    priority
    className="object-cover"
        />
        {/* Netflix / Provider Badge */}
        <span className="absolute top-4 right-4 bg-rose-600/90 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
        {movie.provider}
        </span>
        </div>

    {/* Content Section */}
    <div className="p-6 space-y-3">
    <div className="flex justify-between items-start gap-2">
    <h2 className="text-xl font-bold tracking-tight text-slate-100 line-clamp-1">
        {movie.title}
        </h2>
        <span className="flex items-center gap-1 text-amber-400 font-semibold text-sm bg-amber-400/10 px-2.5 py-1 rounded-full shrink-0">
            ★ {movie.rating}
    </span>
    </div>

    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
        {movie.overview}
        </p>
        </div>
        </div>
);
}