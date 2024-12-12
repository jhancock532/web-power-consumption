// Claude Sonnet 3.5 02/12/2024

const fs = require('fs');

// Function to parse the power metrics output
function parsePowerMetrics(inputText) {
    // Split the input text into lines
    const lines = inputText.split('\n').filter(line => line.trim());
    
    // Initialize array to store measurements
    const measurements = [];
    
    // Initialize temporary object to store current measurement
    let currentMeasurement = {};
    
    lines.forEach(line => {
        // Skip the "Password:" line if it exists
        if (line.includes('Password:')) return;
        
        // Parse each line
        const [metric, valueStr] = line.split(': ');
        const value = parseInt(valueStr);
        
        switch(metric) {
            case 'CPU Power':
                // If we already have CPU Power, this is a new measurement
                if (currentMeasurement.cpuPower !== undefined) {
                    measurements.push({...currentMeasurement});
                    currentMeasurement = {};
                }
                currentMeasurement.cpuPower = value;
                break;
            case 'GPU Power':
                currentMeasurement.gpuPower = value;
                break;
            case 'ANE Power':
                currentMeasurement.anePower = value;
                // After ANE Power, the measurement is complete
                measurements.push({...currentMeasurement});
                currentMeasurement = {};
                break;
        }
    });
    
    // Add timestamp to each measurement
    return measurements.map((measurement, index) => ({
        timestamp: index * 1000, // assuming 1000ms interval
        ...measurement
    }));
}

// Example usage:
const inputText = `Password:
CPU Power: 5272 mW
GPU Power: 6 mW
ANE Power: 0 mW
CPU Power: 5114 mW
GPU Power: 10 mW
ANE Power: 0 mW
CPU Power: 5232 mW
GPU Power: 5 mW
ANE Power: 0 mW
CPU Power: 5244 mW
GPU Power: 11 mW
ANE Power: 0 mW`;

const result = parsePowerMetrics(inputText);
console.log(JSON.stringify(result, null, 2));

// To use with the script output:
// 1. Save the script output to a file
// 2. Read and parse the file

const outputText = fs.readFileSync('output.txt', 'utf8');
const parsedData = parsePowerMetrics(outputText);
console.log(JSON.stringify(parsedData, null, 2));
