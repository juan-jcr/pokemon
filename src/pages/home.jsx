import { useState, useEffect } from 'react';
import PokeCard from '../Components/PokeCard';
import { getPokemons } from '../service/PokemonService';
import Pagination from "../Components/Pagination";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);  // Todos los Pokémon
  const [listing, setListing] = useState([]);    // Pokémon que se muestran
  const [filter, setFilter] = useState('');      // Filtro de búsqueda
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const itemsPerPage = 20;  // Pokémon por página

  useEffect(() => {
    fetchPokemons();
  }, []);

  // Cargar todos los Pokémon
  const fetchPokemons = async () => {
    const data = await getPokemons(1000, 0);
    setPokemons(data);
    setListing(data.slice(0, itemsPerPage));  // Mostrar los primeros 20 Pokémon
  };

  // Función para manejar la búsqueda
  const search = (e) => {
    if (e.key === "Enter") {
      const query = filter.trim().toLowerCase();
      if (query) {
        const filteredPokemons = pokemons.filter((p) =>
          p.name.toLowerCase().includes(query)
        );
        setListing(filteredPokemons.slice(0, itemsPerPage)); // Paginar los Pokémon filtrados
        setCurrentPage(0);  // Resetear a la primera página cuando se realiza una búsqueda
      } else {
        setListing(pokemons.slice(0, itemsPerPage));  // Mostrar los primeros Pokémon sin filtro
        setCurrentPage(0);  // Resetear a la primera página cuando el filtro está vacío
      }
    }
  };

  // Cambiar de página
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    const offset = selected * itemsPerPage;

    // Asegúrate de que la paginación se haga sobre la lista filtrada
    if (filter.trim()) {
      const filteredPokemons = pokemons.filter((p) =>
        p.name.toLowerCase().includes(filter.trim().toLowerCase())
      );
      setListing(filteredPokemons.slice(offset, offset + itemsPerPage)); // Mostrar Pokémon filtrados y paginados
    } else {
      setListing(pokemons.slice(offset, offset + itemsPerPage)); // Mostrar Pokémon sin filtro y paginados
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-5 p-3 bg-white rounded-lg">
      <div className='flex items-center'>
        <img src="logo.jpg" alt="logo" className='w-32' />
      <input
        type="text"
        placeholder="Buscar..."
        value={filter} onChange={(e) => setFilter(e.target.value)}  onKeyDown={search}  
        className="pl-8 h-10  w-full text-gray-600 bold outline-none rounded-lg border-primary border"
      />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listing.map((pokemon, index) => (
          <PokeCard pokemon={pokemon} key={index} />
        ))}
      </div>
      <Pagination pageCount={Math.ceil(pokemons.length / itemsPerPage)}  // Total de páginas
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
