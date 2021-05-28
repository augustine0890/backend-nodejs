console.log("Hello World!");

const yourName = "Augustine",
    age = 31,
    gender = "male";

const sayHi = (yourName, age, gender?) => {
    console.log(`Hello ${yourName}, you are ${age}, and you are a ${gender}.`);
}

sayHi(yourName, age, gender);

export {};