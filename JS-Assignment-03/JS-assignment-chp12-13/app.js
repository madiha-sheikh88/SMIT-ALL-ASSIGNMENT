// // 1.  Write a program that takes a character (number or string) in a variable & checks whether the given input is a number, uppercase letter or lower case letter. (Hint: ASCII codes:- =65, Z=90, a=97, z=122).

// var userInput = prompt("Enter any single digit or alphabet (upper case or lowercase)");
// var asciiValue = userInput.charCodeAt(0);
// if (asciiValue >=65 && asciiValue <=90) {
//     console.log(`${userInput} is a capital letter (upper case)`);
//    }  else if (asciiValue >=97 && asciiValue <=122) {
//     console.log(`${userInput} is small letter (lower case)`);
//         } else if (asciiValue >=48 && asciiValue <=57) {
//     console.log(`${userInput} is a digit`);
//     } else {
//     console.log("wrong input");
// }


// // Write a JavaScript program that accept two integers and display the larger. Also show if the two integers are equal.

// var firstInteger =+prompt("Enter first integer");
// var secondInteger =+prompt("Enter second integer");
// if (firstInteger === secondInteger) {
//     console.log(`Two integers are equal`);
    
// } else if (firstInteger>secondInteger){ 
//     console.log(`The larger integer is: ${firstInteger}`);
// } else { 
//     console.log(`The larger integer is: ${secondInteger}`);
// }


// // 3. Write a program that takes input a number from user & state whether the number is positive, negative or zero.


// var num = +prompt("Enter a number");
// if (num > 0) {
//     console.log(`The number is positive`);
// } else if (num < 0 ) {
//     console.log(`The number is negative`);
// }
//  else {
//     console.log(`The number is zero`);
// }


// // 4. Write a program that takes a character (i.e. string of length 1) and returns true if it is a vowel, false otherwise

// var singleAlph =prompt("Enter an alphabet to check if it's a vowel");
// if (singleAlph == "a" || singleAlph == "e" || singleAlph == "i" || singleAlph == "o" || singleAlph == "u") {
//     console.log(`True`);
// } else {
//     console.log(`False`);
// }

// // 5. Write a program that 
// // a. Store correct password in a JS variable. 
// // b.  Asks user to enter his/her password 
// // c.   Validate the two passwords: 
// // i. Check if user has entered password. 
// // If not, then give message “ Please enter your password” ii. Check if both passwords are same. If they are  same, show message “Correct! The password you entered matches the original password”. Show “Incorrect password” otherwise.

// var correctPass = "hello1234";
// var password = prompt("Enter password here..");
// if (!password) {
//     console.log("Please enter your password");
// }   else if (password === correctPass) {
//     console.log("Correct! The password you entered matches the original password");
// } else {
//     console.log("Incorrect password");
// }


// // 6. This if/else statement does not work. Try to fix it: 
// // var greeting; 
// // var hour = 13; 
// // if (hour < 18) { 
// // greeting = "Good day"; 
// // else 
// // greeting = "Good evening"; 
// // } 


// var greeting; 
// var hour = 13; 
// if (hour < 18) { 
// greeting = "Good day";
// console.log(greeting);

// } else {
// greeting = "Good evening";
// console.log(greeting);
// } 


// // 7. Write a program that takes time as input from user in 24 hours clock format like: 1900 = 7pm. Implement the following case using if, else & else if statements

var userTime = +prompt("Please enter time in 24 hours clock format like: 1900 = 7pm");
if (userTime < 0 || userTime > 2359){
    console.log("Enter a valid time");
} else if (userTime >= 0 && userTime < 1200) {
    console.log("Good Morning");
} else if (userTime >= 1200 && userTime <= 2400) {
    console.log("Good Night");
}  else {
    console.log("Incorrect time format");
}
