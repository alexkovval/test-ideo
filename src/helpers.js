//here I get text and make array of objects - elements that user want to see
export const MakeComponentObjects = (text) => {
  let objectsArray = text.split("\n");
  let arrayElements = [];
  //bring to every value the parameter to use in ui
  objectsArray.forEach((item) => {
    let element = item.split(";");
    let elementForComponent = {};
    element.forEach((e, index) => {
      switch (index) {
        case 0:
          elementForComponent.line = Number(e);
          break;
        case 1:
          elementForComponent.column = Number(e);
          break;
        case 2:
          const firstLetter = e.charAt(0);
          const firstLetterCap = firstLetter.toUpperCase();
          const remainingLetters = e.slice(1);
          const capitalizedWord = firstLetterCap + remainingLetters;
          elementForComponent.label = capitalizedWord;
          break;
        case 3:
          elementForComponent.type = e;
          break;
        case 4:
          //make options for select button
          let valueArray = e.split(",");
          if (valueArray.length > 1) {
            elementForComponent.value = [];
            valueArray.forEach((item, index) => {
              elementForComponent.value = [...elementForComponent.value, item];
            });
          } else {
            elementForComponent.value = e;
          }
          break;
      }
    });
    if (elementForComponent.value)
      arrayElements = [...arrayElements, elementForComponent];
  });
  return arrayElements;
};

//highest number of line that user put in line parameter
export const theHighestLineNumber = (arrayElements) => {
  var highestNumber = 0;
  arrayElements.map((item) => {
    if (item.line > highestNumber) {
      highestNumber = item.line;
    }
  });
  return highestNumber;
};

//make array for line to put in big array of lines arrays with objects
export const sortLines = (arrayElements) => {
  let numLines = theHighestLineNumber(arrayElements);
  let newArrayOfArrayWithElements = [];
  for (let i = 1; i <= numLines; i++) {
    let lineArray = [...arrayElements];
    lineArray = lineArray.filter((item) => item.line === i);
    sortColumns(lineArray);
    newArrayOfArrayWithElements = [...newArrayOfArrayWithElements, lineArray];
  }
  return newArrayOfArrayWithElements;
};

//sort objects in line by parameter column
export const sortColumns = (arrayElements) => {
  function compare(a, b) {
    if (a.column < b.column) {
      return -1;
    }
    if (a.column > b.column) {
      return 1;
    }
    return 0;
  }
  return arrayElements.sort(compare);
};
