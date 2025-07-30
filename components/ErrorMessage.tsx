
'use client';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className="w-full bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-xl p-6">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-red-400 to-red-600 rounded-xl flex-shrink-0">
          <i className="ri-error-warning-line text-white text-xl"></i>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-200 mb-2">
            Erro no Processamento
          </h3>
          <p className="text-red-300 text-sm leading-relaxed">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer"
        >
          <i className="ri-close-line"></i>
        </button>
      </div>
    </div>
  );
}
