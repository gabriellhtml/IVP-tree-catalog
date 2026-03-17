import React, { useState } from 'react';

export default function PlantIdentifier({ onIdentifySuccess }) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault(); // Evita que o formulário recarregue a página
        if (!image) return setError('Por favor, selecione uma imagem.');

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', image);

        try {
            // Chama o SEU backend Python na porta 8000
            const response = await fetch('http://localhost:8000/api/identify', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Falha na identificação');

            const data = await response.json();
            onIdentifySuccess(data.common_name || data.species);

        } catch (err) {
            setError('Erro ao identificar imagem. Verifique se o backend está rodando.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4 p-4 border border-green-200 rounded-md bg-green-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">Identificação por IA (Foto)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2 w-full text-sm" />
            <button 
                type="button" 
                onClick={handleUpload} 
                disabled={!image || loading}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:bg-gray-400 w-full"
            >
                {loading ? 'Analisando imagem...' : 'Identificar Espécie'}
            </button>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    );
}