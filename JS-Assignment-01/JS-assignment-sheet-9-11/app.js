// // 1.  Write a program to take “city” name as input from user. If  user enters “Karachi”, welcome the user like this: “Welcome to city of lights” 

var cityName = prompt("enter your city name...");
if (cityName === "Karachi" || cityName === "karachi") {
    alert("Welcome to city of lights")
} else {
    alert("Welcome")
}


// // 2. Write a program to take “gender” as input from user. If the user is male, give the message: Good Morning Sir. If the user is female, give the message: Good Morning Ma’am.

// var gender = prompt("Enter your gender here..");
// if (gender === "female" || gender === "Female" || gender === "FEMALE") {
//     alert("Good Morning Ma'am")
// } else {
//     alert("Good Morning Sir")
// }


// // 3. Write a program to take input color of road traffic signal from the user & show the message according to this table: 

// var signalColor = prompt("Enter color of road traffic signal here...");
// if (signalColor === "red") {
//     alert("Must Stop")
// } else if (signalColor === "yellow") {
//     alert("Ready to move")
// } else if (signalColor === "green") {
//     alert("Move now ")
// } else {
//     alert("Invalid color")
// }


// // 4. Write a program to take input remaining fuel in car (in litres) from user. If the current fuel is less than 0.25litres, show the message “Please refill the fuel in your car”

// var carFuel = prompt("Enter the remaining fuels in your car in Litres");
// if (carFuel <= 0.25 ) {
//    alert("Please refill the fuel in your car")
// } else {
//     alert("fuel is sufficient")
// }


// 5. Run this script, & check whether alert message would be displayed or not. Record the outputs. 
// a. 
// var a = 4; 
// if (++a === 5){ 
// alert("given condition for variable a is true"); 
// }
//  ---------------answer: displayed-------------

// b.
//  var b = 82; 
// if (b++ === 83){ 
// alert("given condition for variable b is true"); 
// } 
//  ---------------answer: Not displayed-------------
// //  c.
//   var c = 12; 
// if (c++ === 13){ 
// alert("condition 1 is true"); 
// } 
// //  ---------------answer: Not displayed-------------
// if (c === 13){ 
// alert("condition 2 is true"); 
// } 
// //  ---------------answer: displayed-------------
// if (++c < 14){ 
// alert("condition 3 is true"); 
// } 
// //  ---------------answer: Not displayed-------------
// if(c === 14){ 
// alert("condition 4 is true"); 
// } 
// //  ---------------answer: displayed-------------
 
// // d. 
// var materialCost = 20000; 
// var laborCost = 2000; 
// var totalCost = materialCost + laborCost; 
// if (totalCost === laborCost + materialCost){ 
// alert("The cost equals"); 
// } 
// //  ---------------answer: displayed-------------
// //  e. 
//  if (true){ 
// alert("True"); 
// } 
// if (false){ 
// alert("False"); 
// }
// //  ---------------answer: displayed-------------
// f. 
// if("car" < "cat"){ 
// alert("car is smaller than cat"); 
// } 
// //  ---------------answer: displayed-------------



// // 6. Write a program to take input the marks obtained in three subjects & total marks. Compute & show the resulting percentage on your page. Take percentage & compute grade as per following table:

// var subj1Marks = +prompt("Enter your marks in subject 1..");
// var subj2Marks = +prompt("Enter your marks in subject 2..");
// var subj3Marks = +prompt("Enter your marks in subject 3..");
// var marksObtained = (subj1Marks + subj2Marks + subj3Marks);
// var totalMarks = (300);
// var percentage = ((marksObtained / totalMarks) * 100);
// var grade = "";
// var remarks ="";
//  if (percentage >= 80) {
//             grade = "A-one";
//             remarks = "Excellent";
//         } else if (percentage >= 70) {
//             grade = "A";
//             remarks = "Good";
//         } else if (percentage >= 60) {
//             grade = "B";
//             remarks = "You need to improve";
//         } else {
//             grade = "Fail";
//             remarks = "Sorry";
//         }
// console.log(marksObtained);
// console.log("Mark Sheet");
// console.log("Total Marks: " + totalMarks);
// console.log("Marks Obtained: " + marksObtained);
// console.log("percentage: " + percentage + "%");
// console.log("Grade: " + grade);
// console.log("Remarks: " + remarks);


// // 7. Guess game: Store a secret number (ranging from 1 to 10) in a variable. Prompt user to guess the secret number. 
// // a. If user guesses the same number, show “Bingo! Correct answer”. 
// // b. If the guessed number +1 is the secret number, show “Close enough to the correct answer”.

// var secretNum = 9;
// var userGuess = +prompt("Guess the secret number (ranging from 1 to 10)");
// if (secretNum === userGuess) {
//     alert("Bingo! Correct answer")
// } else if (userGuess + 1 === secretNum) {
//     alert("Close enough to the correct answer")
// } else {
//     alert("Wrong answer")
// }


// // 8. Write a program to check whether the given number is divisible by 3. Show the message to the user if the number is divisible by 3

// var num = +prompt("Enter a number and check if it is divisible by 3..");
// if (num % 3 === 0) {
//     alert("This Number is divisible by 3");
// } else {
//     alert("This Number is not divisible by 3");
// }


// // 9. Write a program that checks whether the given input is an even number or an odd number.
// var num = +prompt("Enter a number to check if it is even or odd");
// if (num % 2 === 0) {
//     alert("Number is even")
// } else {
//     alert("Number is Odd")
// }


// // 10. Write a program that takes temperature as input and shows a message based on following criteria 
// // a. T > 40 then “It is too hot outside.” 
// // b. T > 30 then “The Weather today is Normal.” 
// // c. T > 20 then “Today’s Weather is cool.” 
// // d. T > 10 then “OMG! Today’s weather is so Cool.” 

// var temperature = +prompt("Enter today's temperature in your city..");
// if (temperature > 40) {
//     alert("It is too hot outside.")
// } else if (temperature > 30) {
//     alert("The Weather today is Normal.")
// } else if (temperature > 20) {
//     alert("Today’s Weather is cool.")
// } else if (temperature > 10) {
//     alert("OMG! Today’s weather is so Cool.")
// }
//  else {
//     alert(temperature + "C")
// }


// // 11. Write a program to create a calculator for +,-,*, / & % using if statements. Take the following input: 
// // a. First number 
// // b. Second number 
// // c. Operation (+, -, *, /, %) 
// // Compute & show the calculated result to user. 


// var firstNum = +prompt("Enter First Number here..");
// var secondfNum = +prompt("Enter Second Number here..");
// var Operator = prompt("Enter any operator ( + , - , * , / , %) and get the calculations");
// var result;
// if (Operator === "+") {
//     result = firstNum + secondfNum;
//     alert(result);
// } else if (Operator === "-") {
//     result = firstNum - secondfNum;
//     alert(result);
// }
// else if (Operator === "*") {
//     result = firstNum * secondfNum;
//     alert(result);
// }
// else if (Operator === "/") {
//     result = firstNum / secondfNum;
//     alert(result);
// }
// else if (Operator === "%") {
//     result = firstNum % secondfNum;
//     alert(result);
// } else {
//     alert(invalid);
// }