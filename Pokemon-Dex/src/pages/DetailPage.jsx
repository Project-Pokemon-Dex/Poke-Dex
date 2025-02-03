import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const { name } = useParams(); 
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        // Fetch data dasar Pokémon
        const { data: pokemonData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        
        // Fetch data spesies untuk info tambahan dan URL evolusi
        const { data: speciesData } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        
        // Fetch evolusi menggunakan evolution_chain.url dari speciesData
        const { data: evolutionData } = await axios.get(speciesData.evolution_chain.url);

        // Set data Pokémon
        setPokemon({
          name: pokemonData.name,
          id: pokemonData.id,
          types: pokemonData.types.map(typeInfo => typeInfo.type.name),
          height: pokemonData.height / 10 + " m",
          weight: pokemonData.weight / 10 + " kg",
          genderRatio: speciesData.gender_rate >= 0 
            ? { male: (8 - speciesData.gender_rate) * 12.5, female: speciesData.gender_rate * 12.5 }
            : { male: "Genderless", female: "" },
          hatchCycles: speciesData.hatch_counter,
          imageUrl: pokemonData.sprites.other["official-artwork"].front_default,
          stats: pokemonData.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
          })),
          generation: speciesData.generation.name.toUpperCase(),
          habitat: speciesData.habitat ? speciesData.habitat.name : "Unknown",
          captureRate: speciesData.capture_rate,
          growthRate: speciesData.growth_rate.name,
          baseExp: pokemonData.base_experience,
          baseHappiness: speciesData.base_happiness,
        });

        // Parsing evolusi dengan level
        const evoChain = [];
        let evoData = evolutionData.chain;

        do {
          evoChain.push({
            name: evoData.species.name,
            imageUrl: `https://img.pokemondb.net/artwork/large/${evoData.species.name}.jpg`,
            minLevel: evoData.evolution_details[0]?.min_level || null // Mendapatkan level evolusi jika ada
          });
          evoData = evoData.evolves_to[0];
        } while (evoData && evoData.hasOwnProperty('evolves_to'));

        setEvolutionChain(evoChain);

      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (!pokemon) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Pokémon Details */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-[900px] flex flex-col items-center gap-6">
        <div className="w-full flex gap-20">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
            <p className="text-gray-400">#{pokemon.id.toString().padStart(4, '0')}</p>

            <div className="flex flex-col gap-2 mt-2">
              {pokemon.types.map((type, index) => (
                <span key={index} className="px-2 py-1 bg-green-600 rounded-lg capitalize">
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="w-1/2 flex justify-center items-center relative">
            <img src={pokemon.imageUrl} alt={pokemon.name} className="h-80 object-contain" />
          </div>

          <div className="border border-gray-600 rounded-lg p-2">
            <div className="flex flex-col gap-2">
              <div className="bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-400 text-sm">Height</p>
                <p className="text-lg font-semibold">{pokemon.height}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Weight</p>
                <p className="text-lg font-semibold">{pokemon.weight}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Gender Ratio</p>
                {pokemon.genderRatio.male !== "Genderless" ? (
                  <p className="text-lg font-semibold">
                     {pokemon.genderRatio.male}% : {pokemon.genderRatio.female}% 
                  </p>
                ) : (
                  <p className="text-lg font-semibold">{pokemon.genderRatio.male}</p>
                )}
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Egg Cycles</p>
                <p className="text-lg font-semibold">{pokemon.hatchCycles}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Catch Button */}
        <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg">
          Catch
        </button>
      </div>

      {/* Evolution Chain */}
      <div className="w-[900px] mt-6 bg-gray-800 p-4 rounded-lg border border-gray-600">
        <h2 className="text-xl font-semibold mb-4">Evolution Chain</h2>
        <div className="flex items-center justify-center gap-4">
          {evolutionChain.map((evo, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="border border-green-400 p-3 rounded-lg flex flex-col items-center">
                <img src={evo.imageUrl} alt={evo.name} className="w-20 h-20 object-contain" />
                <p className="font-bold capitalize">{evo.name}</p>
              </div>
              {index < evolutionChain.length - 1 && (
                <div className="text-white px-2 py-1 bg-gray-500">
                  
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className=" flex gap-5">
      <div className="w-[630px] mt-6 bg-gray-800 p-4 rounded-lg border border-gray-600">
    <h2 className="text-xl font-semibold mb-4">Stats</h2>
    <div className="space-y-2">
      {pokemon.stats.map((stat, index) => (
        <div key={index} className="flex items-center justify-between">
          <p className="capitalize text-gray-400">{stat.name.replace(/-/g, " ")}</p>
          <div className="flex items-center w-3/4">
            {/* Bar chart */}
            <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden mr-2">
              <div 
                className="bg-green-500 h-full" 
                style={{ width: `${(stat.value / 150) * 100}%` }}
              />
            </div>
            {/* Stat value */}
            <p className="text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
        
        {/* Additional Info */}
        <div className=" bg-gray-800 mt-6 p-6 rounded-xl shadow-xl">
          <h3 className="text-xl font-semibold">Additional Info</h3>
          <ul className="space-y-4 mt-4 text-gray-400">
            <li><strong>Generation:</strong> {pokemon.generation}</li>
            <li><strong>Habitat:</strong> {pokemon.habitat}</li>
            <li><strong>Growth Rate:</strong> {pokemon.growthRate}</li>
            <li><strong>Base Experience:</strong> {pokemon.baseExp}</li>
            <li><strong>Capture Rate:</strong> {pokemon.captureRate}</li>
            <li><strong>Base Happiness:</strong> {pokemon.baseHappiness}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
