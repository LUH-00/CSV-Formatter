
'use client';

import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import ProcessingStatus from '../components/ProcessingStatus';
import ResultDisplay from '../components/ResultDisplay';
import ErrorMessage from '../components/ErrorMessage';
import { parseCsvContent, processRecords, CsvRecord } from '../lib/csvProcessor';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [recordCount, setRecordCount] = useState(0);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError('');
    setResult('');
    setRecordCount(0);
  };

  const processFile = async () => {
    if (!selectedFile) {
      setError('Por favor, selecione um arquivo CSV primeiro.');
      return;
    }

    setIsProcessing(true);
    setError('');
    setResult('');

    try {
      const content = await selectedFile.text();
      const records: CsvRecord[] = parseCsvContent(content);

      const processedResult = processRecords(records);

      setResult(processedResult);
      setRecordCount(records.length);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao processar o arquivo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResult('');
    setRecordCount(0);
    setError('');
    setIsProcessing(false);
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl shadow-lg">
                <i className="ri-file-excel-2-line text-xl text-white"></i>
              </div>
              <h1 className="text-2xl font-bold text-white">CSV Formatter</h1>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-white">Luan Vinicis</p>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Transforme seus dados CSV em listas otimizadas instantaneamente.
            </p>
          </div>

          {/* Reset Button */}
          {(selectedFile || result || error) && (
            <div className="flex justify-center mb-8">
              <button
                onClick={handleReset}
                className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-restart-line"></i>
                </div>
                <span>Reiniciar Sistema</span>
              </button>
            </div>
          )}

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 mb-8">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg text-white font-bold">
                  1
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  Upload do Arquivo
                </h2>
              </div>
              <FileUpload
                onFileSelect={handleFileSelect}
                disabled={isProcessing}
              />
              {selectedFile && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-checkbox-circle-line text-green-400"></i>
                    </div>
                    <span className="text-green-200 font-medium">
                      {selectedFile.name}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg text-white font-bold">
                  2
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  Processamento
                </h2>
              </div>
              <button
                onClick={processFile}
                disabled={!selectedFile || isProcessing}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className={isProcessing ? "ri-loader-4-line animate-spin text-xl" : "ri-cpu-line text-xl"}></i>
                </div>
                <span className="text-lg">{isProcessing ? 'Processando Dados...' : 'Iniciar Processamento'}</span>
              </button>
            </div>

            {isProcessing && (
              <div className="mb-8">
                <ProcessingStatus isProcessing={isProcessing} />
              </div>
            )}

            {error && (
              <div className="mb-8">
                <ErrorMessage message={error} onClose={clearError} />
              </div>
            )}

            {result && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg text-white font-bold">
                    3
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Resultado Formatado
                  </h2>
                </div>
                <ResultDisplay result={result} recordCount={recordCount} />
              </div>
            )}
          </div>

          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-information-line text-cyan-400"></i>
              </div>
              <span>Guia de Uso</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex-shrink-0 mt-1">
                    <i className="ri-file-text-line text-white"></i>
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium">Formato CSV</p>
                    <p className="text-slate-400 text-sm">Dados separados por ponto e vírgula (;)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex-shrink-0 mt-1">
                    <i className="ri-phone-line text-white"></i>
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium">Limpeza Automática</p>
                    <p className="text-slate-400 text-sm">Remove caracteres especiais dos números</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex-shrink-0 mt-1">
                    <i className="ri-link text-white"></i>
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium">Formatação</p>
                    <p className="text-slate-400 text-sm">Formato: NOME+NÚMERO</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600/30">
                <p className="text-cyan-400 font-semibold mb-2">Exemplo de entrada:</p>
                <div className="text-xs text-slate-300 font-mono bg-slate-800 p-3 rounded-lg border border-slate-600 mb-3">
                  "MARIA IZABEL NUNES";"(98) 98114-2779"<br/>
                  "JOSEMAR SANTOS";"(98) 98813-5218"
                </div>
                <p className="text-green-400 font-semibold mb-2">Resultado:</p>
                <div className="text-xs text-slate-300 font-mono bg-slate-800 p-3 rounded-lg border border-slate-600">
                  MARIA IZABEL NUNES+98981142779,JOSEMAR SANTOS+98988135218
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
            <p className="text-slate-400 text-sm">
              © 2025 Luan Vinicius - Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
