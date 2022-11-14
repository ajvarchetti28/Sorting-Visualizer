import React from 'react';
import {getMergeSortAnimations, getBubbleSortAnimations, getQuickSortAnimations, getHeapSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 150;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'lightgray';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          barOneStyle.backgroundColor = `hsl(${newHeight * (3/5)}, 80%, 50%)`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
            //SWAP THE VALUES
          const [barOne, barTwo] = animations[i];
          const barOneStyle = arrayBars[barOne[0]].style;
          barOneStyle.height = `${barOne[1]}px`; 
          barOneStyle.backgroundColor = `hsl(${barOne[1] * (3/5)}, 80%, 50%)`;;        
          const barTwoStyle = arrayBars[barTwo[0]].style;
          barTwoStyle.height = `${barTwo[1]}px`;
          barTwoStyle.backgroundColor = `hsl(${barTwo[1] * (3/5)}, 80%, 50%)`;;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
            //SWAP THE VALUES
            const [barOne, barTwo] = animations[i];
            const barOneStyle = arrayBars[barOne[0]].style;
            barOneStyle.height = `${barOne[1]}px`; 
            barOneStyle.backgroundColor = `hsl(${barOne[1] * (3/5)}, 80%, 50%)`;;;        
            const barTwoStyle = arrayBars[barTwo[0]].style;
            barTwoStyle.height = `${barTwo[1]}px`;
            barTwoStyle.backgroundColor = `hsl(${barTwo[1] * (3/5)}, 80%, 50%)`;;;
        }, i * ANIMATION_SPEED_MS);
      }
    }    
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;    
        setTimeout(() => {
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
            //SWAP THE VALUES
            //barOne[0] index
            //barOne[1] height
          const [barOne, barTwo] = animations[i];

          const barOneStyle = arrayBars[barOne[0]].style;
          barOneStyle.height = `${barOne[1]}px`;
          barOneStyle.backgroundColor = `hsl(${barOne[1] * (3/5)}, 80%, 50%)`;;;
          
          const barTwoStyle = arrayBars[barTwo[0]].style;
          barTwoStyle.height = `${barTwo[1]}px`;
          barTwoStyle.backgroundColor = `hsl(${barTwo[1] * (3/5)}, 80%, 50%)`;;;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className= "header">
        <text>Sorting Algorithm Visualizer by AJ Varchetti</text>
        
        <div className="button-container">
          <button className = "button" onClick={() => this.resetArray()}>Generate New Array</button>
          <button className = "button" onClick={() => this.mergeSort()}>Merge Sort</button>
          <button className = "button" onClick={() => this.quickSort()}>Quick Sort</button>
          <button className = "button" onClick={() => this.heapSort()}>Heap Sort</button>
          <button className = "button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          </div>
      
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: `hsl(${value * (3/5)}, 80%, 50%)`,
                height: `${value}px`,
              }}></div>
          ))}   
      </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}