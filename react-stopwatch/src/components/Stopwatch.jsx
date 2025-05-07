import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    const formatTime = (time) => {
        const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
        const getSeconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
        const getMinutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
        return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
    };

    return (
        <div className="stopwatch">
            <div className="stopwatch-display">{formatTime(time)}</div>
            <div className="stopwatch-controls">
                <button onClick={handleStart}>Start</button>
                <button onClick={handleStop}>Stop</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default Stopwatch;