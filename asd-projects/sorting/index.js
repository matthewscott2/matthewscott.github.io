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

    var index = await partition(array, left, right)
    if (left < index - 1){
        await quickSort(array, left, index - 1)
    }
    if (right > index){
        await quickSort(array, index, right)
    }
}

// TODOs 4 & 5: Implement partition


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