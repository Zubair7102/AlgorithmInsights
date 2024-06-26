import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

function GenerateRandomArray() {
  const [randomArray, setRandomArray] = useState(generateRandomArray());
  const [activeIndex, setActiveIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [minIndex, setMinIndex] = useState(-1);
  const [swappedIndices, setSwappedIndices] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [pivotIndex, setPivotIndex] = useState(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortingOptionSelected, setSortingOptionSelected] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  // console.log("Sorting Algorithm is : ", selectedAlgorithm);
  // console.log("Sorting Algorithm selected is : ", selectedAlgorithm.name);

  const sortingSpeed = 200;

  const cities = [
    { name: "Bubble Sort" },
    { name: "Selection Sort" },
    { name: "Merge Sort" },
    { name: "Quick Sort" },
  ];

  function submitSortingMethodHandler() {
    console.log("data type is : ", typeof sortingOptionSelected);
    console.log(
      "sortingOptionSelected is (inside submitSortingMethodHandler) : ",
      sortingOptionSelected
    );
    setSortingOptionSelected(selectedAlgorithm.name);
    console.log(
      "selectedAlgorithm is (inside submitSortingMethodHandler) : ",
      selectedAlgorithm
    );

    if (sortingOptionSelected === "Bubble Sort") {
      console.log("submitSortingMethodHandler ke andar BubbleSort call hua");
      handleBubbleSort();
    } else if (sortingOptionSelected === "Selection Sort") {
      console.log("submitSortingMethodHandler ke andar SelectionSort call hua");
      handleSelectionSort();
    } else if (sortingOptionSelected === "Quick Sort") {
      console.log("submitSortingMethodHandler ke andar QuickSort call hua");
      handleQuickSort();
    } else if (sortingOptionSelected === "Merge Sort") {
      console.log("submitSortingMethodHandler ke andar MergeSort call hua");
      handleMergeSort();
    }
  }

  function generateRandomArray() {
    return Array.from({ length: 10 }, () => {
      let value;
      do {
        value = Math.floor(Math.random() * 100);
      } while (value <= 0); // Keep generating until value is greater than 0
      return value;
    });
  }

  function handleGenerate() {
    const array = generateRandomArray();
    setRandomArray(array);
    setActiveIndex(-1);
    setSortedIndices([]);
    setMinIndex(-1);
  }

  async function handleBubbleSort() {
    setSorting(true);
    let newArray = [...randomArray]; // Create a copy of the array
    let len = newArray.length;

    // Bubble sort algorithm
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        setActiveIndex(j); // Highlight current element being compared
        await new Promise((resolve) => setTimeout(resolve, sortingSpeed)); // Delay to visualize sorting
        if (newArray[j] > newArray[j + 1]) {
          // Swap elements
          let temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;
          setRandomArray([...newArray]); // Update the array after swapping
        }
      }
      setSortedIndices((prevSortedIndices) => [
        ...prevSortedIndices,
        len - 1 - i,
      ]); // Mark the element as sorted
    }

    setActiveIndex(-1); // Reset active index
    setSorting(false);
  }

  async function handleSelectionSort() {
    setSorting(true);
    let newArray = [...randomArray];
    let len = newArray.length;

    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
      setActiveIndex(i);
      for (let j = i + 1; j < len; j++) {
        setActiveIndex(j);
        await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
        if (newArray[j] < newArray[minIndex]) {
          minIndex = j;
        }
        setMinIndex(minIndex);
      }
      [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
      setRandomArray([...newArray]);
      setSortedIndices((prevSortedIndices) => [...prevSortedIndices, i]); // Mark the element as sorted
    }
    setSortedIndices((prevSortedIndices) => [...prevSortedIndices, len - 1]); // Mark the element as sorted
    setSorting(false);
  }

  async function handleMergeSort() {
    setSorting(true);
    let newArray = [...randomArray];
    await mergeSort(newArray, 0, newArray.length - 1);
    const newIndices = [];
    for (let index = 0; index < newArray.length; index++) {
      newIndices.push(index);
    }
    // console.log("NewIndices are : ", newIndices);
    setSortedIndices((prevSortedIndices) => {
      return [...prevSortedIndices, ...newIndices];
    });
    setSorting(false);
    // setSwappedIndices([]);
  }

  async function mergeSort(arr, l, r) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      await mergeSort(arr, l, m);
      await mergeSort(arr, m + 1, r);
      await merge(arr, l, m, r);
    }
  }

  async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);
    const newIndices = [];

    for (let i = 0; i < n1; i++) {
      setActiveIndex(i);
      L[i] = arr[l + i];
    }
    for (let j = 0; j < n2; j++) {
      setActiveIndex(j);
      R[j] = arr[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
        setSwappedIndices([i, j]);
      } else {
        arr[k] = R[j];
        j++;
        setSwappedIndices([i, j]);
      }
      k++;
      setRandomArray([...arr]); // Update the array during sorting
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed)); // Delay for visualization
    }

    setSwappedIndices([]);

    while (i < n1) {
      setActiveIndex(i);
      setSwappedIndices([i, k]);
      arr[k] = L[i];
      i++;
      k++;
      setRandomArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    while (j < n2) {
      setActiveIndex(j);
      setSwappedIndices([j, k]);
      arr[k] = R[j];
      j++;
      k++;
      setRandomArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
    }

    const newIndex = [];
    for (let index = l; index <= r; index++) {
      newIndex.push(index);
    }
    // console.log("NewIndexes are : ", newIndex);

    setSortedIndices((prevSortedIndices) => {
      return [...prevSortedIndices, ...newIndex];
    });
    setSwappedIndices([]);
  }

  async function handleQuickSort() {
    setSorting(true);
    let newArray = [...randomArray];
    await quickSort(newArray, 0, newArray.length - 1);
    setSorting(false);
    setActiveIndex(-1);
    setPivotIndex(-1);
    const newIndices = [];
    for (let index = 0; index < newArray.length; index++) {
      newIndices.push(index);
    }
    // console.log("NewIndices are : ", newIndices);
    setSortedIndices((prevSortedIndices) => {
      return [...prevSortedIndices, ...newIndices];
    });
  }

  async function quickSort(arr, low, high) {
    if (low < high) {
      let pi = await partition(arr, low, high);

      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
      const newIndex = [];
      for (let index = low; index < high; index++) {
        newIndex.push(index);
      }
      console.log("Newindex in quick sort is : ", newIndex);
      setSortedIndices((prevSortedIndices) => {
        return [...prevSortedIndices, newIndex];
      });
    }
  }

  async function partition(arr, low, high) {
    let pivot = arr[high];
    setPivotIndex(high);
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setActiveIndex(j);
      await new Promise((resolve) => setTimeout(resolve, sortingSpeed));
      if (arr[j] < pivot) {
        setSwappedIndices([i + 1, j]);
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setRandomArray([...arr]);
        setSwappedIndices([]);
      }
    }
    setSwappedIndices([i + 1, high]);
    let swap = arr[i + 1];
    arr[i + 1] = arr[high]; // Fix assignment here
    arr[high] = swap;
    setSwappedIndices([]);
    setRandomArray([...arr]);
    setPivotIndex(-1);
    return i + 1;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-60 border border-red-600">
        <div className="flex items-end ">
          {randomArray.map((value, index) => (
            <div key={index} className="flex flex-col">
              <div
                className={`h-auto ${
                  pivotIndex === index
                    ? "bg-green-700"
                    : swappedIndices.includes(index)
                    ? "bg-yellow-800"
                    : sortedIndices.includes(index)
                    ? "bg-pink-500"
                    : minIndex === index
                    ? "bg-red-900"
                    : activeIndex === index
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                } text-white flex items-end justify-center rounded`}
                style={{ height: `${value}px`, width: "30px", margin: "0 3px" }}
              ></div>
              <p className="mx-2">{value}</p>
            </div>
          ))}
        </div>

        <div className="">
          <button
            disabled={sorting}
            onClick={handleGenerate}
            className="disabled:opacity-80 disabled:hover:bg-green-500 mx-2 py-1 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Generate
          </button>
          <button
            // disabled={sorting}
            //  onClick={handleBubbleSort}
            className="disabled:opacity-80 disabled:hover:bg-red-500 mx-2 py-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Bubble Sort
          </button>
          <button
            // disabled={sorting}
            // onClick={handleSelectionSort}
            className="disabled:opacity-80 disabled:hover:bg-red-500 mx-2 py-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Selection Sort
          </button>
          <button
            // disabled={sorting}
            // onClick={handleMergeSort}
            className="disabled:opacity-80 disabled:hover:bg-red-500 mx-2 py-1 px-4 bg-red-500   text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Merge Sort
          </button>
          <button
            // disabled={sorting}
            // onClick={handleQuickSort}
            className="disabled:opacity-80 disabled:hover:bg-red-500 mx-2 py-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Quick Sort
          </button>
        </div>
        <div>
          {/* <Dropdown
            value={selectedAlgorithm}
            onChange={(e) => {
              setSelectedAlgorithm(e.target.value);
              setSortingOptionSelected(e.target.value);
              console.log("Event.target : ", e.target.value);
            }}
            options={cities}
            optionLabel="name"
            placeholder="Select a sorting algorithm"
            className="w-full md:w-14rem"
          />
        </div>
        <Button label="Submit" onClick={submitSortingMethodHandler} /> */}
          <Dropdown
            value={selectedAlgorithm}
            onChange={(e) => {
              setSelectedAlgorithm(e.target.value);
              setSortingOptionSelected(e.target.value);
              console.log("Event.target : ", e.target.value);
            }}
            options={cities}
            optionLabel="name"
            placeholder="Select a sorting algorithm"
            className="w-full md:w-64 border rounded p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <Button
          label="Submit"
          onClick={submitSortingMethodHandler}
          className="bg-blue-500 disabled:opacity-55 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          disabled={sorting}
        />
      </div>
    </div>
  );
}

export default GenerateRandomArray;
