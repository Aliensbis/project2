import React, { useState } from 'react';
import { Factory, UserCog } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'production' | 'admin' | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !password) return;

    setIsLoading(true);
    setError('');

    try {
      const success = login(selectedRole, password);
      if (!success) {
        setError('Password non valida');
        setPassword('');
      }
    } catch (err) {
      setError('Si è verificato un errore durante l\'accesso');
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Benvenuto in Bibal Foods
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Seleziona l'area di accesso
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => setSelectedRole('production')}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Factory className="h-12 w-12 text-blue-600 mb-4" />
              <span className="text-lg font-medium text-gray-900">Produzione</span>
              <span className="text-sm text-gray-500 mt-2">Area Operativa</span>
            </button>

            <button
              onClick={() => setSelectedRole('admin')}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <UserCog className="h-12 w-12 text-indigo-600 mb-4" />
              <span className="text-lg font-medium text-gray-900">Amministrazione</span>
              <span className="text-sm text-gray-500 mt-2">Area Gestionale</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <button
            onClick={() => {
              setSelectedRole(null);
              setPassword('');
              setError('');
            }}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-6"
          >
            <span className="mr-2">←</span>
            Torna alla selezione
          </button>

          <div className="flex items-center justify-center mb-8">
            {selectedRole === 'production' ? (
              <Factory className="h-16 w-16 text-blue-600" />
            ) : (
              <UserCog className="h-16 w-16 text-indigo-600" />
            )}
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Accesso {selectedRole === 'production' ? 'Area Produzione' : 'Area Amministrazione'}
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                       shadow-sm text-sm font-medium text-white ${
                         isLoading 
                           ? 'bg-blue-400 cursor-not-allowed' 
                           : 'bg-blue-600 hover:bg-blue-700'
                       } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Accedi'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}