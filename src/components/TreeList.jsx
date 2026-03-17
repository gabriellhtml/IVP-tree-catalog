import React from 'react';

export default function TreeList({ trees, onEdit, onDelete }) {
    if (trees.length === 0) {
        return <div className="text-center p-6 bg-white rounded-lg shadow text-gray-500">Nenhuma árvore catalogada ainda.</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Espécie</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Biometria</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IVP</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {trees.map((tree) => (
                        <tr key={tree.id}>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{tree.species}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                Altura: {tree.height}m <br/>
                                Diâmetro: {tree.diameter}cm
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-bold text-green-600">{tree.ivp?.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => onEdit(tree)} className="text-blue-600 hover:text-blue-900 mr-4">Editar</button>
                                <button onClick={() => onDelete(tree.id)} className="text-red-600 hover:text-red-900">Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}