export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

export function getBubbleSortAnimations(array) {

  const animations = []

  for(let i = 0; i < array.length; i++){
      var swapped = false;
      for(let j = 0; j< array.length-i-1; j++){
          if(array[j] > array[j+1]){
              var temp = array[j];
              array[j] = array[j+1];
              array[j+1] = temp;
              swapped = true;

              animations.push([j, j+1]);
              animations.push([j, j+1]);
              animations.push([[j, array[j]], [j+1, array[j+1]]]); 
          }
      }
      
      if(!swapped){
          break;
      }
  }
  return animations
}

export function getQuickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations)
  return animations;
}
  
function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
  
function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
}

function quickSortHelper(array, start, end, animations){

  if(start < end){

    let partionIndex = partition(array, start, end, animations)

    quickSortHelper(array, start, partionIndex - 1, animations);
    quickSortHelper(array, partionIndex + 1, end, animations);
  }
}

function partition(array, start, end, animations){

  let pivot = array[end];
  let i = (start-1);

  for(let j = start; j <= end -1; j++){

    if(array[j] < pivot){

      i++
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      animations.push([i, j]);
      animations.push([i, j]);
      animations.push([[i, array[i]], [j, array[j]]]);

    }
  }

  temp = array[i + 1];
  array[i + 1] = array[end];
  array[end] = temp;

  animations.push([i + 1, end]);
  animations.push([i + 1, end]);
  animations.push([[i + 1, array[i + 1]], [end, array[end]]]);

  return i + 1;
}

export function getHeapSortAnimations(array){
  const animations = [];
  heapSort(array, animations);
  return animations

}

function heapSort(array, animations){
  let size = array.length;

  for(let i = Math.floor(size / 2) - 1; i >= 0; i--){
    heapify(array, size, i, animations);
  }

  for(let i = size - 1; i>= 0; i--){
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    heapify(array, i, 0, animations);

    animations.push([0, i]);
    animations.push([0, i]);
    animations.push([[0, array[0]], [i, array[i]]]);

  }
}

function heapify(array, size, i, animations){

  let root = i;
  let left = 2 * i + 1
  let right = 2* i + 2

  if(left < size && array[left] > array[root]){
    root = left
  }

  if(right < size && array[right] > array[root]){
    root = right
  }

  //Root changed
  if(root !== i){
    let temp = array[i];
    array[i] = array[root];
    array[root] = temp;

    animations.push([i, root]);
    animations.push([i, root]);
    animations.push([[i, array[i]], [root, array[root]]]);

    heapify(array, size, root, animations);
  }
}

