// // 1.  Write a program that take two numbers & add them in a new variable. Show the result in your browser.

var num1 = 10;
var num2 = 5;
var newNum = num1 + num2;
console.log("Sum of " + num1 + " and " + num2 + " is " + newNum);

// // 2. Repeat task1 for subtraction, multiplication, division & modulus.

console.log("Subtraction of " + num1 + " and " + num2 + " is " + (num1 - num2));
console.log("Multiplication of " + num1 + " and " + num2 + " is " + (num1 * num2));
console.log("Division of " + num1 + " and " + num2 + " is " + (num1 / num2));
console.log("Modulus of " + num1 + " and " + num2 + " is " + (num1 % num2));



// // 3. Do the following using JS Mathematic Expressions 
// // a. Declare a variable. 
// // b. Show the value of variable in your browser like “Value after variable declaration is: ??”. 
// // c. Initialize the variable with some number. 
// // d. Show the value of variable in your browser like “Initial value: 5”.
// // e. Increment the variable. 
// // f. Show the value of variable in your browser like “Value after increment is: 6”. 
// // g. Add 7 to the variable. 
// // h. Show the value of variable in your browser like “Value after addition is: 13”. 
// // i. Decrement the variable. 
// // j. Show the value of variable in your browser like “Value after decrement is: 12”. 
// // k. Show the remainder after dividing the variable’s value by 3.
// // l. Output : “The remainder is : 0”. 

// var num;
// console.log("Value after variable declaration is: " + num);
// num = 20;
// console.log("Initial value: " + num);
// num++;
// console.log("Value after increment is: " + num);
// num = num + 7;
// console.log("Value after addition is: " + num);
// num--;
// console.log("Value after decrement is: " + num);
// console.log("The remainder is : " + (num % 3));


// // 4. Cost of one movie ticket is 600 PKR. Write a script to store ticket price in a variable & calculate the cost of buying 5 tickets to a movie. Example output:

// var ticketPrice = 600;
// var numberOfTickets = 5;
// var totalCost = ticketPrice * numberOfTickets;
// console.log("Total cost to buy " + numberOfTickets + " tickets to a movie is " + totalCost + "PKR");

// // 5. Write a script to display multiplication table of any number in your browser. 

// var number = 2;
// console.log("Table of " + number);
// console.log(number + " x " + "1" + " = " + (number * 1));
// console.log(number + " x " + "2" + " = " + (number * 2));
// console.log(number + " x " + "3" + " = " + (number * 3));
// console.log(number + " x " + "4" + " = " + (number * 4));
// console.log(number + " x " + "5" + " = " + (number * 5));
// console.log(number + " x " + "6" + " = " + (number * 6));
// console.log(number + " x " + "7" + " = " + (number * 7));
// console.log(number + " x " + "8" + " = " + (number * 8));
// console.log(number + " x " + "9" + " = " + (number * 9));
// console.log(number +(" x " + "10" + " = " + (number * 10)));


// // 6. The Temperature Converter: It’s hot out! Let’s make a converter based on the steps here. 
// // a.  Store a Celsius temperature into a variable. 
// // b. Convert it to Fahrenheit & output “NNoC is NNoF”.
// // c.  Now store a Fahrenheit temperature into a variable.
// // d. Convert it to Celsius & output “NNoF is NNoC”.

// var celsiusTemp = 30;
// var fahrenheit = (celsiusTemp * 9/5) + 32;
// console.log(celsiusTemp + "°C is " + fahrenheit + "°F");

// var fahrenheitTemp = 86;
// var celsius = (fahrenheitTemp - 32) * 5/9;
// console.log(fahrenheitTemp + "°F is " + celsius + "°C");


// // 7.  Write a program to implement checkout process of a shopping cart system for an e-commerce website. Store the following in variables
// // a. Price of item 1 
// // b. Price of item 2 
// // c. Ordered quantity of item 1 
// // d. Ordered Quantity of item 2 
// // e. Shipping charges
// // Compute the total cost & show the receipt in your browser.

