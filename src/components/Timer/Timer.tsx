
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

interface TimerProps {
  stepNumber: number;
  stepText: string;
}

const Timer: React.FC<TimerProps> = ({ stepNumber, stepText }) => {
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(300); // 5 minutes default

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      // Could add notification here
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggle = () => {
    if (seconds === 0) {
      setSeconds(initialTime);
    }
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(initialTime);
    setIsActive(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = parseInt(e.target.value) || 0;
    const newTime = minutes * 60;
    setInitialTime(newTime);
    if (!isActive) {
      setSeconds(newTime);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`p-4 rounded-lg border ${
      isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
    } transition-colors`}>
      <h4 className={`text-sm font-medium mb-3 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Step {stepNumber} Timer
      </h4>
      
      <div className="flex items-center space-x-3 mb-3">
        <input
          type="number"
          min="1"
          max="60"
          placeholder="Minutes"
          onChange={handleTimeChange}
          className={`w-20 px-2 py-1 text-sm rounded border ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          } focus:outline-none focus:border-orange-400`}
          disabled={isActive}
        />
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          minutes
        </span>
      </div>
      
      <div className={`text-2xl font-mono font-bold mb-3 ${
        seconds <= 10 && isActive ? 'text-red-500' : (isDarkMode ? 'text-white' : 'text-gray-900')
      }`}>
        {formatTime(seconds)}
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={toggle}
          className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium ${
            isActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          } transition-colors`}
        >
          {isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          <span>{isActive ? 'Pause' : 'Start'}</span>
        </button>
        
        <button
          onClick={reset}
          className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          } transition-colors`}
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default Timer;
