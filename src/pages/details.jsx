import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonDetails } from "../service/PokemonService";
import ProgressBar from "../Components/ProgressBar";

const details = () => {
  const { id } = useParams(); // Obtiene el ID del Pokémon desde la URL
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getPokemonDetails(id);
        setPokemon(data);
      } catch (err) {
        setError("Error al cargar los detalles del Pokémon.");
      }
    };

    fetchDetails();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!pokemon) {
    return <p>Cargando detalles del Pokémon...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto md:mt-5 p-3 shadow-sm border rounded-lg">
      <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-28 md:items-center">
        <Link to={"/"}><img src="/logo.jpg" alt="logo" className='' /></Link>
        <span className="text-4xl md:text-9xl font-extrabold text-teal-700/50">#{pokemon.id}</span>
      </div>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-4 ">
        <div className="w-96 shadow-lg p-4 rounded ">
          <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name}
            className="w-44" />
          <h1 className="text-3xl font-bold">{pokemon.name.toUpperCase()}</h1>
          <p><strong>Altura:</strong> {pokemon.height}</p>
          <p><strong>Peso:</strong> {pokemon.weight}KG</p>

          <div className="flex gap-2 mt-5">
            {pokemon.types.map(type => (
              <span className="border-teal-500 border text-teal-700 rounded-xl text-center w-20"
                key={type.type.name}>
                {type.type.name}
              </span>
            ))}
          </div>

        </div>
        <div className="w-96 shadow-lg p-4 rounded">
          {pokemon.stats.map((stat) => (
            <ProgressBar
              key={stat.stat.name}
              label={stat.stat.name.toUpperCase()}
              value={stat.base_stat}
              max={200} 
            />
          ))}
        </div>
      </div>


    </div>
  );
};

export default details;
