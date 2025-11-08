import React, { useState, useCallback } from 'react';
import { GoogleIcon, BingIcon, ExternalLinkIcon, SearchIcon } from './components/icons';

type SearchEngine = 'google' | 'bing';

// Data from the user's JSON request, corrected for syntax and spelling
const configData = {
    open: "baseDados",
    info: "SEJA FELIZ POR FAVOR",
    divulgacao: "https://jesusempoesia.blogspot.com/",
    instrucaoProfundidade: "Use --<numero> para definir a profundidade da busca.",
    requisicao: "executar",
    autorizado: true
};

interface EngineSelectorProps {
    selectedEngine: SearchEngine;
    onEngineChange: (engine: SearchEngine) => void;
}

const EngineSelector: React.FC<EngineSelectorProps> = ({ selectedEngine, onEngineChange }) => {
    // FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
    const engines: { id: SearchEngine; label: string; icon: React.ReactElement }[] = [
        { id: 'google', label: 'Google', icon: <GoogleIcon /> },
        { id: 'bing', label: 'Bing', icon: <BingIcon /> },
    ];

    return (
        <div className="flex items-center space-x-2 rounded-lg bg-gray-800 p-1">
            {engines.map((engine) => (
                <button
                    key={engine.id}
                    onClick={() => onEngineChange(engine.id)}
                    className={`flex items-center justify-center w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                        selectedEngine === engine.id
                            ? 'bg-cyan-600 text-white shadow-md'
                            : 'bg-transparent text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    {engine.icon}
                    <span className="ml-2 hidden sm:inline">{engine.label}</span>
                </button>
            ))}
        </div>
    );
};


export default function App() {
    const [query, setQuery] = useState<string>('');
    const [depth, setDepth] = useState<string>('');
    const [engine, setEngine] = useState<SearchEngine>('google');

    const handleSearch = useCallback(() => {
        if (!query.trim()) {
            // Optional: Add some feedback for empty query
            return;
        }

        let fullQuery = query;
        if (depth && !isNaN(parseInt(depth))) {
            fullQuery = `${query} --${depth}`;
        }

        const encodedQuery = encodeURIComponent(fullQuery);
        const searchUrl =
            engine === 'google'
                ? `https://www.google.com/search?q=${encodedQuery}`
                : `https://www.bing.com/search?q=${encodedQuery}`;

        window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }, [query, depth, engine]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    
    const handlePredefinedSearch = (searchTerm: string, depthValue?: number) => {
        const fullQuery = depthValue ? `${searchTerm} --${depthValue}` : searchTerm;
        const encodedQuery = encodeURIComponent(fullQuery);
        const searchUrl = `https://www.google.com/search?q=${encodedQuery}`;
        window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }

    return (
        <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-mono">
            <div className="w-full max-w-2xl mx-auto space-y-8">
                <header className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        Pesquisa de Profundidade
                    </h1>
                    <p className="mt-2 text-lg text-gray-400 tracking-wider">
                        {configData.info}
                    </p>
                </header>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6 space-y-4">
                    <div className="relative">
                         <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Digite sua busca aqui..."
                            className="w-full pl-4 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-200 text-white placeholder-gray-400"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <SearchIcon />
                        </div>
                    </div>
                   

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                             <label htmlFor="depth" className="text-sm font-medium text-gray-300 mb-1">
                                Profundidade
                            </label>
                            <input
                                id="depth"
                                type="number"
                                value={depth}
                                onChange={(e) => setDepth(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="ex: 23456"
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-200"
                                min="0"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-300 mb-1">
                                Motor de Busca
                            </label>
                            <EngineSelector selectedEngine={engine} onEngineChange={setEngine} />
                        </div>
                    </div>
                     <p className="text-xs text-center text-gray-500">{configData.instrucaoProfundidade}</p>

                    <button
                        onClick={handleSearch}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center text-lg"
                        disabled={!configData.autorizado}
                    >
                        <span className="capitalize">{configData.requisicao}</span>
                    </button>
                </div>

                <div className="text-center space-y-3">
                    <p className="text-gray-400">Ou experimente estes links:</p>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                        <button onClick={() => handlePredefinedSearch('Inteligência Artificial', 20)} className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded-lg shadow-sm transition-colors duration-200">
                            Profundidade--20
                        </button>
                        <button onClick={() => handlePredefinedSearch('Ensino de IA')} className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded-lg shadow-sm transition-colors duration-200">
                            Ensino IA
                        </button>
                    </div>
                </div>

                <footer className="text-center pt-4 border-t border-gray-800">
                    <a
                        href={configData.divulgacao}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-cyan-400 transition-colors duration-200"
                    >
                        Divulgação
                        <ExternalLinkIcon />
                    </a>
                </footer>
            </div>
        </main>
    );
}