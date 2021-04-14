// Accessing Object
const apple = {
    color: "green",
    price: {
        bulk: "$3/kg",
        smallQty: "$4/ks"
    }
};
console.log(apple.color);
console.log(apple.price.bulk);

// Non-existent properties
const classElection = {
    date: "January 12"
};
console.log(classElection.place);

// Objects are mutable
const student = {
    name: "Sheldon",
    score: 100,
    grade: "A",
}
console.log(student);
delete student.score;
student.grade = "B";
console.log(student);
// student = {} // TypeError: assignment to constant variable

// for...in loop
let mobile = {
    brand: "Samsung",
    model: "Galaxy Note 9"
};
for (let key in mobile) {
    console.log(`${key}: ${mobile[key]}`);
}

// passing objects
const origNum = 8;
const origObj = {color: "blue"};
const changeItUp = (num, obj) => {
    num = 7;
    obj.color = "red";
}
changeItUp(origNum, origObj);
console.log(origNum); // passed by value
console.log(origObj); // objects are passed

// Object Methods
const engine = {
    start(adverb) {
        console.log(`The engine start up ${adverb}...`);
    },
    sputter: () => {
        console.log("The engine sputters...");
    },
};
engine.start("noisily");
engine.sputter();

// destructuring assignment
const rubiksCubeFacts = {
    possiblePermutations: '43,252,003,274,489,856,000',
    invented: '1974',
    largestCube: '17x17x17'
};
const {possiblePermutations, invented, largestCube} = rubiksCubeFacts;
console.log(possiblePermutations);
console.log(invented);
console.log(largestCube);

// shorthand property
const activity = "Surfing";
const beach = { activity };
console.log(beach);

// this Keyword
const cat = {
    name: "May",
    age: 4,
    whatName() {
        return this.name;
    }
};
console.log(cat.whatName());

const restaurant = {
    numCustomers: 45,
    seatCapacity: 100,
    availableSeats() {
        return this.seatCapacity - this.numCustomers;
    }
};
console.log(restaurant.availableSeats());

// arrow function
const myObj = {
    data: "abc",
    loggerA: () => {console.log(this.data);}, // do not have their own this context
    loggerB() {
        console.log(this.data);
    }
};
myObj.loggerA();
myObj.loggerB();

// gettes and setters
const myDog = {
    _name: "Rex",
    get name() {
        return this._name;
    },
    set name(newName) {
        if (typeof newName === 'string' && newName.length > 0) {
            this._name = newName;
        } else {
            console.log("ERROR: name must be a non-empty string");
        }
    }
};

// factory functions
const dogFactory = (name, age, breed) => {
    return {
        name: name,
        age: age,
        breed: breed,
        bark() {
            console.log("Woof!");
        }
    };
};

// getters and setters restricted
const myCat = {
    _name: "Dottie",
    get name() {
        return this._name;
    },
    set name(newName) {
        this._name = newName;
    }
};
console.log(myCat.name); // reference invokes the getter
myCat.name = "May"; // assignment invokes the setter
