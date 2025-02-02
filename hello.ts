let userName:string|number ;
userName = "John";
let age:number;
age = 30;
console.log(`Hello ${userName}!`);
console.log("\n");

console.log(`Your age is ${age}`);
 

//using array and also seeing array of objects

const user:{
    name:string,
    age:number,
    hobbies:string[]
} ={
    name:"Tuhin",
    age:23,
    hobbies:["Sports","Cooking"]
}   
console.log(user.name);
console.log("\n");

console.log(user.age);
console.log("\n");

console.log(user.hobbies);

const users:{
    name:string,
    age:number,
    hobbies:string[]
}[]=[user];
console.log("\n");
console.log(users);

//this is how to use array 

let students:string[];
students = ["John","Doe","Smith"];
console.log("\n");


//using explicit type to make the code more cleaner 

type person ={
    name:string;
    age:number;
    hobbies:string[];
    gender?:string;
}

const person1:person={
    name:"Abir",
    age:21,
    hobbies:["Sports","Cooking"],
    gender:"male"
}
const person2:person={
    name:"Tuhin",
    age:23,
    hobbies:["Sports","Cooking"]
}

console.log(person1);
console.log("\n");
console.log(person2);


//using funciton


const calculateMyAge=(birthYear:number):number=>{

    return new Date(Date.now()).getFullYear()-birthYear;

}



const myAge:number = calculateMyAge(2002);


console.log("Your age is :"+myAge);