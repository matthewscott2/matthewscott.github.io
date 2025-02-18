/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
//sorts the elements of the array from smallest to largest
async function bubbleSort(array){
    for (var i = 0; i < array.length; i++){//continues the loop until all values have been checked
        for (var j = array.length - 1; j > 1; j--){ //starts at the end of the array and continues until it reaches the beginning
            if (array[j].value < array[j - 1].value){ //if the current value is less than the previous element, the two elements are swapper
                swap(array, j, j - 1) //actually swaps the two values
                updateCounter(bubbleCounter); //updates the move count
                await sleep(); //pauses for a set amount of time, so you can see the code happening
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){ //creates a function that accepts an array, a right, and a left
    if(right - left < 0){ //executes code if right is less than left
        return //exits the funcion
    }

    var index = await partition(array, left, right) //divides the values into left and right
    if (left < index - 1){ //if left is less than the greatest element of the array, it runs the code block
        await quickSort(array, left, index - 1) //re-calls the quickSort function but with index - 1 as the right parameter
    }
    if (right > index){ //if right is greater than the partititon, it runs the code block
        await quickSort(array, index, right) //re-calls the quickSort function but with index as the left parameter
    }
}

// TODOs 4 & 5: Implement partition
async function partition (array, left, right){
    let pivot = array[Math.floor((right + left) / 2)].value; //creates a variable called pivot, which selects the pivot amount by finding the middle index and using its value
    while (right > left){ //runs the contained code while right is greater than left
        while(array[left].value < pivot){ 
            left = left + 1 //if the left value is still on the left, it increases the value
        }
        while(array[right].value > pivot){
            right = right - 1 //if the right value is still on the right, it increases the value of right
        }
        if (left < right){ //runs the code if left is still less than right
            swap(array, left, right) //swaps the values of left and right
            updateCounter(quickCounter) //upodates the right-sides move counter 
            await sleep(); //pauses so we can see the move
        }
    }

    return left + 1 //returns the value of left plus one
}

// TODO 1: Implement swap
function swap (array, i, j){
    var temp = array[i] //stores array[i] in a emporary variable
    array[i] = array[j] //changes the value of array[i] to equal array[j]
    array[j] = temp //sets array[j] equal to the original array[i]
    drawSwap(array, i, j) //calls drawSwap so that we can visually represent the swap
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}