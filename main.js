/*
1) Isolated functions - there is no dependence on the state of the program, which includes global
 variables that are subject to change

2) Pure functions - the same input always gives the same output

3) Functions with limited side effects - any changes, or mutations, to the state of the program 
outside the function are carefully controlled
*/

const preprarePhone = () => ['headphones', 'iphone', 'charger'];

const  generateOrder = (batches = 1) => {
    let finalOrder = [];
    function addOrder(counter){
        if(counter == 0) return finalOrder;
        finalOrder.push(preprarePhone());
        addOrder(counter - 1);
    }

    addOrder(batches);


    return finalOrder;
}

console.log(generateOrder());

