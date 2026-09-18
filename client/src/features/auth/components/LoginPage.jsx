import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import GoogleSignInButton from './GoogleSignInButton.jsx';

function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    try {
      await login({ email, password });
      navigate('/select-car', { replace: true });
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  const handleGoogleCredential = useCallback(
    async (idToken) => {
      setStatus('loading');
      setError(null);
      try {
        await loginWithGoogle(idToken);
        navigate('/select-car', { replace: true });
      } catch (err) {
        setError(err.message);
        setStatus('error');
      }
    },
    [loginWithGoogle, navigate]
  );

  const handleGoogleError = useCallback((message) => setError(message), []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Log in to VoltPoint</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
            />
          </div>
          {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-md py-2 font-medium disabled:opacity-50"
          >
            {status === 'loading' ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-400 dark:text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="flex justify-center">
          <GoogleSignInButton onCredential={handleGoogleCredential} onError={handleGoogleError} />
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No account?{' '}
          <Link to="/signup" className="text-gray-900 dark:text-white font-medium underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
