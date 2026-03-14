import React, { useState } from 'react';

const TreeForm = () => {
    const [species, setSpecies] = useState('');
    const [biometricData, setBiometricData] = useState({ height: '', diameter: '' });
    const [ivp, setIvP] = useState(0);

    const handleSpeciesChange = (e) => {
        setSpecies(e.target.value);
    };

    const handleBiometricChange = (e) => {
        const { name, value } = e.target;
        setBiometricData({ ...biometricData, [name]: value });
    };

    const calculateIVP = () => {
        // Basic IVP calculation logic (placeholder)
        const height = parseFloat(biometricData.height);
        const diameter = parseFloat(biometricData.diameter);
        if (!isNaN(height) && !isNaN(diameter)) {
            setIvP(height * diameter * 0.5);  // Example calculation
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateIVP();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Species:</label>
                <select value={species} onChange={handleSpeciesChange}>
                    <option value="">Select Species</option>
                    <option value="species1">Species 1</option>
                    <option value="species2">Species 2</option>
                    <option value="species3">Species 3</option>
                    {/* Add more species as needed */}
                </select>
            </div>
            <div>
                <label>Height (m):</label>
                <input type="number" name="height" value={biometricData.height} onChange={handleBiometricChange} required />
            </div>
            <div>
                <label>Diameter (cm):</label>
                <input type="number" name="diameter" value={biometricData.diameter} onChange={handleBiometricChange} required />
            </div>
            <button type="submit">Calculate IVP</button>
            <div>
                <h3>IVP: {ivp}</h3>
            </div>
        </form>
    );
};

export default TreeForm;