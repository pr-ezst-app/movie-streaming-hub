import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.ezst.app/projects/9dd924b4-896e-4012-828a-fcde94e722d9/files/b58df24e-2194-4a84-99ee-d96a470d9d57.jpg";
const POSTER_WALL = "https://cdn.ezst.app/projects/9dd924b4-896e-4012-828a-fcde94e722d9/files/e29b1e98-e424-4ab9-a2c3-c25374666d63.jpg";
const COLLAGE_BG = "https://cdn.ezst.app/projects/9dd924b4-896e-4012-828a-fcde94e722d9/files/cb0bcd84-f210-466b-894f-55650f5f3fe7.jpg";

const NAV_ITEMS = ["Home", "Now Playing", "Netflix", "Prime", "Disney", "Search", "Other Apps", "Contact"];

const FEATURED_MOVIES = [
  { id: 1, title: "Dune: Part Two", genre: "Sci-Fi • Epic", year: 2024, rating: "8.9", platform: "netflix", trailer: "https://www.youtube.com/embed/Way9Dexny3w?autoplay=1&mute=1", thumb: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
  { id: 2, title: "Oppenheimer", genre: "Drama • History", year: 2023, rating: "8.7", platform: "prime", trailer: "https://www.youtube.com/embed/uYPbbksJxIg?autoplay=1&mute=1", thumb: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop" },
  { id: 3, title: "Killers of the Flower Moon", genre: "Crime • Drama", year: 2023, rating: "7.7", platform: "disney", trailer: "https://www.youtube.com/embed/EP34Yoxs3FQ?autoplay=1&mute=1", thumb: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop" },
  { id: 4, title: "The Zone of Interest", genre: "Drama • War", year: 2023, rating: "7.4", platform: "netflix", trailer: "https://www.youtube.com/embed/HFtly4TDcJE?autoplay=1&mute=1", thumb: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop" },
  { id: 5, title: "Poor Things", genre: "Comedy • Fantasy", year: 2023, rating: "8.1", platform: "prime", trailer: "https://www.youtube.com/embed/RlbR5N6veqw?autoplay=1&mute=1", thumb: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop" },
  { id: 6, title: "Past Lives", genre: "Drama • Romance", year: 2023, rating: "7.9", platform: "disney", trailer: "https://www.youtube.com/embed/kA7-b4RD0Q4?autoplay=1&mute=1", thumb: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop" },
];

const NOW_PLAYING = [
  { id: 7, title: "Civil War", genre: "Action • Thriller", year: 2024, rating: "7.4", platform: "netflix", trailer: "", thumb: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=600&fit=crop" },
  { id: 8, title: "Monkey Man", genre: "Action • Crime", year: 2024, rating: "7.1", platform: "prime", trailer: "", thumb: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=600&fit=crop" },
  { id: 9, title: "Ghostbusters", genre: "Comedy • Fantasy", year: 2024, rating: "6.5", platform: "disney", trailer: "", thumb: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=600&fit=crop" },
  { id: 10, title: "Road House", genre: "Action", year: 2024, rating: "6.3", platform: "prime", trailer: "", thumb: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop" },
  { id: 11, title: "Godzilla x Kong", genre: "Action • Sci-Fi", year: 2024, rating: "6.4", platform: "netflix", trailer: "", thumb: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop" },
];

const OTHER_APPS = [
  { name: "Hulu", color: "#1CE783", desc: "Live TV + Movies", icon: "Tv" },
  { name: "HBO Max", color: "#9B59B6", desc: "Premium Originals", icon: "Film" },
  { name: "Apple TV+", color: "#c8c8c8", desc: "Award Winners", icon: "Monitor" },
  { name: "Paramount+", color: "#0064FF", desc: "Blockbusters", icon: "Star" },
  { name: "Peacock", color: "#FF7A00", desc: "NBCUniversal", icon: "Feather" },
  { name: "Crunchyroll", color: "#FF6600", desc: "Anime & Manga", icon: "Zap" },
];

const PLATFORM_DATA = {
  netflix: {
    name: "Netflix",
    color: "#E50914",
    desc: "The world's leading streaming service. Blockbusters, originals, and award winners.",
    movies: FEATURED_MOVIES.filter(m => m.platform === "netflix"),
  },
  prime: {
    name: "Amazon Prime",
    color: "#00A8E1",
    desc: "Thousands of movies and shows. Free with Prime membership.",
    movies: FEATURED_MOVIES.filter(m => m.platform === "prime"),
  },
  disney: {
    name: "Disney+",
    color: "#4f8ef7",
    desc: "Marvel, Star Wars, Pixar, Disney classics and National Geographic.",
    movies: FEATURED_MOVIES.filter(m => m.platform === "disney"),
  },
};

type Movie = typeof FEATURED_MOVIES[0];

function PlatformBadge({ platform }: { platform: string }) {
  const colors: Record<string, string> = {
    netflix: "#E50914",
    prime: "#00A8E1",
    disney: "#113CCF",
  };
  const labels: Record<string, string> = {
    netflix: "N",
    prime: "P",
    disney: "D+",
  };
  return (
    <span
      className="text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
      style={{ background: colors[platform] }}
    >
      {labels[platform]}
    </span>
  );
}

function TrailerModal({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.97)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4 animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
          {movie.trailer ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={movie.trailer}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ background: "#111" }}>
              <img src={movie.thumb} alt={movie.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="relative z-10 text-center">
                <Icon name="PlayCircle" size={64} className="text-white/40 mx-auto mb-3" />
                <p className="text-white/60 text-lg">Trailer Preview</p>
                <p className="text-white/40 text-sm mt-1">{movie.title}</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <h3 className="font-cinzel text-xl text-white">{movie.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{movie.genre} • {movie.year}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2.5 rounded-full border border-white/10 hover:border-white/30"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
        <div className="red-line mt-4" />
      </div>
    </div>
  );
}

function MovieCard({ movie, onClick }: { movie: Movie; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="trailer-card cursor-pointer relative rounded-xl overflow-hidden flex-shrink-0"
      style={{ width: 200, height: 300 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <img
        src={movie.thumb}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          opacity: hovered ? 1 : 0.7,
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <div
          className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center"
          style={{ background: "rgba(192,57,43,0.85)", boxShadow: "0 0 30px rgba(192,57,43,0.6)" }}
        >
          <Icon name="Play" size={22} className="text-white ml-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <PlatformBadge platform={movie.platform} />
          <span className="text-yellow-400 text-xs flex items-center gap-0.5">
            <Icon name="Star" size={10} />
            {movie.rating}
          </span>
        </div>
        <p className="text-white font-semibold text-sm leading-tight font-cinzel">{movie.title}</p>
        <p className="text-gray-400 text-xs mt-0.5">{movie.genre}</p>
      </div>
    </div>
  );
}

export default function Index() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [activePlatform, setActivePlatform] = useState<"netflix" | "prime" | "disney">("netflix");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    const all: Movie[] = [...FEATURED_MOVIES, ...NOW_PLAYING];
    const res = all.filter(m =>
      m.title.toLowerCase().includes(q.toLowerCase()) ||
      m.genre.toLowerCase().includes(q.toLowerCase())
    );
    setSearchResults(res);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleNav = (item: string) => {
    if (item === "Netflix") { setActivePlatform("netflix"); scrollTo("platforms"); }
    else if (item === "Prime") { setActivePlatform("prime"); scrollTo("platforms"); }
    else if (item === "Disney") { setActivePlatform("disney"); scrollTo("platforms"); }
    else {
      const map: Record<string, string> = {
        "Home": "home", "Now Playing": "now-playing", "Search": "search",
        "Other Apps": "other-apps", "Contact": "contact",
      };
      scrollTo(map[item] || "home");
    }
  };

  const platform = PLATFORM_DATA[activePlatform];

  return (
    <div className="min-h-screen" style={{ background: "var(--deep-black)" }}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? "nav-glass" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
              <div
                className="w-8 h-8 rounded flex items-center justify-center animate-glow"
                style={{ background: "var(--crimson)" }}
              >
                <Icon name="Film" size={16} className="text-white" />
              </div>
              <span className="font-cinzel font-bold text-lg tracking-widest text-gold-shimmer">CINEVERSE</span>
            </div>

            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => handleNav(item)}
                  className="px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase transition-all duration-200 rounded text-gray-400 hover:text-white hover:bg-white/5"
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="lg:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden nav-glass border-t border-white/5">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => handleNav(item)}
                className="w-full text-left px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-wider"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Cinema" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.7) 50%, rgba(192,57,43,0.12) 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #080808 0%, transparent 55%)" }}
          />
        </div>

        {/* Vertical light lines */}
        <div className="absolute top-1/4 right-24 w-px h-72 opacity-25" style={{ background: "linear-gradient(to bottom, transparent, var(--crimson), transparent)" }} />
        <div className="absolute top-1/3 left-20 w-px h-48 opacity-15" style={{ background: "linear-gradient(to bottom, transparent, var(--gold), transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
              <div className="red-line w-12" style={{ height: "2px" }} />
              <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "var(--gold)" }}>
                Your Ultimate Movie Universe
              </span>
            </div>

            <h1
              className="font-bebas leading-none tracking-wider animate-fade-in-up"
              style={{ fontSize: "clamp(4.5rem,13vw,11rem)", color: "#fff", textShadow: "0 0 80px rgba(192,57,43,0.35)", animationDelay: "0.2s", animationFillMode: "both" }}
            >
              CINE<span style={{ color: "var(--crimson)" }}>VERSE</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-gray-300 mt-5 mb-9 leading-relaxed max-w-xl font-light animate-fade-in-up"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              One platform. Every streaming service. Discover, preview, and dive into thousands of movies — from Netflix, Prime, Disney and beyond.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.55s", animationFillMode: "both" }}>
              <button
                onClick={() => scrollTo("now-playing")}
                className="flex items-center gap-2.5 px-8 py-3.5 font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-white"
                style={{ background: "var(--crimson)", boxShadow: "0 0 35px rgba(192,57,43,0.4)" }}
              >
                <Icon name="Play" size={18} />
                Now Playing
              </button>
              <button
                onClick={() => scrollTo("search")}
                className="flex items-center gap-2.5 px-8 py-3.5 font-semibold rounded-lg border border-white/20 text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
              >
                <Icon name="Search" size={18} />
                Search Movies
              </button>
            </div>

            <div
              className="flex items-center gap-3 mt-10 animate-fade-in"
              style={{ animationDelay: "0.8s", animationFillMode: "both" }}
            >
              <span className="text-xs text-gray-500 uppercase tracking-widest">Available on</span>
              {["Netflix", "Prime", "Disney+"].map((p, i) => (
                <span key={i} className="text-xs font-bold px-3 py-1 rounded-full border border-white/10 text-gray-300">{p}</span>
              ))}
              <span className="text-xs text-gray-500">+ more</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float opacity-50">
          <Icon name="ChevronDown" size={26} className="text-white" />
        </div>
      </section>

      {/* NOW PLAYING */}
      <section id="now-playing" className="py-20 relative">
        <div className="absolute inset-0 opacity-8 pointer-events-none">
          <img src={COLLAGE_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #080808 0%, rgba(8,8,8,0.85) 30%, rgba(8,8,8,0.85) 70%, #080808 100%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-0.5" style={{ background: "var(--crimson)" }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>In Cinemas</span>
              </div>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">Now Playing</h2>
            </div>
            <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">
              <span>View All</span>
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {NOW_PLAYING.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8" />

      {/* PLATFORMS */}
      <section id="platforms" className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-4 mb-10 flex-wrap">
            {(["netflix", "prime", "disney"] as const).map(p => (
              <button
                key={p}
                onClick={() => setActivePlatform(p)}
                className="px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300"
                style={activePlatform === p
                  ? { background: PLATFORM_DATA[p].color, color: "#fff", boxShadow: `0 0 25px ${PLATFORM_DATA[p].color}60`, transform: "scale(1.05)" }
                  : { background: "rgba(255,255,255,0.05)", color: "#777" }
                }
              >
                {PLATFORM_DATA[p].name}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="font-cinzel text-3xl font-bold text-white">{platform.name}</h2>
            <p className="text-gray-400 mt-2 max-w-xl">{platform.desc}</p>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
            {platform.movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
            ))}
            <div
              className="trailer-card cursor-pointer relative rounded-xl overflow-hidden flex-shrink-0 border border-white/8 flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-all"
              style={{ width: 200, height: 300, background: "rgba(255,255,255,0.02)" }}
            >
              <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center">
                <Icon name="Plus" size={20} className="text-gray-500" />
              </div>
              <p className="text-gray-500 text-sm text-center px-4 leading-snug">Browse all {platform.name} titles</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-8" />

      {/* SEARCH */}
      <section id="search" className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-8 h-0.5" style={{ background: "var(--crimson)" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Find Anything</span>
              <span className="w-8 h-0.5" style={{ background: "var(--crimson)" }} />
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">Search Movies</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search by title, genre..."
                className="search-input w-full pl-12 pr-12 py-4 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 text-lg"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
              {searchQuery && (
                <button onClick={() => handleSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  <Icon name="X" size={18} />
                </button>
              )}
            </div>

            {searchResults.length > 0 && (
              <div className="mt-3 rounded-xl overflow-hidden border border-white/10" style={{ background: "rgba(17,17,17,0.98)" }}>
                {searchResults.map((movie, i) => (
                  <div
                    key={movie.id}
                    onClick={() => { setSelectedMovie(movie); handleSearch(""); }}
                    className={`flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors ${i > 0 ? "border-t border-white/5" : ""}`}
                  >
                    <img src={movie.thumb} alt={movie.title} className="w-10 h-14 object-cover rounded-md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold font-cinzel truncate">{movie.title}</p>
                      <p className="text-gray-400 text-sm">{movie.genre} • {movie.year}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <PlatformBadge platform={movie.platform} />
                      <Icon name="ChevronRight" size={14} className="text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="mt-4 text-center py-10 text-gray-500">
                <Icon name="SearchX" size={36} className="mx-auto mb-2 opacity-30" fallback="Search" />
                <p>No movies found for "{searchQuery}"</p>
              </div>
            )}

            {!searchQuery && (
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {["Action", "Drama", "Sci-Fi", "Comedy", "Crime", "Fantasy"].map(genre => (
                  <button
                    key={genre}
                    onClick={() => handleSearch(genre)}
                    className="px-4 py-1.5 rounded-full text-sm border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8" />

      {/* OTHER APPS */}
      <section id="other-apps" className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-0.5" style={{ background: "var(--crimson)" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>More Platforms</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">Other Streaming Apps</h2>
            <p className="text-gray-400 mt-2">Explore more platforms with amazing content</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {OTHER_APPS.map(app => (
              <div
                key={app.name}
                className="trailer-card cursor-pointer rounded-2xl p-5 flex flex-col items-center gap-3 border border-white/5 hover:border-white/15 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${app.color}18`, border: `1px solid ${app.color}35` }}
                >
                  <Icon name={app.icon} size={22} style={{ color: app.color }} fallback="Play" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">{app.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-8" />

      {/* CONTACT */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img src={POSTER_WALL} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #080808, rgba(8,8,8,0.6), #080808)" }} />
        </div>

        <div className="relative max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-0.5" style={{ background: "var(--crimson)" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Get in Touch</span>
            <span className="w-8 h-0.5" style={{ background: "var(--crimson)" }} />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white mt-2 mb-3">Contact Us</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
            Questions, partnerships, or suggest a movie? We'll respond within 24 hours.
          </p>

          <div className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3.5 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3.5 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
            <textarea
              rows={4}
              placeholder="Your message..."
              className="w-full px-4 py-3.5 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 resize-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <button
              className="w-full py-4 rounded-xl font-bold text-white uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] text-sm"
              style={{ background: "var(--crimson)", boxShadow: "0 0 35px rgba(192,57,43,0.3)" }}
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
              <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "var(--crimson)" }}>
                <Icon name="Film" size={13} className="text-white" />
              </div>
              <span className="font-cinzel font-bold tracking-widest text-gold-shimmer">CINEVERSE</span>
            </div>
            <p className="text-gray-600 text-sm">© 2024 CineVerse — Your Ultimate Movie Universe</p>
            <div className="flex gap-4">
              {["Twitter", "Instagram", "YouTube"].map(s => (
                <button key={s} className="text-gray-600 hover:text-white transition-colors text-sm">{s}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* TRAILER MODAL */}
      {selectedMovie && (
        <TrailerModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}