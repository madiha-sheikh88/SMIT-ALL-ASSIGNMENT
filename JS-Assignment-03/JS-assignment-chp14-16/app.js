// // 1.  Declare an empty array using JS literal notation to store student names in future.

// var studentNames = [];

// // 2. Declare an empty array using JS object notation to store student names in future.

// var studentNames = new Array();



// // 3. Declare and initialize a strings array. 

// var stringArray = ["Azeena" , "Zoha" , "Arwa"];
//     console.log(stringArray);
    

// // 4.  Declare and initialize a numbers array. 

// var numberArray = [1 , 2 , 3 , 4 , 5];
// console.log(numberArray);


// // 5.  Declare and initialize a boolean array. 

// var booleanArray = [true , false];
// console.log(booleanArray);


// // 6. Declare and initialize a mixed array. 

// var mixedArray = ["Azeena" , 3 , 5 , "Zoha" , false , true , "Arwa" , null , undefined];
// console.log(mixedArray);


// // 7. Declare and Initialize an array and store available education qualifications in Pakistan (e.g. SSC, HSC, BCS, BS, BCOM, MS, M. Phil., PhD). Show the listed qualifications in your browser like:

// var qualificationList = ["SSC", "HSC","BCS","BS","BCOM","MS","M. Phil.","PhD"];
// console.log(qualificationList);
// document.write(`<h3>Qualification:</h3>`);
// document.write(`
//     <ol>
//     <li> ${qualificationList[0]}</li>
//     <li> ${qualificationList[1]}</li>
//     <li> ${qualificationList[2]}</li>
//     <li> ${qualificationList[3]}</li>
//     <li> ${qualificationList[4]}</li>
//     <li> ${qualificationList[5]}</li>
//     <li> ${qualificationList[6]}</li>
//     <li> ${qualificationList[7]}</li>
//     </ol>
//     `);


// // 8. Write a program to store 3 student names in an array.Take another array to store score of these three students. Assume that total marks are 500 for each student, display the scores & percentages of students.

// var studentNames = ["Azeena" , "Zoha" , "Arwa"];
// var studentMarks = [450 , 480 , 390];
// var totalMarks = 500;
// for (var i = 0; i < studentNames.length; i++) {
//     var percentage = (studentMarks[i]/totalMarks) * 100;
//     document.write(`<p>Score of ${studentNames[i]} is ${studentMarks[i]}. Percentage : ${percentage}%</p>`)
// }



// // 9. Initialize an array with color names. Display the array elements in your browser. 
// // a. Ask the user what color he/she wants to add to the beginning & add that color to the beginning of the array. Display the updated array in your browser. 
// // b. Ask the user what color he/she wants to add to the end & add that color to the end of the array. Display the updated array in your browser. 
// // c. Add two more color to the beginning of the array. Display the updated array in your browser. 
// // d. Delete the first color in the array. Display the updated array in your browser. 
// // e. Delete the last color in the array. Display the updated array in your browser. 
// // f. Ask the user at which index he/she wants to add a color & color name. Then add the color to desired 
// // position/index. Display the updated array in your browser. 
// // g. Ask the user at which index he/she wants to delete color(s) & how many colors he/she wants to delete Then remove the same number of color(s) from user-defined position/index. . Display the updated array in your browser. 

// var colorNames = ["blue" , "pink" , "yellow" , "lilac"];
// console.log(colorNames);
// document.write(`${colorNames}<br>`);
// var userColor1 = prompt("Enter a colour name that you want to enter in the begining"); // a
// colorNames.unshift(userColor1);
// console.log(colorNames);
// document.write(`<br>${colorNames}`);
// var userColor2 = prompt("Enter a colour name that you want to enter in the end"); // b
// colorNames.push(userColor2);
// console.log(colorNames);
// document.write(`<br>${colorNames}`);
// colorNames.push("orange" , "purple"); //c
// console.log(colorNames);
// document.write(`<br>${colorNames.join(" , ")}`);
// colorNames.shift(); // d
// console.log(colorNames);
// document.write(`<br>${colorNames.join(" , ")}`);
// colorNames.pop(); // e
// console.log(colorNames);
// document.write(`<br>${colorNames.join(" , ")}`);
// var indexNum = +prompt("Enter an index number where you want to add colour"); // f
// var userColor3 = prompt("Enter a colour name that you want to enter in array"); // f
// colorNames.splice(indexNum, 0 , userColor3);
// console.log(colorNames);
// document.write(`<br>${colorNames.join(" , ")}`);
// var indexNumber = +prompt("Enter an index number at which you want to delete colour"); // g
// var numDelete = +prompt("Enter how many colours you want to delete"); // g
// colorNames.splice(indexNumber, numDelete);
// console.log(colorNames);
// document.write(`<br>${colorNames.join(" , ")}`);



