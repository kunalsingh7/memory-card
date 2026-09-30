import Card from './Card';
import '../styles/Cards.css';
export default function Cards({ pokemonData, handleCardClick }) {
    return (
        <div className="cards-container">
            {pokemonData.map((pokemon, index) => (
                <Card 
                    key={index} 
                    pokemon={pokemon} 
                    handleCardClick={handleCardClick} 
                />
            ))}
        </div>
    );
}