// // 1.  Write a program to take a number in a variable, do the required arithmetic to display the following result in your browser:

// var a = +prompt("Enter a number:");
// console.log("The value of a is: " + a);
// ++a;
// console.log("The value of ++a is: " + a);
// console.log("Now the value of a is: " + a);
// a++;
// console.log("The value of a++ is: " + (a-1));
// console.log("Now the value of a is: " + a);
// --a;
// console.log("The value of --a is: " + a);
// console.log("Now the value of a is: " + a);
// a--;
// console.log("The value of a-- is: " + (a+1));
// console.log("Now the value of a is: " + a);


// //  2. What will be the output in variables a, b & result after execution of the following script:
// // --a;  // 1
// // --a - --b; // 1 - 0 = 1
// // --a - --b + ++b; // 1 - 0 + 1 = 2
// // --a - --b + ++b + b--; // 1 - 0 + 1 + 1 = 3

// var a = 2, b = 1;
// console.log("a is " + a);
// console.log("b is " + b);
// var result = --a - --b + ++b + b--;
// console.log("result is " + result);

// // 3. Write a program that takes input a name from user & greet the user. 

// var name = prompt("Enter your name:");
// alert("Hello, " + name + "! Welcome to our website!");


// // 5. Write a program to take input a number from user & display it’s multiplication table on your browser. If user does not enter a new number, multiplication table of 5 should be displayed by default. 

// var num = prompt("Enter a number");
// if (num === "" || num === null){
//     num = 5
// } else{
//     num = num
// }
// console.log("Multiplication Table of " + num);
// console.log(num + " x " + 1 + " = " + num * 1)
// console.log(num + " x " + 2 + " = " + num * 2)
// console.log(num + " x " + 3 + " = " + num * 3)
// console.log(num + " x " + 4 + " = " + num * 4)
// console.log(num + " x " + 5 + " = " + num * 5)
// console.log(num + " x " + 6 + " = " + num * 6)
// console.log(num + " x " + 7 + " = " + num * 7)
// console.log(num + " x " + 8 + " = " + num * 8)
// console.log(num + " x " + 9 + " = " + num * 9)
// console.log(num + " x " + 10 + " = " + num * 10)


// // 6. Take a) Take three subjects name from user and store them in 3 different variables.
// // b) Total marks for each subject is 100, store it in another variable. 
// // c) Take obtained marks for first subject from user and stored it in different variable.
// // d) Take obtained marks for remaining 2 subjects from user and store them in variables.
// // e) Now calculate total marks and percentage and show the result in browser like this.(Hint: user table) 

var subject1 = prompt("Enter your first subject name here..");
var subject2 = prompt("Enter your second subject name here..");
var subject3 = prompt("Enter your third subject name here..");
var totalMarks = 100;
var marksSub1 =+prompt("Enter " + subject1 + "  marks");
var marksSub2 =+prompt("Enter " + subject2 + "  marks");
var marksSub3 =+prompt("Enter " + subject3 + "  marks");
var percentSubj1 = ((marksSub1 / totalMarks) * 100);
var percentSubj2 = ((marksSub2 / totalMarks) * 100);
var percentSubj3 = ((marksSub3 / totalMarks) * 100);
var alltotalMarks =(totalMarks + totalMarks + totalMarks);
var totalMarksObtained = (marksSub1 + marksSub2 + marksSub3);
var overallPercentage = ((totalMarksObtained / alltotalMarks) * 100);
document.write(`<table>
    <thead>
    <tr>
    <th>Subject</th>
    <th>Total Marks</th>
    <th>Obtained Marks</th>
    <th>Percentage</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>${subject1}</td>
    <td>${totalMarks}</td>
    <td>${marksSub1}</td>
    <td>${percentSubj1}%</td>
    </tr>
    <tr>
    <td>${subject2}</td>
    <td>${totalMarks}</td>
    <td>${marksSub3}</td>
    <td>${percentSubj2}%</td>
    </tr>
    <tr>
    <td>${subject3}</td>
    <td>${totalMarks}</td>
    <td>${marksSub3}</td>
    <td>${percentSubj3}%</td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
    <td></td>
    <td>${alltotalMarks}</td>
    <td>${totalMarksObtained}</td>
    <td>${overallPercentage}%</td>
    </tr>
    </tfoot>
    </table>`);