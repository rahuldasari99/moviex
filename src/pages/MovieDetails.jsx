import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/MovieDetails.css";

const API_KEY = "f743d6e77fb87dad55c34e0121648b35"; // 🔑 Replace with your key

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);

        // Fetch watch providers (OTT platforms)
        const providerRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`
        );
        const providerData = await providerRes.json();

        // Example: get India ("IN") providers
        setProviders(providerData.results.IN || providerData.results.US || null);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    
    
    <div className="movie-details">
        <div className="back-button">
             <button class="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        </div>
   
      
      <div className="movie-img-holder">
      <h2>{movie.title}</h2>
      <img className="movie-img"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      </div>
      <div className="movie-info-holder">
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(", ")}</p>
       
      {/* ✅ Show OTT links */}
      {providers && providers.flatrate && (
        <div className="ott-links">
          <h3>Available on:</h3>
          <ul>
            {providers.flatrate.map((p) => (
              <li key={p.provider_id}>
                {/* <img
                  src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                  alt={p.provider_name}
                /> */}
                {p.provider_name}
              </li>
            ))}
          </ul>
        </div>
        
      )}

      {!providers && <p>OTT availability not found for your region.</p>}
      </div>
    </div>
  );
};

export default MovieDetails;
