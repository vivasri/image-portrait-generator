
import React, { useState, useCallback } from 'react';
import { generateAiImage } from './services/geminiService';
import { originalImageBase64 } from './constants';
import ImageCard from './components/ImageCard';
import Loader from './components/Loader';
import { GithubIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const result = await generateAiImage(originalImageBase64);
      if (result) {
        setGeneratedImage(`data:image/png;base64,${result}`);
      } else {
        setError('Failed to generate image. The AI did not return an image.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 pb-2">
          AI Engineer Portrait Generator
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          Transforming a portrait into a futuristic vision of an AI engineer.
        </p>
      </header>

      <main className="w-full max-w-5xl flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageCard title="Original Portrait" imageUrl={`data:image/jpeg;base64,${originalImageBase64}`} />
          <div className="flex flex-col items-center justify-center bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-2xl p-8 min-h-[300px] md:min-h-0">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className="text-center text-red-400">
                <p className="font-semibold">Generation Failed</p>
                <p className="text-sm mt-2">{error}</p>
              </div>
            ) : generatedImage ? (
              <ImageCard title="AI Engineer Version" imageUrl={generatedImage} isGenerated={true} />
            ) : (
              <div className="text-center">
                <SparklesIcon className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-200">Your AI-generated portrait will appear here</h3>
                <p className="text-gray-400 mt-2">Click the button below to start the magic.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:saturate-50"
          >
            <span className="absolute left-0 top-0 w-full h-full bg-white opacity-10 blur-lg animate-pulse group-hover:opacity-20"></span>
            {isLoading ? 'Generating...' : 'Generate AI Version'}
            {!isLoading && <SparklesIcon className="w-6 h-6 ml-3 transition-transform group-hover:scale-125" />}
          </button>
        </div>
      </main>

      <footer className="w-full max-w-5xl text-center mt-12 py-4 border-t border-gray-700">
        <p className="text-gray-500">
          Powered by Gemini API & React. Designed by a world-class senior frontend engineer.
        </p>
      </footer>
    </div>
  );
};

export default App;
