import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeftIcon,
  CircleArrowLeft,
  EggIcon,
  RulerIcon,
  SquareChevronLeft,
  StarIcon,
  WeightIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import soundFile from "../components/sound.mp3";

const DetailPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [abilities, setAbilities] = useState([]);

  const [audio] = useState(new Audio(soundFile));
  const handleClick = () => {
    audio.play();
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        // Fetch data Pokemon
        const { data: pokemonData } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        // Fetch data spesies untuk info tambahan dan URL evolusi
        const { data: speciesData } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${name}`
        );

        // Fetch evolusi menggunakan evolution_chain.url dari speciesData
        const { data: evolutionData } = await axios.get(
          speciesData.evolution_chain.url
        );
        // Fetch data abilities
        const abilitiesData = await Promise.all(
          pokemonData.abilities.map(async (abilityInfo) => {
            const { data: abilityData } = await axios.get(
              abilityInfo.ability.url
            );
            return {
              name: abilityData.name,
              description:
                abilityData.effect_entries.find(
                  (entry) => entry.language.name === "en"
                )?.effect || "No description available",
            };
          })
        );
        setAbilities(abilitiesData);

        // Set data Pokemon
        setPokemon({
          name: pokemonData.name,
          id: pokemonData.id,
          types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
          height: pokemonData.height / 10 + " m",
          weight: pokemonData.weight / 10 + " kg",
          genderRatio:
            speciesData.gender_rate >= 0
              ? `${8 - speciesData.gender_rate}:${speciesData.gender_rate}`
              : "Genderless",

          hatchCycles: speciesData.hatch_counter,
          imageUrl: pokemonData.sprites.other["official-artwork"].front_default,
          stats: pokemonData.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
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
          const { data: evoPokemonData } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${evoData.species.name}`
          );

          evoChain.push({
            name: evoData.species.name,
            imageUrl: evoPokemonData.sprites.other.home.front_default,
            minLevel: evoData.evolution_details[0]?.min_level || "—",
          });

          evoData = evoData.evolves_to[0];
        } while (evoData && evoData.hasOwnProperty("evolves_to"));

        setEvolutionChain(evoChain);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };
    console.log(evolutionChain);
    fetchPokemonDetails();
  }, [name]);

  if (!pokemon) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div
      className="p-10 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center"
      onClick={handleClick} // Memanggil handleClick untuk semua klik di halaman
    >
      {/* Pokémon Details */}
      <div className="bg-[#1A1A1D] p-6 rounded-xl shadow-xl w-[900px] flex flex-col items-center gap-6 border border-gray-600">
        <div className="w-full flex gap-20">
          <div className="flex flex-col">
            <div className="flex items-start gap-3 px-2 py-1">
              {/* Back Button */}
              <Link to="/" className=" pt-2 text-white hover:text-yellow-400">
                <CircleArrowLeft size={24} />
              </Link>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"
                style={{ width: "40px", height: "40px" }}
                alt=""
              />
              <div className="">
                <h1 className="text-2xl font-bold capitalize">
                  {pokemon.name}
                </h1>
                <p className="text-gray-400">
                  #{pokemon.id.toString().padStart(4, "0")}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2 pl-12">
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className="px-2 py-2 bg-yellow-600 rounded-lg capitalize items-center font-medium"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="w-1/2 flex justify-center items-center relative">
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className="h-80 object-contain"
            />
          </div>

          <div className="border border-gray-600 rounded-lg p-2">
            <div className="flex flex-col gap-2">
              <div className="bg-green-700 p-2 rounded-lg">
                <p className="text-white text-sm font-medium flex gap-2 px-1 py-2">
                  <RulerIcon size={20} />
                  Height
                </p>
                <p className="text-lg font-semibold px-1 py-1">
                  {pokemon.height}
                </p>
              </div>
              <div className="bg-green-700 p-3 rounded-lg">
                <p className="text-white text-sm font-medium flex gap-2 px-1 py-2">
                  <WeightIcon size={20} />
                  Weight
                </p>
                <p className="text-lg font-semibold px-1 py-1">
                  {pokemon.weight}
                </p>
              </div>
              <div className="bg-green-700 p-3 rounded-lg">
                <p className="text-white text-sm font-medium flex gap-2 px-1 py-2 truncate">
                  <StarIcon size={20} />
                  Gender Ratio
                </p>
                <p className="text-lg font-semibold">{pokemon.genderRatio}</p>
              </div>

              <div className="bg-green-700 p-3 rounded-lg">
                <p className="text-white text-sm font-medium flex gap-2 px-1 py-2">
                  <EggIcon size={20} />
                  Egg Cycles
                </p>
                <p className="text-lg font-semibold px-1 py">
                  {pokemon.hatchCycles}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Catch Button */}
        <button className="button truncate font-bold">
          <div>
            <span>Catch Pokemon</span>
          </div>
        </button>
      </div>

      {/* Evolution Chain */}
      <div className="w-[900px] mt-6 bg-[#1A1A1D] p-4 rounded-lg border border-gray-600">
        <div className="flex items-center justify-center gap-4">
          {evolutionChain.map((evo, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="border border-[#ffcb05] p-3 rounded-lg flex flex-col items-center hover:scale-110 transition duration-500">
                {/* Membungkus gambar dengan Link */}
                <Link to={`/pokemon/${evo.name}`}>
                  <img
                    src={evo.imageUrl}
                    alt={evo.name}
                    className="w-20 h-20 object-contain"
                  />
                </Link>
                <p className="font-bold capitalize">{evo.name}</p>
              </div>

              {index < evolutionChain.length - 1 && (
                <div className="flex flex-col items-center text-white">
                  <p className="text-sm text-gray-400"></p>
                  <div className="px-2 py-1 bg-gray-500 rounded-md">
                    Lv. {evolutionChain[index + 1].minLevel}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className=" flex gap-5">
        <div className="w-[630px] mt-6 bg-[#1A1A1D] p-4 rounded-lg border border-gray-600">
          <h2 className="text-xl font-semibold mb-4">Stats</h2>
          <div className="space-y-2">
            {pokemon.stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="capitalize text-gray-400">
                  {stat.name.replace(/-/g, " ")}
                </p>
                <div className="flex items-center w-3/4">
                  {/* Bar chart */}
                  <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden mr-2">
                    <div
                      className="bg-[#ffcb05] h-full"
                      style={{ width: `${(stat.value / 255) * 100}%` }}
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
        <div className=" bg-[#1A1A1D] mt-6 p-6 rounded-xl shadow-xl border border-gray-600">
          <h3 className="text-xl font-semibold">Additional Info</h3>
          <ul className="space-y-4 mt-4 text-white font-medium">
            <li>
              <strong className="text-gray-400">Generation:</strong>{" "}
              {pokemon.generation}
            </li>
            <li>
              <strong className="text-gray-400">Habitat:</strong>{" "}
              {pokemon.habitat}
            </li>
            <li>
              <strong className="text-gray-400">Growth Rate:</strong>{" "}
              {pokemon.growthRate}
            </li>
            <li>
              <strong className="text-gray-400">Base Experience:</strong>{" "}
              {pokemon.baseExp}
            </li>
            <li>
              <strong className="text-gray-400">Capture Rate:</strong>{" "}
              {pokemon.captureRate}
            </li>
            <li>
              <strong className="text-gray-400">Base Happiness:</strong>{" "}
              {pokemon.baseHappiness}
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[900px] mt-6 bg-[#1A1A1D] p-4 rounded-lg border border-gray-600">
        <h3 className="text-xl font-semibold mb-4">Abilities</h3>
        <div className="grid grid-cols-2 gap-4">
          {abilities.map((ability, index) => (
            <div
              key={index}
              className="py-2 px-4 border border-[#ffcb05] rounded-lg shadow-lg"
            >
              <h4 className="font-semibold text-lg capitalize text-center">
                {ability.name}
              </h4>
              <p className="text-gray-300 text-sm text-justify">
                {ability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
