import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as carsApi from '../api/carsApi.js';
import { useActiveCar } from '../hooks/useActiveCar.jsx';

const EMPTY_FORM = { make: '', model: '', batteryCapacityKwh: '', currentBatteryPercent: '', chargingPowerKw: '' };

function SelectCarPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const manage = searchParams.get('manage') === 'true';
  const { activeCar, setActiveCar } = useActiveCar();
  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [addStatus, setAddStatus] = useState('idle');
  const [addError, setAddError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const result = await carsApi.listCars();
      setCars(result);

      // Skip the picker only for the post-login gate (not when the user
      // deliberately opened this page via "Change car"/"Add a car" in the nav).
      if (!manage && result.length === 1) {
        setActiveCar(result[0]);
        navigate('/dashboard', { replace: true });
        return;
      }

      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, [manage, navigate, setActiveCar]);

  useEffect(() => {
    load();
  }, [load]);

  function selectCar(car) {
    setActiveCar(car);
    navigate('/dashboard', { replace: true });
  }

  function skipOnboarding() {
    navigate('/map', { replace: true });
  }

  async function handleAddCar(e) {
    e.preventDefault();
    setAddStatus('loading');
    setAddError(null);
    try {
      const car = await carsApi.createCar({
        make: form.make,
        model: form.model,
        batteryCapacityKwh: parseFloat(form.batteryCapacityKwh),
        currentBatteryPercent: parseFloat(form.currentBatteryPercent),
        chargingPowerKw: parseFloat(form.chargingPowerKw),
      });

      if (cars.length === 0) {
        // First car for a brand-new user — select it immediately and go to the Dashboard.
        setActiveCar(car);
        navigate('/dashboard', { replace: true });
        return;
      }

      setCars((prev) => [...prev, car]);
      setForm(EMPTY_FORM);
      setShowAddForm(false);
      setAddStatus('idle');
    } catch (err) {
      setAddError(err.message);
      setAddStatus('error');
    }
  }

  const isOnboarding = cars.length === 0;
  const formVisible = isOnboarding || showAddForm;

  const addCarForm = (
    <form onSubmit={handleAddCar} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
      <input
        required
        placeholder="Make"
        value={form.make}
        onChange={(e) => setForm({ ...form, make: e.target.value })}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
      />
      <input
        required
        placeholder="Model"
        value={form.model}
        onChange={(e) => setForm({ ...form, model: e.target.value })}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
      />
      <input
        required
        type="number"
        placeholder="Battery capacity (kWh)"
        value={form.batteryCapacityKwh}
        onChange={(e) => setForm({ ...form, batteryCapacityKwh: e.target.value })}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
      />
      <input
        required
        type="number"
        placeholder="Current battery %"
        value={form.currentBatteryPercent}
        onChange={(e) => setForm({ ...form, currentBatteryPercent: e.target.value })}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
      />
      <input
        required
        type="number"
        placeholder="Charging power (kW)"
        value={form.chargingPowerKw}
        onChange={(e) => setForm({ ...form, chargingPowerKw: e.target.value })}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
      />
      {addStatus === 'error' && <p className="text-sm text-red-600">{addError}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={addStatus === 'loading'}
          className="px-4 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-md text-sm font-medium disabled:opacity-50"
        >
          {addStatus === 'loading' ? 'Adding...' : 'Add car'}
        </button>
        {isOnboarding ? (
          <button
            type="button"
            onClick={skipOnboarding}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Skip for now
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddForm(false)}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isOnboarding ? 'Add your car' : manage ? 'Your cars' : 'Choose your car'}
        </h1>
        {isOnboarding && status === 'success' && (
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Tell us about your EV to see battery and charge-cost estimates, or skip for now.
          </p>
        )}

        {status === 'loading' && <p className="text-gray-500 dark:text-gray-400">Loading your cars...</p>}

        {status === 'error' && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300">Couldn't load your cars: {error}</p>
            <button onClick={load} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium">
              Retry
            </button>
          </div>
        )}

        {status === 'success' && !isOnboarding && (
          <div className="space-y-3 mb-6">
            {cars.map((car) => (
              <button
                key={car.id}
                onClick={() => selectCar(car)}
                className={`w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:ring-2 hover:ring-gray-900 dark:hover:ring-white ${
                  activeCar?.id === car.id ? 'ring-2 ring-gray-900 dark:ring-white' : ''
                }`}
              >
                <p className="font-semibold text-gray-900 dark:text-white">
                  {car.make} {car.model}
                  {activeCar?.id === car.id && (
                    <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                      (currently driving)
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {car.currentBatteryPercent}% battery &middot; {car.batteryCapacityKwh} kWh capacity
                </p>
              </button>
            ))}
          </div>
        )}

        {status === 'success' && (
          <div>
            {formVisible ? (
              addCarForm
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="text-sm font-medium text-gray-900 dark:text-white underline"
              >
                + Add a car
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectCarPage;
