import React from 'react';

interface SidebarProps {
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  statusText: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isSpeaking, onStopSpeaking, statusText }) => {
  return (
    <div className="w-full md:w-1/3 bg-primary text-white p-8 flex flex-col items-center text-center shadow-lg z-10 md:h-full justify-between">
      
      {/* Top Section */}
      <div className="flex flex-col items-center w-full">
        <div className={`w-[150px] h-[150px] bg-white rounded-full p-1.5 mb-6 relative shadow-[0_0_20px_rgba(52,152,219,0.5)] transition-all duration-300 ${isSpeaking ? 'shadow-[0_0_30px_#27ae60]' : ''}`}>
          <img 
            src="https://img.freepik.com/vector-gratis/lindo-robot-inteligencia-artificial-dibujos-animados-personaje-ciencia-tecnologia-aislado_138676-3155.jpg" 
            alt="AI Agent"
            className={`w-full h-full rounded-full object-cover border-4 transition-all duration-300 ${isSpeaking ? 'border-success animate-speaking-bounce' : 'border-blue'}`}
          />
        </div>

        <h2 className="m-0 text-2xl tracking-wider font-bold">RATUBOT TUMBES</h2>
        <p className="text-sm opacity-70 mt-1">Potenciado por Google Gemini</p>
        <p className="text-xs opacity-50 mb-8 font-light">EsSalud Tumbes todos los derechos reservados.</p>

        <div className="text-xs bg-black/20 px-3 py-1.5 rounded-full flex items-center gap-2 mb-6">
          <span className="w-2 h-2 bg-success rounded-full inline-block"></span>
          Sistema Online
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full mt-auto">
        {isSpeaking && (
          <button 
            onClick={onStopSpeaking}
            className="w-full py-3 px-4 rounded-lg bg-accent text-white font-semibold mb-4 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 animate-pulse"
          >
            <i className="fas fa-stop-circle"></i> Detener Voz
          </button>
        )}
        
        <div className="min-h-[24px] mb-4 text-sm font-medium">
          {statusText}
        </div>

        <p className="text-[0.7rem] opacity-50 border-t border-white/10 pt-4">
          Nota: Los resultados son generados por IA y no sustituyen el consejo médico profesional.
        </p>
      </div>
    </div>
  );
};