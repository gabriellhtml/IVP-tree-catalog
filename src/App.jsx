import React, { useState, useEffect } from 'react';
import TreeForm from './components/TreeForm';
import TreeList from './components/TreeList';

import { loadTrees, saveTrees } from './utils/storage';

export default function App() {
    const [trees, setTrees] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState(null);

    useEffect(() => {
        const savedTrees = loadTrees();
        setTrees(savedTrees);
    }, []);

    useEffect(() => {
        saveTrees(trees);
    }, [trees]);

    const handleAddTree = (newTree) => {
        const tree = { ...newTree, id: Date.now(), createdAt: new Date().toISOString() };  
        setTrees([...trees, tree]);
    };

    const handleUpdateTree = (updatedTree) => {
        setTrees(trees.map((tree) => (tree.id === editingId ? { ...tree, ...updatedTree } : tree)));
        setEditingId(null);
        setEditingData(null);
    };

    const handleEditTree = (tree) => {
        setEditingId(tree.id);
        setEditingData(tree);
    };

    const handleDeleteTree = (id) => {
        if (window.confirm('Tem certeza que deseja deletar esta árvore?')) {
            setTrees(trees.filter((tree) => tree.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-700 mb-2">🌳 IVP Tree Catalog</h1>
                    <p className="text-gray-600">Catalogação e cálculo do Índice de Valor Paisagístico de árvores</p>
                </header>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-1">
                        <TreeForm 
                            onSubmit={editingId ? handleUpdateTree : handleAddTree} 
                            initialData={editingData} 
                            isEditing={editingId !== null} 
                            onCancelEdit={() => { setEditingId(null); setEditingData(null); }} 
                        />
                    </div>
                    <div className="md:col-span-2">
                        <TreeList 
                            trees={trees} 
                            onEdit={handleEditTree} 
                            onDelete={handleDeleteTree} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}