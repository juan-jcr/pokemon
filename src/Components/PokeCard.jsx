import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

const PokeCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [error, setError] = useState(null);
  const id = pokemon.url.split("/").filter(Boolean).pop();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(pokemon.url); // `pokemon.url` contiene el enlace al detalle
        const data = await response.json();
        setPokemonDetails(data);
      } catch (err) {
        setError("Error al cargar los detalles");
      }
    };

    fetchDetails();
  }, [pokemon.url]);

  if (error) return <p>{error}</p>;
  if (!pokemonDetails) return <p>Cargando...</p>;

  return (
    <Link className="rounded-lg shadow-md bg-white p-4 flex flex-col items-center relative cursor-pointer"
    to={`/pokemon/${id}`}>
      <div className="w-full bg-secondary-900/20 mb-2">
        <img src={pokemonDetails.sprites.other["official-artwork"].front_default}
          alt={pokemonDetails.name} />
      </div>
      <span className="text-sm text-gray-500">N°{pokemonDetails.id}</span>
      <h3 className="text-lg font-bold text-gray-800">{pokemonDetails.name}</h3>
      <div className="text-white flex gap-2">
        {pokemonDetails.types.map(type => (
          <span className="border-teal-500 border text-teal-700 rounded-xl text-center w-16" key={type.type.name}>
            {type.type.name}
          </span>
        ))}
      </div>
      
    </Link>
  )
}

export default PokeCard