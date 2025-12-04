import React, { useState, useEffect } from 'react';
import { VscDebugRestart } from 'react-icons/vsc';

const RetroGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    const emojis = ['🚀', '💻', '📊', '🎨', '🔍', '📈', '⚛️', '🐍'];

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const shuffledCards = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({
                id: index,
                content: emoji,
                isFlipped: false,
                isMatched: false
            }));

        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setGameWon(false);
    };

    const handleCardClick = (id) => {
        if (flippedCards.length === 2 || matchedCards.includes(id) || flippedCards.includes(id)) return;

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setMoves(prev => prev + 1);
            checkForMatch(newFlippedCards);
        }
    };

    const checkForMatch = (currentFlipped) => {
        const [id1, id2] = currentFlipped;
        const card1 = cards.find(c => c.id === id1);
        const card2 = cards.find(c => c.id === id2);

        if (card1.content === card2.content) {
            setMatchedCards(prev => [...prev, id1, id2]);
            setFlippedCards([]);

            if (matchedCards.length + 2 === cards.length) {
                setGameWon(true);
            }
        } else {
            setTimeout(() => {
                setFlippedCards([]);
            }, 1000);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100 p-4" style={{ color: 'var(--vscode-text)', backgroundColor: 'var(--vscode-editor-bg)', overflowY: 'auto' }}>
            <h2 className="mb-4" style={{ fontFamily: "'Press Start 2P', monospace", textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' }}>Memory Match</h2>

            <div className="d-flex gap-4 mb-4 align-items-center">
                <div style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>Moves: {moves}</div>
                <button
                    className="btn d-flex align-items-center gap-2"
                    onClick={initializeGame}
                    style={{
                        backgroundColor: 'var(--vscode-button-background)',
                        color: 'var(--vscode-button-foreground)',
                        border: 'none'
                    }}
                >
                    <VscDebugRestart /> Restart
                </button>
            </div>

            {gameWon && (
                <div className="alert alert-success mb-4" style={{ backgroundColor: 'rgba(76, 175, 80, 0.2)', color: 'var(--vscode-text)', border: '1px solid #4caf50' }}>
                    🎉 Congratulations! You won in {moves} moves!
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                maxWidth: '400px',
                width: '100%'
            }}>
                {cards.map(card => (
                    <div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        style={{
                            aspectRatio: '1',
                            backgroundColor: flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 'var(--vscode-editor-selectionBackground)' : 'var(--vscode-widget-shadow)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            border: '2px solid var(--vscode-border)',
                            transform: flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                        }}
                    >
                        {(flippedCards.includes(card.id) || matchedCards.includes(card.id)) ? (
                            <span style={{ transform: 'rotateY(180deg)' }}>{card.content}</span>
                        ) : (
                            <span style={{ opacity: 0.5, fontSize: '1.5rem' }}>?</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 text-muted text-center" style={{ fontSize: '0.9rem', maxWidth: '400px' }}>
                Tap cards to flip. Match pairs to win. Works on mobile! 📱
            </div>
        </div>
    );
};

export default RetroGame;