// var priceItem1 = 650;
// var priceItem2 = 100;
// var quantityItem1 = 3;
// var quantityItem2 = 7;
// var shippingCharges = 100;
// var totalCost = (priceItem1 * quantityItem1) + (priceItem2 * quantityItem2) + shippingCharges;
// console.log("Shopping Cart");
// console.log("Price of item 1 is " + priceItem1);
// console.log("Quantity of item 1 is " + quantityItem1);
// console.log("Price of item 2 is " + priceItem2);
// console.log("Quantity of item 2 is " + quantityItem2);
// console.log("Shipping Charges " + shippingCharges);
// console.log("Total cost of your order is " + totalCost);


// // 8. Store total marks & marks obtained by a student in 2 variables. Compute the percentage & show the result in your browser

// var totalMarks = 980;
// var marksObtained = 804;
// var percentage = (marksObtained / totalMarks) * 100;
// console.log("Marks Sheet");
// console.log("Total Marks: " + totalMarks);
// console.log("Marks Obtained: " + marksObtained);
// console.log("Percentage: " + percentage + "%");


// // 9. Assume we have 10 US dollars & 25 Saudi Riyals. Write a script to convert the total currency to Pakistani Rupees. 
// // Perform all calculations in a single expression. (Exchange rates : 1 US Dollar = 104.80 Pakistani Rupee 
// // and 1 Saudi Riyal = 28 Pakistani Rupee)

// var usDollars = 10;
// var saudiRiyals = 25;
// var exchangeRateUSD = 104.80;
// var exchangeRateSR = 28;
// var totalInPKR = (usDollars * exchangeRateUSD) + (saudiRiyals * exchangeRateSR);
// console.log("Currency in PKR");
// console.log("Total currency in PKR: " + totalInPKR);


// // 10.  Write a program to initialize a variable with some number and do arithmetic in following sequence: 
// // a. Add 5 
// // b. Multiply by 10 
// // c. Divide the result by 2 
// // Perform all calculations in a single expression 

// var number = 5;
// console.log(((number + 5) * 10) / 2);


// // 11.  The Age Calculator: Forgot how old someone is? Calculate it! 
// // a. Store the current year in a variable. 
// // b. Store their birth year in a variable. 
// // c. Calculate their 2 possible ages based on the stored 
// // values. 
// // Output them to the screen like so: “They are either NN or NN years old”.

// var currentYear = 2026;
// var birthYear = 1995;
// var possibleAge1 = currentYear - birthYear;
// var possibleAge2 = possibleAge1 - 1;
// console.log("Age Calculator");
// console.log("Current Year: " + currentYear);
// console.log("Birth Year: " + birthYear);
// console.log("Your age is: " + possibleAge1);
// console.log("They are either " + possibleAge1 + " or " + possibleAge2 + " years old.");


// // 12.  The Geometrizer: Calculate properties of a circle. 
// // a. Store a radius into a variable. 
// // b. Calculate the circumference based on the radius, and output “The circumference is NN”. 
// // (Hint : Circumference of a circle = 2 π r , π = 3.142) 
// // Calculate the area based on the radius, and output “The area is NN”. (Hint : Area of a circle = π r2, π = 3.142)

// var radius = 20;
// var pi = 3.142;
// var circumference = 2 * pi * radius;
// var area = pi * radius ** 2;
// console.log("The Geometrizer");
// console.log("Radius of a circle: " + radius);
// console.log("The circumference is " + circumference);
// console.log("The area is " + area);


// // 13.  The Lifetime Supply Calculator: Ever wonder how much a “lifetime supply” of your favorite snack is? Wonder no more. 
// // a. Store your favorite snack into a variable 
// // b. Store your current age into a variable. 
// // c. Store a maximum age into a variable. 
// // d. Store an estimated amount per day (as a number). 
// // e. Calculate how many would you eat total for the rest of your life. Output the result to the screen like so: “You will need NNNN to last you until the ripe old age of NN”. 

// var chips = "Lays";
// var age = 25;
// var maxAge = 80;
// var amountPerDay = 2;
// var totalChips = (maxAge - age) * 365 * amountPerDay;
// console.log("The Lifetime Supply Calculator");
// console.log("Favorite Snack: " + chips);
// console.log("Current Age: " + age);
// console.log("Estimated Maximum Age: " + maxAge);
// console.log("Amount of snacks Per Day: " + amountPerDay);
// console.log("You will need " + totalChips + " " + chips + " to last you until the ripe old age of " + maxAge);


