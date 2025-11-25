import React, { useState, useEffect, useRef } from 'react';

const RetroGame = () => {
    const canvasRef = useRef(null);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const gridSize = 20;
    const canvasSize = 400;

    useEffect(() => {
        if (gameOver || isPaused || !gameStarted) return;

        const moveSnake = () => {
            const newSnake = [...snake];
            const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

            // Check collision with walls
            if (head.x < 0 || head.x >= canvasSize / gridSize || head.y < 0 || head.y >= canvasSize / gridSize) {
                setGameOver(true);
                return;
            }

            // Check collision with self
            for (let segment of newSnake) {
                if (head.x === segment.x && head.y === segment.y) {
                    setGameOver(true);
                    return;
                }
            }

            newSnake.unshift(head);

            // Check collision with food
            if (head.x === food.x && head.y === food.y) {
                setScore(score + 1);
                setFood({
                    x: Math.floor(Math.random() * (canvasSize / gridSize)),
                    y: Math.floor(Math.random() * (canvasSize / gridSize))
                });
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        };

        const gameLoop = setInterval(moveSnake, 100);
        return () => clearInterval(gameLoop);
    }, [snake, direction, gameOver, isPaused, gameStarted, food, score]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                    break;
                case ' ':
                    if (gameOver) {
                        resetGame();
                    } else if (!gameStarted) {
                        setGameStarted(true);
                        setDirection({ x: 1, y: 0 });
                    } else {
                        setIsPaused(!isPaused);
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction, gameOver, isPaused, gameStarted]);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 15, y: 15 });
        setDirection({ x: 1, y: 0 });
        setGameOver(false);
        setScore(0);
        setGameStarted(true);
        setIsPaused(false);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        // Draw snake
        ctx.fillStyle = '#00ff00';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });

        // Draw food
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    }, [snake, food]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100" style={{ color: 'var(--vscode-text)', backgroundColor: 'var(--vscode-editor-bg)' }}>
            <h2 className="mb-4" style={{ fontFamily: "'Press Start 2P', monospace", textTransform: 'uppercase', letterSpacing: '2px' }}>Retro Snake</h2>
            <div style={{ position: 'relative', border: '4px solid #333', borderRadius: '4px' }}>
                <canvas
                    ref={canvasRef}
                    width={canvasSize}
                    height={canvasSize}
                    style={{ display: 'block' }}
                />
                {(!gameStarted || gameOver || isPaused) && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontFamily: 'monospace'
                    }}>
                        {gameOver ? (
                            <>
                                <h3 style={{ color: '#ff0000', marginBottom: '20px' }}>GAME OVER</h3>
                                <p>Score: {score}</p>
                                <p className="mt-3">Press SPACE to Restart</p>
                            </>
                        ) : !gameStarted ? (
                            <>
                                <h3 style={{ color: '#00ff00', marginBottom: '20px' }}>READY?</h3>
                                <p>Use Arrow Keys to Move</p>
                                <p className="mt-3">Press SPACE to Start</p>
                            </>
                        ) : (
                            <h3>PAUSED</h3>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-4 d-flex gap-4" style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>
                <div>Score: {score}</div>
                <div style={{ opacity: 0.7 }}>High Score: {Math.max(score, 0)}</div>
            </div>
            <div className="mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
                Use Arrow Keys to move • Space to Pause/Resume
            </div>
        </div>
    );
};

export default RetroGame;
