import axios from "axios";

export const getPokemons = async (limit, offset) => {
  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const response = await axios.get(API_URL);
  return response.data.results; // Retorna los resultados de los Pokémon
};

export const getPokemonDetails = async (id) => {
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await axios.get(API_URL);
  return response.data; // Retorna los detalles completos del Pokémon
};