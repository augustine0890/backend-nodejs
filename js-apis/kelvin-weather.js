// Temperature in Kelvin
const kelvin = 293;

// Convert Kelvin to Celsius
let celsius = kelvin - 273;

// Calculate Fahrenheit
let farenheit = Math.floor(celsius*(9/5) + 32);

// Convert Celsius to Newton scale
let newton = Math.floor(celsius*(33/100));

console.log(`The temperature is ${kelvin} degrees Kelvin.`);
console.log(`The temperature is ${celsius} degrees Celsius.`);
console.log(`The temperature is ${farenheit} degrees Fahrenheit.`);
console.log(`The temperature is ${newton} degrees Newton.`);