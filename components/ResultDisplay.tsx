
'use client';

import { useState } from 'react';

interface ResultDisplayProps {
  result: string;
  recordCount: number;
}

export default function ResultDisplay({ result, recordCount }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  return (
    <div className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-xl shadow-xl">
      <div className="flex items-center justify-between p-6 border-b border-slate-600/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl">
            <i className="ri-file-list-3-line text-white text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Lista Formatada
            </h3>
            <p className="text-slate-400 text-sm">
              {recordCount} registros processados
            </p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-6 py-3 font-medium rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105 whitespace-nowrap cursor-pointer ${
            copied 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className={copied ? "ri-check-line" : "ri-file-copy-line"}></i>
          </div>
          <span>{copied ? 'Copiado!' : 'Copiar Lista'}</span>
        </button>
      </div>
      
      <div className="p-6">
        <textarea
          value={result}
          readOnly
          className="w-full h-40 p-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-200 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
          placeholder="O resultado formatado aparecerá aqui..."
        />
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Pronto para usar em suas campanhas</span>
          <span>{result.length} caracteres</span>
        </div>
      </div>
    </div>
  );
}
