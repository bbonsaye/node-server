class Student {
	constructor({ name, age, interestLevel = 5 }) {
		this.name = name;
		this.age = age;
		this.interestLevel = interestLevel;
		this.grades = new Map();
	}
}

let sarah = new Student({ name: "Sarah", age: 22 });

console.log(sarah);
