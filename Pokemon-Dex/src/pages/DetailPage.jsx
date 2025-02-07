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
import soundFile from "../components/sound2.mp3";

const DetailPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [favList, setFavList] = useState([]);
  const [pokemonDataList, setPokemonDataList] = useState([]);

  const [audio] = useState(new Audio(soundFile));
  const handleClick = async (item) => {
    console.log(pokemonDataList);
    audio.play();
    const { data } = await axios.get(`http://localhost:3000/favorite`);
    const isFavExist = data.some(
      (item) => String(item.id) === String(pokemon.id)
    );

    if (isFavExist) {
      alert("its already in there");
      return;
    }
    try {
      console.log(isFavExist);
      const pokemonToAdd = { ...item, id: String(item.id) };

      await axios.post("http://localhost:3000/favorite", pokemonToAdd);

      setFavList(pokemonToAdd);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        // Fetch data Pokemon
        const { data: pokemonData } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokemonDataList(pokemonData);
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
          generation: speciesData.generation.name,
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
            minLevel: evoData.evolution_details[0]?.min_level || "--",
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
    <div className="p-4 sm:p-10 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Pokémon Details */}
      <div className="bg-[#1A1A1D] p-6 rounded-xl shadow-xl max-w-[900px] w-full flex flex-col items-center gap-6 border border-gray-600">
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-20">
          <div className="flex flex-col">
            <div className="flex items-start gap-3 px-2 py-1">
              {/* Back Button */}
              <Link to="/" className="pt-2 text-white hover:text-yellow-400">
                <CircleArrowLeft size={24} />
              </Link>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"
                className="w-10 h-10"
                alt=""
              />
              <div>
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

          <div className="w-full md:w-1/2 flex justify-center items-center relative">
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className="h-60 sm:h-80 object-contain"
            />
          </div>

          <div className="border border-gray-600 rounded-lg p-2 w-full md:w-auto">
            <div className="flex flex-col gap-2 truncate ">
              {[
                {
                  icon: <RulerIcon size={20} />,
                  label: "Height",
                  value: pokemon.height,
                },
                {
                  icon: <WeightIcon size={20} />,
                  label: "Weight",
                  value: pokemon.weight,
                },
                {
                  icon: <StarIcon size={20} />,
                  label: "Gender Ratio",
                  value: pokemon.genderRatio,
                },
                {
                  icon: <EggIcon size={20} />,
                  label: "Egg Cycles",
                  value: pokemon.hatchCycles,
                },
              ].map((item, index) => (
                <div key={index} className="bg-green-700 p-2 rounded-lg">
                  <p className="text-white text-sm font-medium flex gap-2 px-1 py-2">
                    {item.icon} {item.label}
                  </p>
                  <p className="text-lg font-semibold px-1 py-1">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Catch Button */}
        <button
          className="button truncate font-bold w-full sm:w-auto"
          onClick={() => handleClick(pokemonDataList)}
        >
          <div>
            <span>Catch Pokemon</span>
          </div>
        </button>
      </div>

      {/* Evolution Chain */}
      <div className="max-w-[900px] w-full mt-6 bg-[#1A1A1D] p-4 rounded-lg border border-gray-600">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6">
          {evolutionChain.map((evo, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <div className="border border-[#ffcb05] p-3 rounded-lg flex flex-col items-center hover:scale-110 transition duration-500">
                <Link to={`/pokemon/${evo.name}`}>
                  <img
                    src={evo.imageUrl}
                    alt={evo.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                </Link>
                <p className="font-bold capitalize text-center">{evo.name}</p>
                <p className="text-center text-xs uppercase">{pokemon.generation}</p>
              </div>
              {index < evolutionChain.length - 1 && (
                <div className="flex flex-col sm:flex-row items-center text-white">
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
      <div className="flex flex-col md:flex-row gap-5 max-w-[900px] w-full">
        <div className="w-full md:w-2/3 mt-6 bg-[#1A1A1D] p-4 rounded-lg border border-gray-600">
          <h2 className="text-xl font-semibold mb-4">Stats</h2>
          <div className="space-y-2">
            {pokemon.stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="capitalize text-gray-400">
                  {stat.name.replace(/-/g, " ")}
                </p>
                <div className="flex items-center w-3/4">
                  <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden mr-2">
                    <div
                      className="bg-[#ffcb05] h-full"
                      style={{ width: `${(stat.value / 255) * 100}%` }}
                    />
                  </div>
                  <p className="text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-[#1A1A1D] mt-6 p-6 rounded-xl shadow-xl border border-gray-600 w-full md:w-1/3">
          <h3 className="text-xl font-semibold">Additional Info</h3>
          <ul className="space-y-4 mt-4 text-white font-medium">
            {[
              { label: "Generation", value: pokemon.generation },
              { label: "Habitat", value: pokemon.habitat },
              { label: "Growth Rate", value: pokemon.growthRate },
              { label: "Base Experience", value: pokemon.baseExp },
              { label: "Capture Rate", value: pokemon.captureRate },
              { label: "Base Happiness", value: pokemon.baseHappiness },
            ].map((item, index) => (
              <li key={index}>
                <strong className="text-gray-400">{item.label}:</strong>{" "}
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-[900px] w-full mt-6 bg-[#1A1A1D] p-4 rounded-lg border border-gray-600">
        <h3 className="text-xl font-semibold mb-4">Abilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
