class APICombiner {
  static API_BASE = "https://example.com";
  static connectinInterval = 1500;

  constructor(url = "", options = {}) {
    this.url = url;
    this.options = options;
  }

  connect() {
    this.url = url + API_BASE;
  }

  setOptions(options) {
    this.options = options;
  }
}

class SpecialApi {
  connect() {
    this.url = APICombiner.API_BASE + url;
  }
}

const api = new APICombiner("example.com", { reconnect: 15000 });

// Object configuration

const person = {
  firstName: "Vadym",
  lastName: "Iaroshenko",
  age: 15,
  //   get fullName() {
  //     return `${this.firstName} ${this.lastName}`;
  //   },
  set fullName(newFullName) {
    const parts = newFullName.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  },
};

// Object.preventExtensions(person);
// Object.seal(person);
// Object.freeze(person)

// extension
// wrtiable
// deletion

// Property descriptor ->

// value
// writable
// enumerable
// configurable

const newPerson = { ...person, age: 48 };

person.city = "Kyiv";
// console.log(person);

person.firstName = "Pavel";
// console.log(person);

// delete person.age;
// console.log(person);
// console.log(Object.isExtensible(person));
// console.log(Object.isSealed(person))
// console.log(Object.isFrozen(person))

Object.defineProperties(person, {
  city: {
    value: "Kyiv",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  coutry: {
    value: "Ukraine",
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

// delete person.city
Object.defineProperty(person, "city", {
  value: "Sviatopetrivske",
  writable: false,
});

for (const prop in person) {
  console.log(prop);
  console.log(person[prop]);
}

Object.defineProperty(person, "city", {
  value: "Kyiv",
  writable: false,
  enumerable: false,
  configurable: true,
});

// Object.freeze(person);

// console.log(Object.getOwnPropertyDescriptor(person, 'firstName'))
// console.log(Object.getOwnPropertyDescriptors(person, "firstName"));

// person.fullName = "Pavel Iaroshenko";

// console.log(person);

// class Person {
//   #firstName;
//   #lastName;

//   get fullName() {
//     return `${this.#firstName} ${this.#lastName}`;
//   }

//   set fullName(newFullName) {
//     const parts = newFullName.split(" ");
//     this.#firstName = parts[0];
//     this.#lastName = parts[1];
//   }
// }

// const person = new Person();

// person.fullName = "Pavel Iaroshenko";
// console.log(person);

// ---------------------------------------

class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
const myArray = new MyArray(1, 2, 3);
const mapped = myArray.map((x) => x * 2);

console.log(myArray);
console.log(mapped);
// console.log(mapped instanceof MyArray); // false
// console.log(mapped instanceof Array); // true

// ----------------------------------------

class MyClass {
  static [Symbol.hasInstance](value) {
    return false;
  }
}

const obj = new MyClass();

class Animal {
  constructor(name) {
    this.name = name;
  }

  get [Symbol.toStringTag]() {
    return "Animal";
  }
}

const dog = new Animal("Buddy");
console.log(dog.toString());

// Copying objects

const person001 = {
  firstName: "Vadym",
  lastName: "Iaroshenko",
  age: 15,
  school: {
    num: 197,
  },
};

// const someBlobData = {};
const newObj = {
  set: new Set([1, 2, 3]),
//   map: new Map([1, 2, 3]),
  regex: /foo/,
//   deep: { arr: [new File(someBlobData), "file.txt"] },
  error: new Error("Hello!"),
};

newObj.circular = newObj;

const copyObj = structuredClone(person001);

newObj.set = new Set([3, 4, 5])

person001.school.num = 19.7;

copyObj.age = 15.2;
copyObj.school = person001.school;
console.log(person001);
console.log(copyObj);
