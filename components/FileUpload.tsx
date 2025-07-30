
'use client';

import { useRef } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  disabled?: boolean;
}

export default function FileUpload({ onFileSelect, accept = '.csv', disabled = false }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      onFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      <div
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`relative w-full p-8 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${
          disabled
            ? 'border-slate-600 bg-slate-800/30 cursor-not-allowed'
            : 'border-cyan-400/50 bg-slate-800/20 hover:border-cyan-400 hover:bg-slate-700/30'
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl mx-auto mb-4 shadow-lg">
            <i className="ri-upload-cloud-2-line text-2xl text-white"></i>
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">
            Upload do Arquivo CSV
          </h3>

          <p className="text-slate-300 mb-4">
            Arraste seu arquivo aqui ou clique para selecionar
          </p>

          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105 whitespace-nowrap">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-folder-open-line"></i>
            </div>
            <span>Selecionar Arquivo</span>
          </div>

          <p className="text-xs text-slate-400 mt-4">
            Apenas arquivos .csv são aceitos
          </p>
        </div>
      </div>
    </div>
  );
}
