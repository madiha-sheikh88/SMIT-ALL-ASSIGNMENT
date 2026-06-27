// // 1.  Declare and initialize an empty multidimensional array. (Array of arrays)

// var multidimArray = [];



// // 2. Declare and initialize a multidimensional array representing the following matrix:

// var multidimArray = [[0 , 1 , 2, 3] , [1 , 0 , 1 , 2] , [2 , 1 , 0 , 1]];
// console.log(multidimArray);



// // 3. Write a program to print numeric counting from 1 to 10. 
// for (var i = 1 ; i <= 10 ; i++) {
//     console.log(i);
// }


// // 4.  Write a program to print multiplication table of any number using for loop. Table number & length should be taken as an input from user.

// var tableNumber = +prompt("Enter a number to show its multiplication table");
// var tableLength = +prompt("Enter length of the multiplication table");
// console.log(`Multiplication Table of ${tableNumber} Length ${tableLength}`); 
// for (var i = 1; i <= tableLength; i++){
//     var table = tableNumber * i;
//     console.log(`${tableNumber} x ${i} = ${table}`);
// }


// // 5. Write a program to print items of the following array using for loop: fruits = [“apple”, “banana”, “mango”, “orange”, “strawberry”]


// var fruits = ["apple" , "banana" , "mango" , "orange" , "strawberry"];

// for (var i = 0; i < fruits.length; i++) {
//         console.log(fruits[i]);
// }
// for (var i = 0; i < fruits.length; i++) {
//         console.log(`Element at index ${i} is ${fruits[i]}`);
// }


// // 6. Generate the following series in your browser. See example output. 
// // a. Counting: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 
// // b. Reverse counting: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 
// // c. Even: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 
// // d. Odd: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19 
// // e. Series: 2k, 4k, 6k, 8k, 10k, 12k, 14k, 16k, 18k, 20k

// document.write(`<h3><strong>Counting:</strong></h3>`) // a
// for (let i = 1; i <= 15; i++) {
//     document.write(`
//         ${i} ,
//         `)
// }

// document.write(`<h3><strong>Reverse Counting:</strong></h3>`) // b
// for (let i = 10; i >= 1; i--) {
//     document.write(`
//         ${i} ,
//         `)
// }

// document.write(`<h3><strong>Even:</strong></h3>`) // c
// for (let i = 0; i <= 20; i += 2) {
//     document.write(`${i} ,`)
// }

// document.write(`<h3><strong>Even:</strong></h3>`) // d
// for (let i = 1; i <= 20; i += 2) {
//     document.write(`${i} ,`)
// }

// document.write(`<h3><strong>Even:</strong></h3>`) // e
// for (let i = 2; i <= 20; i += 2) {
//     document.write(`${i}k , `)
// }


// // 7. You have an array A = [“cake”, “apple pie”, “cookie”, “chips”, “patties”] Write a program to enable “search by user input” in an array. After searching, prompt the user whether the given item is found in the list or not. Example:

// var A = ["cake" , "apple pie" , "cookies" , "chips" , "patties"];
// var userInput = prompt("Welcome to our bakery! What item would you like to order?");
// var found = false;
// for (let i = 0; i < A.length; i++) {
//     if (A[i] === userInput) {
//         found = true;
//         indexPosition = i;
//         break;
// }
// }
//  if (found)  {     
//     alert(`${userInput} is available at index ${indexPosition} in our bakery`);
//     } else {
//         alert(`We are sorry. ${userInput} is not available in our bakery`);
//     }


// // 8. Write a program to identify the largest number in the given array.


// var A = [24, 53, 78, 91, 12];
// var largestNum = A[0];
// for (let i = 0; i < A.length; i++) {
//     if (A[i] > largestNum) {
//         largestNum = A[i];
//     }    
// }
// document.write(`Array items: ${A.join(" , ")}`);
// document.write(`<br> The largest number is ${largestNum}`);


// // 9. Write a program to identify the smallest number in the given array. 

// var A = [24, 53, 78, 91, 12];
// var smallestNum = A[0];
// for (let i = 0; i < A.length; i++) {
//     if (A[i] < smallestNum) {
//         smallestNum = A[i];
//     }

// }
// document.write(`Array items: ${A.join(" , ")}`);
// document.write(`<br>The smallest number is ${smallestNum}`);



// // 10. Write a program to print multiples of 5 ranging 1 to 100.

for (let i = 5; i <= 100; i +=5) {
    document.write(`${i} , `);
    console.log(i);
}