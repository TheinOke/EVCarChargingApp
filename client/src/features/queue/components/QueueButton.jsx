import { useState } from 'react';
import * as queueApi from '../api/queueApi.js';
import { useActiveCar } from '../../cars/hooks/useActiveCar.jsx';

function QueueButton({ stationId, initialCount = 0 }) {
  const { activeCar } = useActiveCar();
  const [count, setCount] = useState(initialCount);
  const [isJoined, setIsJoined] = useState(false);
  const [status, setStatus] = useState('idle');

  async function handleClick(e) {
    e.stopPropagation();
    setStatus('loading');
    try {
      const result = isJoined
        ? await queueApi.leave(stationId)
        : await queueApi.join(stationId, activeCar?.id);
      setCount(result.count);
      setIsJoined(result.isUserInQueue);
      setStatus('idle');
    } catch {
      setStatus('idle');
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500 dark:text-gray-400">
        {count} {count === 1 ? 'car' : 'cars'} waiting
      </span>
      <button
        onClick={handleClick}
        disabled={status === 'loading'}
        className={`px-2 py-1 rounded-md text-xs font-medium disabled:opacity-50 ${
          isJoined
            ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
            : 'bg-teal-600 text-white'
        }`}
      >
        {status === 'loading' ? '...' : isJoined ? 'Leave queue' : 'Join queue'}
      </button>
    </div>
  );
}

export default QueueButton;
