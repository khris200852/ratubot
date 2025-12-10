import React from 'react';
import { MedicalCondition } from '../types';

interface ResultCardProps {
  data: MedicalCondition;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-0 overflow-hidden animate-[fadeIn_0.5s_ease-out]">
      <div className="border-b-2 border-gray-50 p-6 bg-gray-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-primary m-0">{data.titulo}</h1>
          <span className="bg-gradient-to-r from-blue to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
            <i className="fas fa-brain mr-2"></i> Análisis Gemini 2.5
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Definition */}
        <div className="p-5 border-l-4 border-blue bg-blue-50/30 rounded-r-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-info-circle text-blue"></i> Definición
          </h3>
          <p className="text-gray-600 leading-relaxed">{data.definicion}</p>
        </div>

        {/* Symptoms */}
        <div className="p-5 border-l-4 border-accent bg-red-50/30 rounded-r-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-exclamation-triangle text-accent"></i> Cuadro Clínico
          </h3>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
             {data.sintomas.map((symptom, idx) => (
               <li key={idx}>{symptom}</li>
             ))}
          </ul>
        </div>

        {/* Treatment */}
        <div className="p-5 border-l-4 border-success bg-green-50/30 rounded-r-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-user-md text-success"></i> Tratamiento General
          </h3>
          <p className="text-gray-600 leading-relaxed">{data.tratamiento}</p>
        </div>

        <div className="text-xs text-gray-400 text-center pt-4 border-t border-gray-100">
          La información es generada por inteligencia artificial. Por favor, consulte a un médico para diagnósticos reales.
        </div>
      </div>
    </div>
  );
};