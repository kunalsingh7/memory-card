import '../styles/Cards.css';
export default function Card({ pokemon, handleCardClick }) {
    return (
        <div className="card" onClick={() => handleCardClick(pokemon.id)}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
        </div>
    );
}