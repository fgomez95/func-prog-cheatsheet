/*
1) Isolated functions - there is no dependence on the state of the program, which includes global
 variables that are subject to change

2) Pure functions - the same input always gives the same output

3) Functions with limited side effects - any changes, or mutations, to the state of the program 
outside the function are carefully controlled
*/

const preprareiPhone = () => ['headphones', 'iphone', 'charger'];

let  generateOrder = (batches = 1) => {
    let finalOrder = [];
    function addItem(counter){
        if(counter == 0) return finalOrder;
        finalOrder.push(preprareiPhone());
        addItem(counter - 1);
    }

    addItem(batches);


    return finalOrder;
}

console.log('***first order***\n', generateOrder());

/* First Class Functions: All JavaScript functions,
 * Higher Order Functions: All functions that accept another function 
 * Lambda Function: A function that is passed or returned to another function;
 */

generateOrder = (product, batches = 1) => {
    let finalOrder = [];   

    function addItem(product, batches){
        if(!product || batches == 0) return finalOrder;
        finalOrder.push(product());
        addItem(product, batches - 1);
    }
    addItem(product, batches);
    return finalOrder;
 }

const prepareiPadPromo = () => ['iPad Pro', 'charger', 'case']; 

const iphones = generateOrder(preprareiPhone, 3);
const ipads = generateOrder(prepareiPadPromo, 4)

 console.log('***generate iphones and ipads order***\n', iphones, ipads);

 // Avoid mutations and side effects

 var fixedValue = 4;

//good
 function ingrementCount(){ return fixedValue + 1; }
 console.log('result: ', ingrementCount(), 'fixed value: ', fixedValue);

 /*wrong
 function ingrementCount() { return fixedValue++; }
 console.log('result: ', ingrementCount(), 'fixed value: ', fixedValue)
 */