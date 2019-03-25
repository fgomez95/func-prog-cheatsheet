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