// // 10. Write a program to store student scores in an array & sort the array in ascending order using Array’s sort method.

// var studentScore = [25, 90, 50, 82, 45, 69, 37];
// document.writeln(`Score of students: ${studentScore.join(" , ")} <br>`);
// studentScore.sort(function(a, b) {
//     return a - b;
// });
// console.log(studentScore);
// document.writeln(`<br>Ordered Score of students: ${studentScore.join(" , ")}`);



// // 11. Write a program to initialize an array with city names. Copy 3 array elements from cities array to selected Cities array. 

// var cities = ["Karachi" , "Lahore" , "Ialamabad" , "Quetta" , "Peshawar"]
// document.write(`<h3>Cities List</h3>
//     <p>${cities.join(" , ")}</p>
//     `)
//     console.log(cities);
// var selectedCities = cities.slice(2 , 4);
// document.write(`<h3>Selected Cities List</h3>
//     <p>${selectedCities.join(" , ")}</p>
//     `)
//     console.log(selectedCities);


// // 12.  Write a program to create a single string from the below mentioned array:  var arr = [“This ”, “ is ”, “ my ”, “ cat”]; (Use array’s join method) 

// var arr = ["This" ,  "is" , "my" , "cat"];
// document.write(`
//     <h3>Array:</h3>
//     <p>${arr.join(",")}</p>
//     `)

// document.write(`
//     <h3>String:</h3>
//     <p>${arr.join(" ")}</p>
//     `)

// // 13.  Create a new array. Store values one by one in such a way that you can access the values in the order in which they were stored. (FIFO-First In First Out) 

// var array = [];
// array.push("Burger");
// array.push("Pizza");
// array.push("Coke");
// array.push("Fries");
// array.push("Dip");
// console.log(array);
// document.write(`<strong>Food Items:</strong> <br> ${array}`);
// document.write(`<br> Out: <br> ${array.shift()}`);
// document.write(`<br> Out: <br> ${array.shift()}`);
// document.write(`<br> Out: <br> ${array.shift()}`);
// document.write(`<br> Out: <br> ${array.shift()}`);
// document.write(`<br> Out: <br> ${array.shift()}`);

// // 14.  Create a new array. Store values one by one in such a way that you can access the values in reverse order. (Last In-First Out)

// var array = [];
// array.push("keyboard");
// array.push("mouse");
// array.push("printer");
// array.push("monitor");
// console.log(array);
// document.write(`<strong>Devices:</strong> <br> ${array}`);
// document.write(`<br> Out: <br> ${array.pop()}`);
// document.write(`<br> Out: <br> ${array.pop()}`);
// document.write(`<br> Out: <br> ${array.pop()}`);
// document.write(`<br> Out: <br> ${array.pop()}`);



   
// 15.  Write a program to store phone manufacturers (Apple, Samsung, Motorola, Nokia, Sony & Haier) in an array. Display the following dropdown/select menu in your browser using document.write() method:

var phoneManufacturers = ["Apple" , "Samsung" , "Motorola" , "Nokia" , "Sony" , "Haier"];
document.write(`
<select id="phone-manufacturers" name="phone manufacturers">
  <option value="" disabled selected>Select a manufacturer...</option>
  <option value=${phoneManufacturers[0]}>Apple</option>
  <option value=${phoneManufacturers[1]}>Samsung</option>
  <option value=${phoneManufacturers[2]}>Motorola</option>
  <option value=${phoneManufacturers[3]}>Nokia</option>
  <option value=${phoneManufacturers[4]}>Sony</option>
  <option value=${phoneManufacturers[5]}>Haier</option>
</select>
    `)