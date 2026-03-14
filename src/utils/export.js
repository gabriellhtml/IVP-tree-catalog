// Function to export tree data to CSV format
function exportToCSV(treeData) {
    const csvRows = [];
    // Get the headers
    const headers = Object.keys(treeData[0]);
    csvRows.push(headers.join(','));
    // Loop through rows
    for (const row of treeData) {
        const values = headers.map(header => JSON.stringify(row[header], replacer));
        csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
}

// Function to export tree data to JSON format
function exportToJSON(treeData) {
    return JSON.stringify(treeData, null, 2);
}

// Helper function for stringifying CSV values
function replacer(key, value) {
    return value === null ? '' : value;
}

// Exporting functions
module.exports = { exportToCSV, exportToJSON };