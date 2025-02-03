import React from "react";
const DetailPage = () => {
    const pokemon = {
      name: "Bulbasaur",
      number: "#0001",
      types: ["Grass", "Poison"],
      height: "0.7 m",
      weight: "6.9 kg",
      genderRatio: { male: 7, female: 1 },
      cycles: 20,
      imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full//001.png",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
      evolutionChain: [
        {
          name: "Bulbasaur",
          imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full//001.png",
          level: null
        },
        {
          name: "Ivysaur",
          imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full//002.png",
          level: 16
        },
        {
          name: "Venusaur",
          imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full//003.png",
          level: 32
        }
      ],
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        spAttack: 65,
        spDefense: 65,
        speed: 45
      },
      generation: "I",
      habitat: "Grassland",
      captureRate: 45,
      growthRate: "Medium-slow",
      evYield: "1 Sp. Attack",
      baseExp: 64,
      baseHappiness: 50,
      weaknesses: ["Flying", "Fire", "Psychic", "Ice"]
    };
  
    return (
      <div className="p-10 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        {/* Container Detail Pokémon */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-[900px] flex flex-col items-center gap-6">
          
          {/* Pokémon Details */}
          <div className="w-full flex gap-20">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">{pokemon.name}</h1>
              <p className="text-gray-400">{pokemon.number}</p>
  
              <div className="flex flex-col gap-2 mt-2">
                {pokemon.types.map((type, index) => (
                  <span key={index} className="flex items-center gap-1 px-2 py-1 rounded-lg">
                    <img src={pokemon.iconUrl} alt="icon" className="w-4 h-4" /> {type}
                  </span>
                ))}
              </div>
            </div>
  
            <div className="w-1/2 flex justify-center items-center relative">
              <img src={pokemon.imageUrl} alt={pokemon.name} className="h-80 object-contain" />
            </div>
  
            <div className="border border-gray-600 rounded-lg p-2">
              <div className="flex flex-col gap-2">
                <div className="bg-gray-600 p-2 rounded-lg">
                  <p className="text-gray-400 text-sm">Height</p>
                  <p className="text-lg font-semibold">{pokemon.height}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Weight</p>
                  <p className="text-lg font-semibold">{pokemon.weight}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Gender Ratio</p>
                  <p className="flex items-center gap-2 text-lg font-semibold">
                    <img src={pokemon.iconUrl} alt="male icon" className="w-4 h-4" /> {pokemon.genderRatio.male} : {pokemon.genderRatio.female}
                    <img src={pokemon.iconUrl} alt="female icon" className="w-4 h-4" />
                  </p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Egg Cycles</p>
                  <p className="text-lg font-semibold">{pokemon.cycles} cycles</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Catch Button */}
          <button className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg">
            Catch
          </button>
        </div>
  
        {/* Evolution Chain */}
        <div className="w-[900px] mt-6 bg-gray-800 p-4 rounded-lg border border-gray-600">
          <h2 className="text-xl font-semibold mb-4">Evolution Chain</h2>
          <div className="flex items-center justify-center gap-4">
            {pokemon.evolutionChain.map((evo, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="border border-green-400 p-3 rounded-lg flex flex-col items-center">
                  <img src={evo.imageUrl} alt={evo.name} className="w-20 h-20 object-contain" />
                  <p className="font-bold">{evo.name}</p>
                </div>
                {index < pokemon.evolutionChain.length - 1 && (
                  <div className="text-white px-2 py-1 bg-gray-700 rounded-md">
                    Lv {pokemon.evolutionChain[index + 1].level}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Stats, Generation, and Weaknesses */}
        <div className="w-[900px] mt-6 grid grid-cols-2 gap-4">
          {/* Stats */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <h2 className="text-xl font-semibold mb-4">Stats</h2>
            <div className="space-y-2">
              {Object.entries(pokemon.stats).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <p className="capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                  <div className="w-2/3 bg-gray-700 h-3 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${(value / 150) * 100}%` }}></div>
                  </div>
                  <p>{value}</p>
                </div>
              ))}
            </div>
            <p className="text-right mt-2 font-bold">Total: {pokemon.stats.total}</p>
          </div>
  
          {/* Generation Info */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <h2 className="text-xl font-semibold mb-4">Generation Info</h2>
            <p><span className="font-semibold">Generation:</span> {pokemon.generation}</p>
            <p><span className="font-semibold">Habitat:</span> {pokemon.habitat}</p>
            <p><span className="font-semibold">Capture Rate:</span> {pokemon.captureRate}</p>
            <p><span className="font-semibold">Growth Rate:</span> {pokemon.growthRate}</p>
            <p><span className="font-semibold">EV Yield:</span> {pokemon.evYield}</p>
            <p><span className="font-semibold">Base Exp:</span> {pokemon.baseExp}</p>
            <p><span className="font-semibold">Base Happiness:</span> {pokemon.baseHappiness}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default DetailPage;
  