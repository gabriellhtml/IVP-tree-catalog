import React, { useState, useEffect } from 'react';
import PlantIdentifier from './PlantIdentifier';

export default function TreeForm({ onSubmit, initialData, isEditing, onCancelEdit }) {
    const [species, setSpecies] = useState('');
    const [height, setHeight] = useState('');
    const [diameter, setDiameter] = useState('');
    const [ivp, setIvp] = useState(0);

    // Preenche o form se for edição
    useEffect(() => {
        if (initialData) {
            setSpecies(initialData.species);
            setHeight(initialData.height);
            setDiameter(initialData.diameter);
            setIvp(initialData.ivp);
        } else {
            resetForm();
        }
    }, [initialData]);

    const resetForm = () => {
        setSpecies('');
        setHeight('');
        setDiameter('');
        setIvp(0);
    };

    // Atualiza o IVP automaticamente enquanto digita
    useEffect(() => {
        const h = parseFloat(height);
        const d = parseFloat(diameter);
        if (!isNaN(h) && !isNaN(d)) {
            setIvp(h * d * 0.5); // Substitua pela sua fórmula real de IVP
        } else {
            setIvp(0);
        }
    }, [height, diameter]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ species, height, diameter, ivp });
        resetForm();
    };

    // Recebe o resultado da IA e preenche o input
    const handleIdentifySuccess = (identifiedSpecies) => {
        setSpecies(identifiedSpecies);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Árvore' : 'Nova Árvore'}</h2>
            
            {/* Componente de IA isolado */}
            {!isEditing && <PlantIdentifier onIdentifySuccess={handleIdentifySuccess} />}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Espécie:</label>
                    <input 
                        type="text" 
                        value={species} 
                        onChange={(e) => setSpecies(e.target.value)} 
                        required 
                        placeholder="Ex: Ipê Amarelo"
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Altura (m):</label>
                    <input 
                        type="number" 
                        step="0.1"
                        value={height} 
                        onChange={(e) => setHeight(e.target.value)} 
                        required 
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Diâmetro (cm):</label>
                    <input 
                        type="number" 
                        step="0.1"
                        value={diameter} 
                        onChange={(e) => setDiameter(e.target.value)} 
                        required 
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md border text-center">
                    <span className="font-bold text-gray-600">IVP Calculado: </span>
                    <span className="text-xl font-bold text-green-700">{ivp.toFixed(2)}</span>
                </div>

                <div className="flex gap-2">
                    <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700">
                        {isEditing ? 'Atualizar' : 'Salvar Árvore'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={onCancelEdit} className="w-full bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600">
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}