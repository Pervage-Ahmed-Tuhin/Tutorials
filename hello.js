var userName;
userName = "John";
var age;
age = 30;
console.log("Hello ".concat(userName, "!"));
console.log("\n");
console.log("Your age is ".concat(age));
//using array and also seeing array of objects
var user = {
    name: "Tuhin",
    age: 23,
    hobbies: ["Sports", "Cooking"]
};
console.log(user.name);
console.log("\n");
console.log(user.age);
console.log("\n");
console.log(user.hobbies);
var users = [user];
console.log("\n");
console.log(users);
//this is how to use array 
var students;
students = ["John", "Doe", "Smith"];
console.log("\n");
var person1 = {
    name: "Abir",
    age: 21,
    hobbies: ["Sports", "Cooking"],
    gender: "male"
};
var person2 = {
    name: "Tuhin",
    age: 23,
    hobbies: ["Sports", "Cooking"]
};
console.log(person1);
console.log("\n");
console.log(person2);
//using funciton
var calculateMyAge = function (birthYear) {
    return new Date(Date.now()).getFullYear() - birthYear;
};
var myAge = calculateMyAge(2002);
console.log("Your age is :" + myAge);
