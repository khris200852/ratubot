import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ResultCard } from './components/ResultCard';
import { fetchMedicalInfo } from './services/geminiService';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { MedicalCondition, AppStatus } from './types';

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [data, setData] = useState<MedicalCondition | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  const { isSpeaking, speak, stop } = useTextToSpeech();

  const handleSearch = async () => {
    if (!query.trim()) return;

    // Reset state
    stop();
    setStatus(AppStatus.LOADING);
    setData(null);
    setErrorMsg('');

    try {
      const result = await fetchMedicalInfo(query);
      setData(result);
      setStatus(AppStatus.SUCCESS);
      
      // Auto-speak result
      const speechText = `Informe sobre ${result.titulo}. ${result.definicion}`;
      speak(speechText);
      
    } catch (err: any) {
      console.error(err);
      setStatus(AppStatus.ERROR);
      setErrorMsg(err.message || 'Ocurrió un error al consultar a Gemini.');
    }
  };

  const handleClear = () => {
    setQuery('');
    setStatus(AppStatus.IDLE);
    setData(null);
    setErrorMsg('');
    stop();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusText = () => {
    if (status === AppStatus.LOADING) return "Consultando a Gemini...";
    if (status === AppStatus.ERROR) return "Error en la consulta";
    if (isSpeaking) return "Hablando...";
    if (status === AppStatus.SUCCESS) return "Listo";
    return "Esperando consulta...";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl h-[90vh] md:h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Sidebar Panel */}
        <Sidebar 
          isSpeaking={isSpeaking} 
          onStopSpeaking={stop} 
          statusText={getStatusText()} 
        />

        {/* Content Area */}
        <div className="flex-1 bg-white p-6 md:p-10 flex flex-col overflow-y-auto">
          
          {/* Search Bar Row */}
          <div className="flex items-center gap-3 mb-8 w-full max-w-2xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="¿Qué condición médica investigamos hoy?"
                className="w-full pl-6 pr-16 py-4 text-lg border-2 border-gray-100 rounded-full outline-none focus:border-blue transition-colors shadow-sm text-gray-700 bg-gray-50 focus:bg-white"
              />
              <button 
                onClick={handleSearch}
                disabled={status === AppStatus.LOADING}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue text-white w-12 h-12 rounded-full hover:scale-105 transition-transform flex items-center justify-center shadow-md disabled:bg-gray-300 disabled:scale-100"
              >
                {status === AppStatus.LOADING ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-magic"></i>
                )}
              </button>
            </div>
            
            <button 
              onClick={handleClear}
              className="w-12 h-12 flex-shrink-0 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-red-500 transition-colors flex items-center justify-center shadow-sm"
              title="Limpiar"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>

          {/* Main Content Render */}
          <div className="flex-1 w-full max-w-3xl mx-auto">
            {status === AppStatus.LOADING && (
              <div className="flex flex-col items-center justify-center mt-20 text-gray-400 space-y-4">
                <div className="w-12 h-12 border-4 border-gray-200 border-l-blue rounded-full animate-spin"></div>
                <p>Analizando datos médicos...</p>
              </div>
            )}

            {status === AppStatus.ERROR && (
              <div className="text-center mt-12 p-8 bg-red-50 rounded-xl border border-red-100">
                <i className="fas fa-exclamation-circle text-4xl text-accent mb-4"></i>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Error de Consulta</h3>
                <p className="text-gray-600">{errorMsg}</p>
                <p className="text-sm text-gray-400 mt-4">Verifica tu API Key o conexión.</p>
              </div>
            )}

            {status === AppStatus.IDLE && (
              <div className="text-center mt-20 opacity-30 select-none">
                <i className="fas fa-user-md text-8xl mb-6 text-gray-300"></i>
                <p className="text-xl">RATUBOT TUMBES está listo para ayudar.</p>
              </div>
            )}

            {status === AppStatus.SUCCESS && data && (
              <ResultCard data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}