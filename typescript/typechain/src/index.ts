console.log("Hello World!");

interface Human {
    name: string;
    age: number;
    gender: string;
};

const person = {
    name: "Augustine Nguyen",
    age: 31,
    gender: "male"
};

const sayHi = (person: Human) => {
    console.log(`Hello ${person.name}, you are ${person.age}, and you are a ${person.gender}.`);
}

// sayHi(yourName, age, gender);
// sayHi("Smith", 28, "male");
// sayHi("Sally", 25, "female");
sayHi(person);

export {};