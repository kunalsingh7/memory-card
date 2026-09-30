    import '../styles/Cards.css';
    export default function Scoreboard({ score, bestScore }) {
    return (
        <div className="scoreboard">
            <h2>Score: {score}</h2>
            <h2>Best Score: {bestScore}</h2>
        </div>
    );
}