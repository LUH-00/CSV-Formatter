
'use client';

interface ProcessingStatusProps {
  isProcessing: boolean;
}

export default function ProcessingStatus({ isProcessing }: ProcessingStatusProps) {
  if (!isProcessing) return null;

  return (
    <div className="w-full bg-slate-800/50 backdrop-blur-xl border border-purple-500/50 rounded-xl p-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl">
          <i className="ri-cpu-line text-white text-xl animate-pulse"></i>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            Processamento em Andamento
          </h3>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-full rounded-full animate-pulse"></div>
          </div>
          <p className="text-slate-300 text-sm mt-2">
            Analisando dados e formatando contatos...
          </p>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <i className="ri-loader-4-line text-2xl text-purple-400 animate-spin"></i>
        </div>
      </div>
    </div>
  );
}
