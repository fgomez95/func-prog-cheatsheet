var moviesModule = require("./seeds.js");

/*
1) Isolated functions - there is no dependence on the state of the program, which includes global
 variables that are subject to change

2) Pure functions - the same input always gives the same output

3) Functions with limited side effects - any changes, or mutations, to the state of the program 
outside the function are carefully controlled
*/




const preprareiPhone = () => ['headphones', 'iphone', 'charger'];

let generateOrder = (batches = 1) => {
    let finalOrder = [];
    function addItem(counter) {
        if (counter == 0) return finalOrder;
        finalOrder.push(preprareiPhone());
        addItem(counter - 1);
    }
    addItem(batches);
    return finalOrder;
};

console.log('***first order***\n', generateOrder());

/* First Class Functions: All JavaScript functions,
 * Higher Order Functions: All functions that accept another function 
 * Lambda Function: A function that is passed or returned to another function;
 */

generateOrder = (product, batches = 1) => {
    let finalOrder = [];
    function addItem(product, batches) {
        if (!product || batches == 0) return finalOrder;
        finalOrder.push(product());
        addItem(product, batches - 1);
    }
    addItem(product, batches);
    return finalOrder;
};

const prepareiPadPromo = () => ['iPad Pro', 'charger', 'case'];

const iphones = generateOrder(preprareiPhone, 3);
const ipads = generateOrder(prepareiPadPromo, 4);

console.log('***generate iphones and ipads order***\n', iphones, ipads);

// Avoid mutations and side effects
var fixedValue = 4;

//good
function ingrementCount() { return fixedValue + 1; };
console.log('result: ', ingrementCount(), 'fixed value: ', fixedValue);

/*
this function might throw unexpected output
function ingrementCount() { return fixedValue++; }
console.log('result: ', ingrementCount(), 'fixed value: ', fixedValue);
*/

// Avoid external dependence in a function 
function decrementCount(val) { return val - 1; };
console.log('external dependence: ', decrementCount(fixedValue));
console.log('fixed value: ', fixedValue);

// Use map to access and extract data
const getMovieList = () => {
    return [
        {
            "Title": "Inception",
            "Year": "2010",
            "Rated": "PG-13",
            "imdbRating": "8.8",
            "imdbVotes": "1,446,708",
            "imdbID": "tt1375666",
            "Type": "movie",
            "Response": "True"
        },
        {
            "Title": "Interstellar",
            "Year": "2014",
            "Rated": "PG-13",
            "imdbRating": "8.6",
            "imdbVotes": "910,366",
            "imdbID": "tt0816692",
            "Type": "movie",
            "Response": "True"
        }
    ];
};

const newMovieArray = getMovieList().map(el => {
    return {
        title: el.Title,
        rating: el.imdbRating
    };
});

console.log(newMovieArray);

// understanding built-in map
let myArr = [10, 20, 30];

Array.prototype.myMap = function (callback) {
    let newArr = [];
    this.forEach(el => newArr.push(callback(el)));
    return newArr;
};

const arrEx = myArr.myMap(function(el){
    return el * 10;
});

console.log(arrEx);

// Filter the data with map and transform it with filter
var filteredList = moviesModule.getMovieWatchList()
.filter(el => ( el["imdbRating"] >= 8))
.map(el => ({ title: el["Title"], rating: el["imdbRating"] }));


console.log(filteredList);

// Implement own version of filter 
const arr = [1,2,3,4,5,6];

Array.prototype.customFilter = function(callback){
    let newArr = [];
    this.forEach(el => { if(callback(el)) newArr.push(el); });
    return newArr;
};

console.log(arr.customFilter((el) => el > 3));

// Get portion of an array's items using Slice
const myVehicleArray = ['Car', 'Bike', 'Truck', 'Bus'];

function sliceVehicles(arr, start, end){
    const myNewVehicleArray = arr.slice(start, end);
    return myNewVehicleArray;
};

console.log(sliceVehicles(myVehicleArray, 2, 3));

// Analyze data with reduce
function getAverageRating(arr, director){
    const rateFilter = arr.filter(el => el.Director === director)
        .map(el => el.imdbRating);
    return rateFilter
        .reduce((reducer, el) => Number(reducer) + Number(el)) / rateFilter.length; 
};

console.log(getAverageRating(moviesModule.getMovieWatchList(), 'Christopher Nolan'));

// Arrange the data using Sort
function alphabeticalOrder(arr){
    return arr.sort((a, b) => a.localeCompare(b));
};

console.log(alphabeticalOrder(['a', 'b', 'r', 'g', 'z']));

// Sort elements in a immutable fashion
function nonMutatingSort(arr){
    return Object.assign([], arr).sort();
};

const myOriginalArr = [5, 7, 6, 8, 7, 8];
console.log(myOriginalArr, nonMutatingSort(myOriginalArr));

// Split a string by matching a rule using Regex
const myNewString =  'Hello, World';

function splitifyString(str){ return str.split(/\W/); };
console.log(splitifyString(myNewString));

// Combine array into a string using Join
function myJoin(str){ return str.split(/\W/).join(' ');  };
console.log(myJoin('Hello,-World.'));

// Convert string to URL slug without replace
const bookTitle = "Les Fleurs Du Mal";
const anotherBook = "   The winter is comming   ";

function urlSlug(title) {
    return title.toLowerCase().split(" ")
        .filter(el => el !== "").join("-");
}

console.log(urlSlug(bookTitle));
console.log(urlSlug(anotherBook));

// Use every to check if all elements meet function criteria
const posNumbers = [1, 2, 3, 4];
const negNumbers = [-1, -3, -4];
const mixNumbers = [1, -2, 3, 8, 7, -9];

function allPositives(arr){
    return arr.every(el => el >= 0);
}

console.log(allPositives(posNumbers));
console.log(allPositives(negNumbers));
console.log(allPositives(mixNumbers));

// use Some to find at least one match

function verifyNegative(arr){
    return arr.some(el => el < 0);
};

console.log(verifyNegative(posNumbers));
console.log(verifyNegative(mixNumbers));
