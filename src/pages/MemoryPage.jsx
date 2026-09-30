import { useState, useEffect } from "react";
import Cards from "../components/Cards.jsx";
import Scoreboard from "../components/Scoreboard.jsx";

export default function MemoryPage() {

    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedPokemon, setClickedPokemon] = useState([]);

    // Shuffle an array of cards
    const shuffleCards = (cards) => {
        const shuffledCards = [...cards];

        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));

            [shuffledCards[i], shuffledCards[randomIndex]] = [shuffledCards[randomIndex],shuffledCards[i]];
        }

        return shuffledCards;
    };

    // Call Pokemon API and get the data
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
            .then(response => response.json())
            .then(async (data) => {

                // Get full details for each Pokemon
                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const response = await fetch(pokemon.url);
                        return response.json();
                    })
                );

                // Shuffle cards when they are first loaded
                setPokemonData(shuffleCards(pokemonDetails));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });

    }, []);

    const handleCardClick = (pokemonId) => {

        // Pokemon was already clicked
        if (clickedPokemon.includes(pokemonId)) {
            setScore(0);
            setClickedPokemon([]);

            return;
        }

        // New Pokemon clicked
        const newScore = score + 1;

        setScore(newScore);
        setClickedPokemon([...clickedPokemon, pokemonId]);

        // Update best score
        if (newScore > bestScore) {
            setBestScore(newScore);
        }

        // Shuffle cards after clicking
        setPokemonData((currentCards) => shuffleCards(currentCards));
    };

    return (
        <>
            <Scoreboard score={score} bestScore={bestScore} />
            {loading
                ? <p>Loading...</p>
                : <Cards
                    pokemonData={pokemonData}
                    handleCardClick={handleCardClick}
                />
            }
        </>
    );
}