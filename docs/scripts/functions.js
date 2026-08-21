function range(start, stop, step) {
  
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start
        start = 0
    }

    if (typeof step == 'undefined') {
        step = 1
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return []
    }

    var result = []

    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i)
    }

    return result
  
}


// function round(number=0, scale, skipDecimals=false) {

//   // if skipDecimals: 9.00 --> 9, 9.05 --> 9.05

//   if (number) {
  
//     if (skipDecimals) {
      
//       let splitted = String(number).split('.')
      
//       if (splitted.length > 1) {
//         result = Number(number)
//       } else {
//         result = Number(number.toFixed(scale))
//       } 
//     } else {
//       result = Number(number.toFixed(scale))
//     }
    
//   } else {
//     result = NaN
//   }

//   return result
  
// }


function round(number=0, scale, skipDecimals=false) {

  // if skipDecimals: 9.00 --> 9, 9.05 --> 9.05

  if (number) {
  
    if (skipDecimals) {
      
      let splitted = String(number).split('.')
      
      if (splitted.length > 1) {
        
        result = Number(number)
        
      } else {
        
        result = Number(number.toFixed(scale))
        
      } 
      
    } else {
      
      result = Number(number.toFixed(scale))
      
    }
    
  } else {
    
    result = NaN
    
  }

  return result
  
}


function stringAddZeros(value, decimalsNumber) {

  let newValue

  let strValue = String(value)
  let splitted = strValue.split('.')

  if (splitted.length > 1) {

    let partValue = splitted[0]
    let partSplitted = splitted[1]

    if (decimalsNumber) {

      let partSplittedLength = partSplitted.length

      if (partSplittedLength < decimalsNumber) {

        partSplitted += '0'.repeat(decimalsNumber - partSplittedLength)
        newValue = partValue + '.' + partSplitted
        
      } else {

        newValue = strValue
        
      }

    } else {

      newValue = strValue
      
    }
    
  } else {

    if (decimalsNumber) {
      
      newValue = splitted[0] + '.' + '0'.repeat(decimalsNumber)
      
    } else {
      
      newValue = splitted[0]
      
    }

    

      
  }

  return newValue
  
}


function slipFloor(num, step){
  
  let f = Math.floor(num)
  
  if (num-f < step) {
    return f
  }
  
  return f + step
  
}

function slipCeil(num, step){
  
  let f = Math.ceil(num)
  
  if (f-num < step) {
    return f
  }
  
  return f - step
  
}


function roundStep(value, step, kind='round') {
  
  step || (step = 1.0);
  var inv = 1.0 / step;

  let result

  if (kind == 'round') {
    result = Math.round(value * inv) / inv
  } else if (kind == 'floor') {
    result = slipFloor(value * inv, step) / inv
  } else if (kind == 'ceil') {
    result = slipCeil(value * inv, step) / inv
  }
  
    return result

}


function objectDropColumns(arrayOfObjects, columnsToStay) {

  let data = copyObject(arrayOfObjects)
  
  return data.map(obj => columnsToStay.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {}))
  
}


function isString(value) {
  return (typeof value === 'string')
}


function isNULL(value, includeStringNULL=true) {
  
  let result

  if (includeStringNULL) {
    result = ((value == null) | (value == 'null'))
  } else {
    result = (value == null)
  }

  return Boolean(result)
  
}


function notNULL(value, includeStringNULL=true) {
  
  let result

  if (includeStringNULL) {
    result = ((value == null) | (value == 'null'))
  } else {
    result = (value == null)
  }

  return Boolean(!result)
  
}


function checkNaN(value, replaceValue='-') {
  return (isNaN(value)) ? replaceValue : value  
}


function checkIfArray(array) {
  return Array.isArray(array)
}


function countDecimals(value) {

    if (Math.floor(value) === value) return 0

    let str = value.toString()
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0
    }
    return str.split("-")[1] || 0

}


function roundToEven(value) {
  return 2 * Math.round(value/2)
}

function roundToOdd(value) {
  return 2 * Math.floor(value/2) + 1
}


function toFixedWithoutZeroes(value, scale) {

  let newValue

  if (isNaN(value)) {

    newValue = NaN
    
  } else {

    newValue = value.toFixed(scale)
    
    let newValueSplitted = String(newValue).split('.')
    let decimals = newValueSplitted[1]
    let marker = 1
  
    for (let i = 0; i < decimals.length; i++) {
      if (decimals[i] != 0) {
        marker = 0
      }
    }
  
    if (marker == 1) {
      newValue = newValueSplitted[0]
    }
    
  }

  return newValue
  
}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function hexToHsb(hex) {
  
  // 1. Hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // 2. RGB to HSB
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h, s, v = max; // In HSB, Value (Brightness) is the same as max RGB component

  if (delta === 0) {
    h = 0; // Achromatic
  } else if (max === r) {
    h = ((g - b) / delta) % 6;
  } else if (max === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) {
    h += 360;
  }

  s = max === 0 ? 0 : delta / max;
  s = Math.round(s * 100);
  v = Math.round(v * 100);

  // return { h: h, s: s, b: v }; // HSB typically uses 'b' for brightness
  return [h, s, v]
  
}


function hsbToHex(h, s, b) {
  
  // Step 1: Convert HSB to RGB
  s /= 100;
  b /= 100;

  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));

  const r = Math.round(255 * f(5));
  const g = Math.round(255 * f(3));
  const b_rgb = Math.round(255 * f(1));

  // Step 2: Convert RGB to Hex
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b_rgb)}`;
  
}


function saturateColor(colorHEX, scale) {

  let color_saturated

  if (colorHEX) {

    let color = hexToRgb(colorHEX);
    let gray = color.r * 0.3086 + color.g * 0.6094 + color.b * 0.0820;

    color.r = Math.round(color.r * scale + gray * (1 - scale));
    color.g = Math.round(color.g * scale + gray * (1 - scale));
    color.b = Math.round(color.b * scale + gray * (1 - scale));

    color_saturated = rgbToHex(color.r, color.g, color.b);
    
  } else {
    
    color_saturated = colorHEX
    
  }
    
  return color_saturated
  
}


function paleColor(colorHEX, scale) {

  return saturateColor(alphaColor(colorHEX, scale), scale)
  
}


// function saturateColor(colorHEX, scale) {

//   let HSB = hexToHsb(colorHEX)
//   return hsbToHex(HSB[0], HSB[1]*scale, HSB[2])

// }


function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}


function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}


function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}


function rgbStringToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex;
}


function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


// function alphaColor(color, opacity) {

//   let hex = color.slice(1)

//   var r = "0x" + hex[0] + hex[1];
//   var g = "0x" + hex[2] + hex[3];
//   var b = "0x" + hex[4] + hex[5];
  
//   r = Math.ceil(256 * (1-opacity) + (r * opacity));
//   g = Math.ceil(256 * (1-opacity) + (g * opacity));
//   b = Math.ceil(256 * (1-opacity) + (b * opacity));
  
//   r = r <= 255 ? r : 255;
//   g = g <= 255 ? g : 255;
//   b = b <= 255 ? b : 255;

//   return [r, g, b].reduce( (acc, color) => acc + color.toString(16).padStart(2, "0"), "#")
  
// }


function alphaColor(color, opacity, background='#FFFFFF') {

  // color, background are HEX

  let hex = color.slice(1)
  let back = background.slice(1)

  let colorComponenetR = '0x' + hex[0] + hex[1]
  let backComponenetR = '0x' + back[0] + back[1]

  let colorComponenetG = '0x' + hex[2] + hex[3]
  let backComponenetG = '0x' + back[2] + back[3]

  let colorComponenetB = '0x' + hex[4] + hex[5]
  let backComponenetB = '0x' + back[4] + back[5]


  let r = Math.floor(colorComponenetR * opacity + backComponenetR * (1 - opacity))
  let g = Math.floor(colorComponenetG * opacity + backComponenetG * (1 - opacity))
  let b = Math.floor(colorComponenetB * opacity + backComponenetB * (1 - opacity))

  r = r <= 255 ? r : 255;
  g = g <= 255 ? g : 255;
  b = b <= 255 ? b : 255;

  let result = [r, g, b].reduce( (acc, color) => acc + color.toString(16).padStart(2, "0"), "#")

  return result
  
}


function shadeColor(color, shade) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (1 + shade));
    G = parseInt(G * (1 + shade));
    B = parseInt(B * (1 + shade));

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}


const decodeHtmlCharCodes = str => 
  str.replace(/(&#(\d+);)/g, (match, capture, charCode) => 
    String.fromCharCode(charCode));

function pad_with_zeroes(number, length) {

    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;

}

function clearContent(element) {
  if (element) {
    element.innerHTML = ''
  }
}


function clearElement(element, sizes=false) {
  
  if (element) {
    
    element.innerHTML = ''
    
    if (sizes) {
      if (sizes == 'style') {
        element.style.width = 0
        element.style.height = 0
      } else if (sizes == 'attribute') {
        element.setAttribute('width', 0)
        element.setAttribute('height', 0)
      } else {
        element.style.width = 0
        element.style.height = 0
        element.setAttribute('width', 0)
        element.setAttribute('height', 0)
      }

    }
    
  }
  
}


function invisibleElement(element) {
  element.classList.add('invisible')
}


function visibleElement(element) {
  element.classList.remove('invisible')
}


function isEmpty(array) {

  let result

  if (Array.isArray(array)) {
    result = (array.length === 0)
  } else if (typeof array === 'object') {
    result = (Object.keys(array).length === 0)
  }

  return result
  
}


function notEmpty(array) {
  
  let result

  if (Array.isArray(array)) {
    result = (array.length > 0)
  } else if (typeof array === 'object') {
    result = (Object.keys(array).length > 0)
  }

  return result
  
}


function isEven(n) {
   return n % 2 == 0;
}

function isInteger(n) {
  return Number.isInteger(n)
}

function convertRemToPixels(rem, toRound=null) {

  let value = rem * parseFloat(getComputedStyle(document.documentElement).fontSize)

  if (toRound) {
    value = round(value, toRound)
  } 
    return value
}


function remToPix(rem, toRound=null) {

  let value = rem * parseFloat(getComputedStyle(document.documentElement).fontSize)

  if (toRound) {
    value = round(value, toRound)
  } 
    return value
}

function convertPixelsToRem(px) {    
    return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function getStandardDeviation(array) {

  if (array.length < 2) {
    return undefined;
  }
  
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (n - 1),
  )

}


function arrayReplace(array, stringToReplace, stringReplacement) {
  array_ = structuredClone(array.map(x => x.replace(stringToReplace, stringReplacement)))
  return array_
}


function arrayRemoveElements(array, element, copy=true) {
  if (copy) {
    return copyObject(array).filter(item => item !== element)
  } else {
    return array.filter(item => item !== element)
  }
}

function arraySliceByTwoElements(array, firstElement, secondElement) {

  let marker = 0
  let newArray = []

  array.forEach((element, i) => {

    if (element == firstElement) {
      marker = 1
    }

    if (marker == 1) {
      newArray.push(element)
    }

    if (element == secondElement) {
      marker = 0
    }
    
  })

  return newArray
  
}


function logit(value) {
  return console.log(value)
}

function elementNotDisabled(element) {
  return !element.className.includes('disabled')
}


function getElement(ID) {
  return document.getElementById(ID)
}

function getElementByAttribute(attribute, value, nodeID=null) {

  let node
  let element
    
  if (nodeID) { node = getElement(nodeID) }
  else { node = document }

  element = node.querySelectorAll(`[${attribute}="${value}"]`)[0]

  return element

}


function getElementTextByID(elementID) {
  return getElement(elementID).textContent
}

function getElementsListByAttribute(attribute, value, node=null) {

  let result

  if (node) {
    result = node.querySelectorAll("[" + attribute + "=" + CSS.escape(value) + "]")
  } else {
    result = document.querySelectorAll("[" + attribute + "=" + CSS.escape(value) + "]")
  }

  result = Array.from(result)

  return result
  
}


function getElementsListByClass(className, node=null) {

  let result

  if (node) {
    result = node.getElementsByClassName(className)
  } else {
    result = document.getElementsByClassName(className)
  }

  result = Array.from(result)

  return result
  
}


function setText(elementID, text, arrayOfHTMLS=false) {

  element = getElement(elementID)
  
  element.textContent = text

  // add HTML if necessary
  if (arrayOfHTMLS) {
    arrayOfHTMLS.forEach((html, i) => {
      element.innerHTML += html
    })
  }
}


function setStyle(elementID, attribute, value) {
  getElement(elementID).style[attribute] = value
}


function setAttribute_(elementID, attributeName, attributeValue) {

  let element = getElement(elementID)

  element.setAttribute(attributeName, attributeValue)
  
}


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getAttribute_(elementID, attributeName) {

  return getElement(elementID).getAttribute(attributeName)
  
}


function attribute_(attributeName, element) {
  return element.attributes[attributeName].value
}


// // attribute of element
// Object.defineProperties(Object.prototype, {
//     attribute: {
//         value: function(value) { return this.getAttribute(value) }
//     }
// })


function appendChild_(elementID, child) {
  getElement(elementID).appendChild(child)
}


function firstElement(array) {
  return array[0]
}


function lastElement(array, copy=false) {

  if (copy) {
    return copyObject(array.slice(-1)[0])
  } else {
    return array.slice(-1)[0]
  }

}

function getText(elementID) {
  return getElement(elementID).textContent
}


function getLocation() {
  return location.hash.slice(1).toLowerCase() || '/'
}


function addAnimation(elementID, kind='opacity', scale='075') {

  if (kind == 'opacity') {
    if (Array.isArray(elementID)) {
    elementID.forEach((v, i) => {
      getElement(v).classList.add('animation-opacity-' + `${scale}`)
    })
    } else {
      getElement(elementID).classList.add('animation-opacity-' + `${scale}`)  
    }
  }
}


function isAnimated(elementID, kind='opacity') {
  if (kind == 'opacity') {
    return getElement(elementID).className.includes('animation-opacity-' + `${scale}`)
  }
}


function clearAnimation(elementID, kind='opacity') {
  
  if (kind == 'opacity') {
    // getElement(elementID).classList.remove('animation-opacity')
    getElement(elementID).className.replace(/\banimation-opacity.+?/g, '')
  }
  
}


function scrollToPosition(scrollPosition) {

  document.body.style.overflow = 'hidden'
  window.scrollTo(0, scrollPosition)
  document.body.style.overflow = ''
  
}


function getScrollPosition() {
  return window.scrollY
}


function notNaN(value) {
  return !isNaN(value)
}


function dropNaNs(array) {
  let result = copyObject(array)
  return result.filter(o => !isNaN(o))
}

function arrayDropUndefined(array) {

  let data = copyObject(array)

  data = data.filter(function( element ) {
     return element !== undefined;
  });

  return data
  
}

function NaNs(o) {
  return notNaN(o)
}


function dropDuplicates(array) {

  array_ = structuredClone(array)
  
  return Array.from(new Set(array_))
  
}

function arrayDropDuplicates(array) {

  array_ = structuredClone(array)
  
  return Array.from(new Set(array_))
  
}


function dropDuplicatesArrayOfObject(array, property=null) {

  let newArray = structuredClone(array)

  if (property) {
    newArray = newArray.filter((obj1, i, arr) => 
      arr.findIndex(obj2 => (obj2[property] === obj1[property])) === i
    )
  } else {
    newArray = newArray.filter((obj1, i, arr) => 
      arr.findIndex(obj2 => 
        JSON.stringify(obj2) === JSON.stringify(obj1)
      ) === i
    )
  }

  return newArray
  
}


function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function isNumeric(value) {
  // if (typeof value != "string") return false // we only process strings!
  return !isNaN(value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(value)) // ...and ensure strings of whitespace fail
}


function isInfinity(value) {
  return !isFinite(value)
}


function sortValues(data_, column, ascending=false) {

  data = structuredClone(data_)
  
  if ((ascending == true) || (ascending == 'true')) {
    result = data.sort((a, b) => a[column] - b[column])
  }
  else {
    result = data.sort((a, b) => b[column] - a[column])
  }

  return result
  
}


function sortObject(data_, column, ascending=false) {

  data = structuredClone(data_)
  
  if ((ascending == true) || (ascending == 'true')) {
    result = data.sort((a, b) => a[column] - b[column])
  }
  else {
    result = data.sort((a, b) => b[column] - a[column])
  }

  return result
  
}


function sortObjectString(object, column, ascending=true) {

  let obj = copyObject(object)

  function compare( a, b ) {
    
    if ( a[column] < b[column] ){
      // return -1;
      if (ascending) { return -1 }
      else { return 1 }
    }
    
    if ( a[column] > b[column] ){
      // return 1;
      if (ascending) { return 1 }
      else { return -1 }
    }
    
    return 0;
  }
  
  obj.sort(compare)

  return obj

}


function sortObjectByDict(arrayOfObjects, columnsAndascendingDict, copy=true) {

  // columnsAndascendingDict : {columnName: ascending}

  if (copy == true) {

    let result = copyObject(arrayOfObjects)

    for (const [key, value] of Object.entries(columnsAndascendingDict)) {
      result = sortObject(result, key, value)
    }

    return result
    
  } else {

    for (const [key, value] of Object.entries(columnsList)) {
      arrayOfObjects = sortObject(arrayOfObjects, key, value)
    }

    return arrayOfObjects
      
  }

}


function sortObjectStringByDict(arrayOfObjects, columnsAndascendingDict, copy=true) {

  // columnsAndascendingDict : {columnName: ascending}

  if (copy == true) {

    let result = copyObject(arrayOfObjects)

    for (const [key, value] of Object.entries(columnsAndascendingDict)) {
      result = sortObjectString(result, key, value)
    }

    return result
    
  } else {

    for (const [key, value] of Object.entries(columnsList)) {
      arrayOfObjects = sortObjectString(arrayOfObjects, key, value)
    }

    return arrayOfObjects
      
  }

}


function objectGetMax(object, column, type='value') {

  let result

  if (type == 'value') {

    result = object.reduce((max, current) => {
      return (current[column] > max) ? current[column] : max;
    }, -Infinity)
    
  } else if (type == 'object') {

    result = object.reduce((maxObject, currentObject) => {
      return (maxObject[column] > currentObject[column]) ? maxObject : currentObject;
    });
    
  }

  return result
  
}


function objectGetMin(object, column, type='value') {

  let result

  if (type == 'value') {

    result = object.reduce((max, current) => {
      return (current[column] < max) ? current[column] : max;
    }, -Infinity)
    
  } else if (type == 'object') {

    result = object.reduce((maxObject, currentObject) => {
      return (maxObject[column] < currentObject[column]) ? maxObject : currentObject;
    });
    
  }

  return result
  
}


function sortValuesyByTwo(data_, columnsArray, ascending=false) {

  data = structuredClone(data_)
  col1 = columnsArray[0]
  col2 = columnsArray[1]

  if (ascending == true) {
    data.sort(function (a, b) {
      return a[col1] - b[col1] || a[col2] - b[col2]
    })
  } else {
     data.sort(function (a, b) {
      return b[col1] - a[col1] || b[col2] - a[col2]
    })
  }

  return data
  
}


function sortValuesString(array, column, ascending=false) {

  let newArray = copyObject(array)

  if (ascending) {
    newArray.sort((a, b) => (a[column] > b[column]) - (a[column] < b[column]))
  } else {
    newArray.sort((b, a) => (a[column] > b[column]) - (a[column] < b[column]))
  }

  return newArray
  
}


function sortValuesStringNumbers(array, column, ascending=false, lettersTop=false) {

  let asc
  let top

  let newArray = copyObject(array)

  newArray = newArray.sort(function(a, b) {

    // if (ascending) {
    //   asc = a[column].charCodeAt(0) - b[column].charCodeAt(0)
    // } else {
    //   asc = b[column].charCodeAt(0) - a[column].charCodeAt(0)
    // }

    if (ascending) {
      asc = Number(a[column]) - Number(b[column])
    } else {
      asc = Number(b[column]) - Number(a[column])
    }

    if (lettersTop) {
      top = /[A-Za-z]/.test(b[column]) - /[A-Za-z]/.test(a[column])
    } else {
      top = /[A-Za-z]/.test(a[column]) - /[A-Za-z]/.test(b[column])
    }

    return top || asc
    
  })

  return newArray

}


function sortArrayString(array, ascending=false) {

  let newArray = copyObject(array)

  if (ascending) {
    newArray = newArray.sort((b,a)=>a[0].localeCompare(b[0]))
  } else {
    newArray = newArray.sort((a, b)=>a[0].localeCompare(b[0]))
  }

  return newArray
  
}


function arrayIQR(someArray, scale=1.5) {

  // Copy the values, rather than operating on references to existing values
  // var values = someArray.concat();
  let values = copyObject(someArray)

  // Then sort
  values.sort( function(a, b) {
    return a - b;
  });

  /* Then find a generous IQR. This is generous because if (values.length / 4) 
   * is not an int, then really you should average the two elements on either 
   * side to find q1.
   */     
  var q1 = values[Math.floor((values.length / 4))];
  // Likewise for q3. 
  var q3 = values[Math.ceil((values.length * (3 / 4)))];
  var iqr = q3 - q1;

  // Then find min and max values
  var maxValue = q3 + iqr*scale;
  var minValue = q1 - iqr*scale;

  return {Q1: q1, Q3: q3, IQR: iqr, Min: minValue, Max: maxValue}
  
}


function arrayDropOutliers(someArray, scale=1.5) {

  // Copy the values, rather than operating on references to existing values
  // var values = someArray.concat();
  let values = copyObject(someArray)

  // Then sort
  values.sort( function(a, b) {
          return a - b;
       });

  /* Then find a generous IQR. This is generous because if (values.length / 4) 
   * is not an int, then really you should average the two elements on either 
   * side to find q1.
   */     
  var q1 = values[Math.floor((values.length / 4))];
  // Likewise for q3. 
  var q3 = values[Math.ceil((values.length * (3 / 4)))];
  var iqr = q3 - q1;

  // Then find min and max values
  var maxValue = q3 + iqr*scale;
  var minValue = q1 - iqr*scale;

  // Then filter anything beyond or beneath these values.
  var filteredValues = values.filter(function(x) {
      return (x <= maxValue) && (x >= minValue);
  });

  // Then return
  return filteredValues;
  
}


function clearElementText(elementID) {
  setText(elementID, '')
}


function toActive(currentElementID, buttonsConditionKey, activeClassName) {
  
  getElement(buttonsCondition[buttonsConditionKey]).classList.remove(activeClassName)
  getElement(currentElementID).classList.add(activeClassName)

  buttonsCondition[buttonsConditionKey] = currentElementID
  
}

function isActive(elementID) {
  return getElement(elementID).class.includes('active')
}


function isHidden(elementID) {
  return !getElement(elementID).checkVisibility({visibilityProperty: true})
}


function hideElement(elementID) {
  // getElement(elementID).style.visibility = 'hidden'
  getElement(elementID).classList.add('hidden')
}

function showElement(elementID) {
  // getElement(elementID).style.visibility = 'visible'
  getElement(elementID).classList.remove('hidden')
}


function disappearElement(elementID) {
  getElement(elementID).style.opacity = 0
}


function appearElement(elementID, timeout=100) {

  window.setTimeout(function() {
    let element = getElement(elementID)
    if (element) {
      element.style.opacity = 1
    }
  }, timeout)
  
}


function removeSmoothAppear(elementID) {
  getElement(elementID).classList.remove('smooth-appear')
}


function addSmoothAppear(elementID) {
  getElement(elementID).classList.add('smooth-appear')
}


function appearLoader(loaderID) {
  loader.classList.add('active')
}


function disappearLoader(loaderID, timeout=100) {

  window.setTimeout(function() {
    let loader = getElement(loaderID)
    if (loader) {
      loader.classList.remove('active')
    }
  }, timeout)
  
}


function hideElementToggle(elementID) {
  getElement(elementID).classList.toggle('hidden')
}


function getSizes(element) {
  return element.getBoundingClientRect()
}


function sortArray(array, ascending=false, outputFormat='Number') {

  if (ascending) {
    function compareNumbers(a, b) {
      return a - b;
    }
  } else {
    function compareNumbers(a, b) {
      return b - a;
    }
  }
 
  array_ = structuredClone(array.map(Number))
  array_ = array_.sort(compareNumbers)

  if (outputFormat == 'String') {
    array_ = array_.map(String)
  }
    
  return array_
  
}


function arraySort(array, ascending=false, outputFormat='Number') {

  if (ascending) {
    function compareNumbers(a, b) {
      return a - b;
    }
  } else {
    function compareNumbers(a, b) {
      return b - a;
    }
  }
 
  array_ = structuredClone(array.map(Number))
  array_ = array_.sort(compareNumbers)

  if (outputFormat == 'String') {
    array_ = array_.map(String)
  }
    
  return array_
  
}


function arraySortString(array) {
  array.sort()
  return array
}


function arrayDropNaNs(array) {
  let newArray = copyObject(array)
  newArray = newArray.filter(x => !Number.isNaN(x))
  return newArray
}


function elementClickToggle(element) {

  if (element.classList.contains('clicked')) {
    element.classList.remove('clicked')
  } else {
    element.classList.add('clicked')
  }
}


function dropElementArray(array_, element) {

  let array = structuredClone(array_)
  const index = array.indexOf(element)
  
  if (index > -1) { // only splice array when item is found
    array.splice(index, 1); // 2nd parameter means remove one item only
  }

  return array
  
}


function arrayDropElement(array_, element) {

  let array = structuredClone(array_)
  const index = array.indexOf(element)
  
  if (index > -1) { // only splice array when item is found
    array.splice(index, 1); // 2nd parameter means remove one item only
  }

  return array
  
}


function addSVG(element, src, classList) {

  let svg = document.createElement('img')
  
  Object.assign(
    target=svg,
    source={
      className: classList,
      'src': src
    })

  element.appendChild(svg)
      
}


function getLastIndex(array) {
  return array.length - 1
}


function iconBackwardNextIndexDetect(valuesList, currentValue) {

  let currentIndex = valuesList.indexOf(currentValue)
  let lastIndex = valuesList.indexOf(lastElement(valuesList))

  let previousIndex = currentIndex - 1

  let previousIndexReal

  if (currentIndex == 0) { previousIndexReal = lastIndex }
  else { previousIndexReal = previousIndex }

  return previousIndexReal
  
}


function arrayFromElementChildren(element) {
  return Array.from(element.children)
}


function arrayFromChildren(element) {
  return Array.from(element.children)
}


function childrenToArray(element) {
  return Array.from(element.children)
}


function arrayFrom(element) {
  return Array.from(element.children)
}


function arrayGetMiddleElement(arr) {
  const length = arr.length;
  if (length === 0) {
    return undefined; // Or handle as needed for empty arrays
  } else if (length % 2 === 1) {
    // Odd length
    return arr[Math.floor(length / 2)];
  } else {
    // Even length
    return [arr[length / 2 - 1], arr[length / 2]];
  }
}



function arrayGetDuplicates(array, copy=true) {
  if (copy) {
    return copyObject(array.filter((item, index) => array.indexOf(item) !== index))
  } else {
    return array.filter((item, index) => array.indexOf(item) !== index)
  }
}

function arrayDuplicatesPresent(array) {
  let duplicates = array.filter((item, index) => array.indexOf(item) !== index)
  return (duplicates.length > 0) ? true : false
}


// count certain elements in array: array.count(element)
Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
})


function modColor(color) {

  let newColor = copyObject(color)
  
  newColor = shadeColor(newColor, -0.5)
  newColor = alphaColor(newColor, 0.65)

  if (color == '#505050') {
    // newColor = alphaColor(newColor, 0.65)
    newColor = '#ACACAC'
  }
  
  return newColor
  
}

function modColor2(color) {

  let newColor = copyObject(color)
  
  newColor = shadeColor(newColor, -0.5)
  newColor = alphaColor(newColor, 0.5)

  if (color == '#505050') {
    // newColor = '#CDCDCD'
    newColor = '#ACACAC'
  }
  
  return newColor
  
}


function elementRemoveEventListeners(elementID) {

  let element = getElement(elementID)
  let elementCleared = element.cloneNode(true)
  
  element.parentNode.replaceChild(elementCleared, element)
  
}


function objectGetUniqueColumnsPairs(object, column1, column2) {

  let uniqueObject = []

  object.forEach((obj, i) => {

    if (uniqueObject.some(obj1 => (obj1[column1] == obj[column1]) & (obj1[column2] == obj[column2]))) {
      
    } else {
      uniqueObject.push({[column1]: obj[column1], [column2]: obj[column2]})
    }

  })

  return uniqueObject
  
}


function arrayAddIndex(array, value=null) {

  let arrayWithIndexes = []

  if (value) {

    array.forEach((e, i) => {
      arrayWithIndexes.push({'Index': i, [value]: e})
    })
    
  } else {

    array.forEach((e, i) => {
      arrayWithIndexes.push({'Index': i, 'Value': e})
    })
      
  }

  return arrayWithIndexes
  
}


function arrayAverage(array, ignoreNaNs=true) {

  let arr = copyObject(array)

  let result

  if (ignoreNaNs) {
    arr = copyObject(array).filter(notNaN)
  }

  if (arr.length == 0) {
    result = NaN
  } else {
    result = arr.reduce((acc,v,i,a) => (acc + v/a.length), 0)
  } 

  return result
  
}


function arraysDifference(array1, array2) {
  array = array1.map(function(item, index) {
    // In this case item correspond to currentValue of array a, 
    // using index to get value from array b
    return item - array2[index];
  })
  return array
}


function arraySum(array, copy=false) {
  
  if (copy) {
    return copyObject(array.reduce((a, b) => a + b, 0))
  } else {
    return array.reduce((a, b) => a + b, 0)
  }
  
}


function arrayMedian(values) {

  if (values.length === 0) {
    throw new Error('Input array is empty');
  }

  // Sorting values, preventing original array
  // from being mutated.
  values = [...values].sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  return (values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2
  );

}


function arrayMin(array) {
  return Math.min(...array)
}


function arrayMax(array) {
  return Math.max(...array)
}


function arrayStd(array) {

  let arr = copyObject(array)

  // Creating the mean with Array.reduce
  let mean = arr.reduce((acc, curr) => {
      return acc + curr
  }, 0) / arr.length;

  // Assigning (value - mean) ^ 2 to
  // every array item
  arr = arr.map((k) => {
      return (k - mean) ** 2
  });

  // Calculating the sum of updated array 
  let sum = arr.reduce((acc, curr) => acc + curr, 0);

  // Calculating the variance
  let variance = sum / arr.length

  // Returning the standard deviation
  return Math.sqrt(sum / arr.length)
  
}


function arrayExchangeIndexes(array, firstIndex, secondIndex) {

  let result

  if ((firstIndex > array.length - 1) || (secondIndex > array.length - 1)) {
    
    result = null
    
  } else {

    let arr = copyObject(array)

    let firstValue = array[firstIndex]
  
    arr[firstIndex] = arr[secondIndex]
    arr[secondIndex] = firstValue
  
    result = arr
    
  }

  return result

}


function arrayGetRandom(array, exceptionsList=[]) {

  if (array.length <= exceptionsList.length) {
    
    logit('exceptionsList must be less length than Array itself')
    return null
    
  } else {

    let randomElement = array[Math.floor(Math.random() * array.length)]

    if (exceptionsList.length > 0) {
  
      if (exceptionsList.includes(randomElement)) {
        return arrayGetRandom(array, exceptionsList)
      } else {
        return randomElement;
      }
        
    } else {
      return randomElement
    }
    
  }

}


function objectSelectColumns(object, columnsList) {

  // CAREFUL WITH BIG DATASETS !!!!

  let filteredObj = []

  object.forEach((obj, k) => { filteredObj.push({}) })

  columnsList.forEach((column, i) => {
    let values = object.map(d => d[column])
    values.forEach((value, j) => { filteredObj[j][column] = value })
  })

  return filteredObj
  
}


function radiotGetButtonCondition(currentButton) {
  return currentButton.attributes['condition'].value
}

function radiotSetButtonCondition(currentButton, condition) {
  return currentButton.setAttribute('condition', condition)
}


function radioActivateByCondition(radioID, buttonConditionValue) {

  let radioButtonsCollection = getElement(radioID).children

  for (radioButton of radioButtonsCollection) {
    
    if (radioButton.classList.contains('radio-button-checked')) {
      radioButton.classList.remove('radio-button-checked')
    }

    let currentButtonCondition = radiotGetButtonCondition(radioButton)
    
    if (currentButtonCondition == buttonConditionValue) {
      radioButton.classList.add('radio-button-checked')
    }
    
  }

}


function radioActivateByClick(currentButton) {

  let clickedConditionValue = currentButton.attributes['condition'].value
  let radioButtonsCollection = currentButton.parentElement.children

  for (radioButton of radioButtonsCollection) {

    if (radioButton.classList.contains('radio-button-checked')) {
      radioButton.classList.remove('radio-button-checked')
    }

    let currentButtonCondition = radiotGetButtonCondition(radioButton)
    
    if (currentButtonCondition == clickedConditionValue) {
      radioButton.classList.add('radio-button-checked')
    }
    
  }
  
}


function objectRemoveColumn(object, column) {
    return object.map(({ column, ...item }) => item)
  }


function copyObject(object) {
  return structuredClone(object)
}


function complimentaryColors(color1, color2, complimentaryColorsList) {
  

  let result = false

  complimentaryColorsList.forEach((colorList, i) => {
    
    let indexColor1 = colorList.indexOf(color1)
    let indexColor2 = colorList.indexOf(color2)

    let condition = ((color1 == color2) || ((indexColor1 >= 0)
                                            & (indexColor2 >= 0)
                                            & (indexColor1 != indexColor2)))

    // if both colors in one list
    if (condition) { result = true }
    
  })

  return result
  
}


function elementExist(elementID) {
  return !!getElement(elementID)
}


// function formatComplimentaryColor(color) {

//   let formattedColor = copyObject(color)

//   formattedColor = shadeColor(formattedColor, -0.5)
//   formattedColor = alphaColor(formattedColor, 0.5)

//   return formattedColor
  
// }


function arrayAddElementFirst(array, element) {
  
  let newArray = copyObject(array)
  newArray.unshift(element)
  
  return newArray
}


function arrayFromElements(elements) {
  return Array.from(elements)
}


function updateImage(container, path) {

  let img = container.children[0]
  img.src = path

  imageNotFound(img)
  
}


function arrayOfObjectsFilterSeveralColumns(array, columnsList) {

  let result = copyObject(array)

  let columns = Object.keys(result[0])

  let deleteColumns = []

  columns.forEach((col, i) => {
    if (!columnsList.includes(col)) { deleteColumns.push(col) }
  })

  if (deleteColumns.length > 0) {

    result.forEach((object, i) => {
      deleteColumns.forEach((col, i) => {
        delete object[col] 
      })
    })
    
  }

  return result
  
}


function getLessThanFiveGPLabel() {

  let border = document.createElement('div')

  border.textContent = 'МЕНЕЕ 5 ГРАН-ПРИ'
  border.classList.add('less-than-five-gp-text')
  
  // Object.assign(border.style, {
  //   letterSpacing: '0.05rem',
  //   color: '#7D8287',
  //   fontWeight: '600',
  //   fontSize: '0.6rem',
  //   whiteSpace: 'nowrap',
  //   textAlign: 'left',
  //   height: '1rem',
  //   marginTop: '0.5rem',
  //   marginBottom: '0.5rem',
  //   // marginLeft: '-1.2rem',
  //   width: 'max-content',
  //   shapeRendering: 'crispEdges',
  //   // borderBottom: '1px dashed #D2D7DC'
  // })
  
  let border2 = document.createElement('div')
  
  border2.classList.add('less-than-five-gp-space')
    
  // Object.assign(border2.style, {
  //   marginRight: 'auto',
  //   height: '1rem',
  //   margin: '0.5rem 0',
  //   width: '100%',
  // })

  return [border, border2]
  
}


function tableAddRow(tableID, values, addBorder=false, addIndex=true, attributes={}, rowAttributes={}) {

  let index = attributes['index']

  let cellClassList = attributes['cellClassList']
  let cellWidths = attributes['cellWidths'] || []
  let fontClassList = attributes['fontClassList']
  let nameCellClassList = attributes['nameCellClassList']
  let indexClassList = attributes['indexClassList'] || cellClassList
  let hoverClass = attributes['hoverClass'] || 'tables-row-hover'
  let additionalCellClasses = attributes['additionalCellClasses'] || ''
  

  // additionalCellClasses -> [{cellIndex: 1, cellClass: }]

  if (attributes['hoverClass'] == '') { hoverClass = '' }

  // let rowBackground = attributes['rowBackground'] || '#FFFFFF'

  let row = document.createElement('div')

  let rowClassList = (attributes.hasOwnProperty('rowClassList')) ? attributes['rowClassList'] : 'tables-row'
  let rowID = (attributes.hasOwnProperty('rowID')) ? attributes['rowID'] : null

  let tableElement = getElement(tableID)

  rowClassList = rowClassList + ' ' + hoverClass

  Object.assign(
    target=row,
    source={
      className: rowClassList
    })

  if (rowID) {
    Object.assign(
      target=row,
      source={
        id: rowID
      })
    }

  // row.style.background = rowBackground

  if (addIndex) {
    values = [index].concat(values)
  }

  values.forEach((value, i) => {

    let cell = document.createElement('div')
    let currentCellClassList = cellClassList

    // additional class for name column (mostly to make it wider)
    if (nameCellClassList) {

      if (addIndex) {
        if (i == 1) {
          currentCellClassList = currentCellClassList + ' ' + nameCellClassList
        }
      } else {
        if (i == 0) {
          currentCellClassList = currentCellClassList + ' ' + nameCellClassList
        }
      }
      
    }

    // if table with index - additional class for index
    if ((i == 0) && (addIndex)) {
      currentCellClassList = currentCellClassList + ' ' + indexClassList
    }

    if (additionalCellClasses.length > 0) {

      let indexesAdditonal = additionalCellClasses.map(d => d['cellIndex'])

      if (indexesAdditonal.includes(i)) {

        let class_ = additionalCellClasses.filter(d => d['cellIndex'] == i)[0]['cellClass']

        currentCellClassList = currentCellClassList + ' ' + class_

      }
      
    }

    Object.assign(
      target=cell,
      source={
        className: currentCellClassList,
        // id: tableID + '-col-' + i + '-row-' + index,
      })

    cell.style.width = cellWidths[i]

    cell.setAttribute('column', i)
    cell.setAttribute('index', index)

    // cell attributes if necessary
    if (cellAttributes) {

      let attributesKeys = Object.keys(cellAttributes)

      attributesKeys.forEach((attr, j) => {

        let attributeValuesList = cellAttributes[attr]

        // index attribute empty ''
        if (addIndex) {
          attributeValuesList = arrayAddElementFirst(attributeValuesList, '')
        }
        
        cell.setAttribute(attr, attributeValuesList[i])
        
      })
    }

    let containerOftext = document.createElement('div')
    let listOfTextContainerClasses = 'tables-text-container'
    
    Object.assign(
      target=containerOftext,
      source={
        className: listOfTextContainerClasses,
      })

    let text = document.createElement('div')

    Object.assign(
      target=text,
      source={
        className: fontClassList,
      })

    let letters = document.createTextNode(value)

    text.appendChild(letters)
    containerOftext.appendChild(text)
    cell.appendChild(containerOftext)

    // borders (mostly for captions)
    if (addBorder) {
      if ((cell.textContent != '') & (i < values.length-1)) {

        let border = document.createElement('div')
    
        Object.assign(
          target=border,
          source={
            className: 'tables-caption-border-line',
          })

        border.setAttribute('table-border-line', true)
        cell.appendChild(border)
        
      }
    }
    
    row.appendChild(cell)

  })

  tableElement.appendChild(row)
  
}


function isHoverable() {

  let result

  if (window.matchMedia( "(hover: none)" ).matches) {
    result = false
    } else {
      result = true
    }

  return result

}


function d3legend(
    MainNodeID, legendName, legendID, 
    markersList, labelsList, colorsList, 
    attributesDict = {},
    markerLabels = null) {

  // markerLabels: list of marker values if markertype == 'label' (word or abbreviation, not geometric figure)

  // attributesDict: 
    // x, y, legendOffsetX, legendOffsetY,
    // intervalInner, interval, labelSize, labelWeight, labelColor,
    // markerLineLength, markerLineWidth, markerLineMarginBottom,
    // markerCircleRadius, markerCircleMarginBottom,
    // markerCircleNoFillRadius, markerCircleNoFillMarginBottom, markerCircleNoFillStrokeWidth,
    // markerCirclePointRadius, markerCirclePointMarginBottom, 
    // markerRectWidth, markerRectHeight, markerRectMarginBottom, markerRectBorderRadius,
    // markerSquareWidth, markerSquareBorderRadius,
    // markerLabelSize, markerLabelWeight, markerLabelIntervalInner, markerLabelMarginBottom

  // let px1 = convertRemToPixels(0.0625)
  // let px2 = convertRemToPixels(0.125)
  // let px3 = convertRemToPixels(0.1875)
  // let px4 = convertRemToPixels(0.25)
  // let px5 = convertRemToPixels(0.3125)
  // let px8 = convertRemToPixels(0.5)
  // let px10 = convertRemToPixels(0.625)
  // let px15 = convertRemToPixels(0.9375)
  // let px20 = convertRemToPixels(1.25)

  const addSeparator = (node, sepCoordX, sepCoordY, labelSize) => {

    let labelSizePx = remToPix(labelSize)

    node
      .append('line')
      .attr('x1', sepCoordX)
      .attr('y1', sepCoordY - 0.5 * labelSizePx)
      .attr('x2', sepCoordX)
      .attr('y2', sepCoordY + 0.5 * labelSizePx)
      .style('stroke', '#CDD2D7')
      .style('stroke-width', px1)
      .style('fill', 'none')
      .style('shape-rendering', 'crispEdges')

  }

  function d3legendGetPreviousNodeCoordinates(i) {

    let previousNode = getElement(`${legendID}` + '-' + 'node-' + `${i - 1}`)
    let previousMarker = markersList[i-1]
  
    let previousNodeXCoord
    let previousNodeLength

    if (previousMarker == 'line' || previousMarker == 'line-dash') {
      
      previousNodeXCoord = Number(previousNode.firstChild.attributes['x1'].value)
      previousNodeLength = previousNode.getBoundingClientRect().width 
      
    } else if (previousMarker == 'circle' || previousMarker == 'circle no fill' || previousMarker == 'circle w point') {

      previousNodeXCoord = Number(previousNode.firstChild.attributes['cx'].value) - Number(previousNode.firstChild.attributes['r'].value)
      previousNodeLength = previousNode.getBoundingClientRect().width
    
    } else if (previousMarker == 'rect' || previousMarker == 'square') {
  
      previousNodeXCoord = Number(previousNode.firstChild.attributes['x'].value)
      previousNodeLength = previousNode.getBoundingClientRect().width
      
    } else if (previousMarker == 'label') {
  
      previousNodeXCoord = Number(previousNode.firstChild.attributes['x'].value)
      previousNodeLength = previousNode.getBoundingClientRect().width
      
    }
  
    return [previousNodeXCoord, previousNodeLength]
    
  }

  let legendXCoord = (attributesDict.hasOwnProperty('x')) ? attributesDict['x'] : 0
  let legendYCoord = (attributesDict.hasOwnProperty('y')) ? attributesDict['y'] : 0
  
  let intervalInner = (attributesDict.hasOwnProperty('intervalInner')) ? attributesDict['intervalInner'] : px10
  let intervalNodes = (attributesDict.hasOwnProperty('interval')) ? attributesDict['interval'] : px20

  let labelSize = (attributesDict.hasOwnProperty('labelSize')) ? attributesDict['labelSize'] : 0.875
  let labelWeight = (attributesDict.hasOwnProperty('labelWeight')) ? `'wght' ${attributesDict['labelWeight']}` : "'wght' 600"

  let labelColor = (attributesDict.hasOwnProperty('labelColor')) ? attributesDict['labelColor'] : '#555765'

  let letterSpacing = (attributesDict.hasOwnProperty('letterSpacing')) ? attributesDict['letterSpacing'] : 0.015625
  let textRendering = (attributesDict.hasOwnProperty('textRendering')) ? attributesDict['textRendering'] : 'auto'

  let addSeparatorBefore = (attributesDict.hasOwnProperty('addSeparatorBefore')) ? attributesDict['addSeparatorBefore'] : []

  let markerShapeRendering = (attributesDict.hasOwnProperty('markerShapeRendering')) ? attributesDict['markerShapeRendering'] : 'geometricPrecision'
  
  let markerLineLength
  let markerLineWidth
  let markerLineMarginBottom
  let markerLineShapeRendering
  let markerLineStrokeDasharray

  let markerCircleRadius
  let markerCircleMarginBottom

  let markerRectWidth
  let markerRectHeight
  let markerRectMarginBottom

  let markerCircleNoFillRadius
  // let markerCircleNoFillStrokeWidth
  let markerCircleNoFillMarginBottom

  let markerCirclePointRadius
  let markerCirclePointMarginBottom

  let markerSquareWidth

  let markerLabelSize

  let previousNodeXCoord
  let previousNodeLength

  if (markersList.includes('line') || markersList.includes('line-dash')) {
    
    markerLineLength = (attributesDict.hasOwnProperty('markerLineLength')) ?
      attributesDict['markerLineLength'] : px15
    markerLineWidth = (attributesDict.hasOwnProperty('markerLineWidth')) ?
      attributesDict['markerLineWidth'] : px3
    markerLineMarginBottom = (attributesDict.hasOwnProperty('markerLineMarginBottom')) ?
      attributesDict['markerLineMarginBottom'] : 0.06
    markerLineShapeRendering = (attributesDict.hasOwnProperty('markerLineShapeRendering')) ?
      attributesDict['markerLineShapeRendering'] : 'geometricPrecision'
    markerLineStrokeDasharray = (attributesDict.hasOwnProperty('markerLineStrokeDasharray')) ?
      attributesDict['markerLineStrokeDasharray'] : 0
    
  } 
  
  if (markersList.includes('circle') || markersList.includes('circle no fill') || markersList.includes('circle w point')) {

    markerCircleRadius = (attributesDict.hasOwnProperty('markerCircleRadius')) ?
      attributesDict['markerCircleRadius'] : px3
    markerCircleMarginBottom = (attributesDict.hasOwnProperty('markerCircleMarginBottom')) ?
      attributesDict['markerCircleMarginBottom'] : 0.1

    if (markersList.includes('circle no fill') || markersList.includes('circle w point')) {

      markerCircleNoFillRadius = (attributesDict.hasOwnProperty('markerCircleNoFillRadius')) ?
        attributesDict['markerCircleNoFillRadius'] : px5
      markerCircleNoFillMarginBottom = (attributesDict.hasOwnProperty('markerCircleNoFillMarginBottom')) ?
        attributesDict['markerCircleNoFillMarginBottom'] : 0.02
      markerCircleNoFillStrokeWidth = (attributesDict.hasOwnProperty('markerCircleNoFillStrokeWidth')) ?
        attributesDict['markerCircleNoFillStrokeWidth'] : px1

      if (markersList.includes('circle w point')) {

        markerCirclePointRadius = (attributesDict.hasOwnProperty('markerCirclePointRadius')) ?
          attributesDict['markerCirclePointRadius'] : px3
        markerCirclePointMarginBottom = (attributesDict.hasOwnProperty('markerCirclePointMarginBottom')) ?
          attributesDict['markerCirclePointMarginBottom'] : 0.02
        
      }
      
    }

  } 

  if (markersList.includes('rect') || markersList.includes('square')) {

    markerRectWidth = (attributesDict.hasOwnProperty('markerRectWidth')) ? attributesDict['markerRectWidth'] : px15
    markerRectHeight = (attributesDict.hasOwnProperty('markerRectHeight')) ? attributesDict['markerRectHeight'] : px5
    markerRectMarginBottom = (attributesDict.hasOwnProperty('markerRectMarginBottom')) ? attributesDict['markerRectMarginBottom'] : 0.06
    markerRectBorderRadius = (attributesDict.hasOwnProperty('markerRectBorderRadius')) ? attributesDict['markerRectBorderRadius'] : px2

    if (markersList.includes('square')) {
      markerSquareWidth = (attributesDict.hasOwnProperty('markerSquareWidth')) ? attributesDict['markerSquareWidth'] : px5
      markerSquareBorderRadius = (attributesDict.hasOwnProperty('markerSquareBorderRadius')) ? attributesDict['markerSquareBorderRadius'] : 0
    }
      
  } 
  
  if (markersList.includes('label')) {

    markerLabelSize = (attributesDict.hasOwnProperty('markerLabelSize')) ? attributesDict['markerLabelSize'] : 0.72
    markerLabelWeight = (attributesDict.hasOwnProperty('markerLabelWeight')) ? attributesDict['markerLabelWeight'] : "'wght' 700"

    markerLabelIntervalInner = (attributesDict.hasOwnProperty('markerLabelIntervalInner')) ? attributesDict['markerLabelIntervalInner'] : px8
    markerLabelMarginBottom = (attributesDict.hasOwnProperty('markerLabelMarginBottom')) ? attributesDict['markerLabelMarginBottom'] : 0
    
  }

  let mainNode = d3.select('#' + MainNodeID)
    .append('g')
    .attr('name', legendName)
    .attr('id', legendID)

  markersList.forEach((marker, i) => {

    let label = labelsList[i]
    let color = colorsList[i]
    let interval

    let nodeID = `${legendID}` + '-' + 'node-' + i

    let node = mainNode
      .append('g')
      .attr('id', nodeID)

    if ((marker == 'line') || (marker == 'line-dash')) {

      if (i == 0) {
        
        previousNodeXCoord = legendXCoord
        previousNodeLength = 0
        interval = 0
        
      } else {

        previousNodeXCoord = d3legendGetPreviousNodeCoordinates(i)[0]
        previousNodeLength = d3legendGetPreviousNodeCoordinates(i)[1]
        interval = intervalNodes
        
      }

      node
        .append('line')
        .attr('x1', previousNodeXCoord + interval + previousNodeLength)
        .attr('x2', previousNodeXCoord + interval + previousNodeLength + markerLineLength)
        .attr('y1', legendYCoord - convertRemToPixels(markerLineMarginBottom))
        .attr('y2', legendYCoord - convertRemToPixels(markerLineMarginBottom))
        .attr('id', nodeID + '-' + 'line')
        .attr('stroke', color)
        .attr('stroke-width', markerLineWidth)
        .attr('stroke-linecap', 'round')
        .attr('stroke-dasharray', (marker == 'line-dash') ? markerLineStrokeDasharray : 0)
        .attr('shape-rendering', markerLineShapeRendering)

      node
        .append('text')
        .text(label)
        .style('font-family', PrimaryFont)
        .style('fill', labelColor)
        .style('font-size', `${labelSize}rem`)
        .style('font-variation-settings', labelWeight)
        .style('dominant-baseline', 'middle')
        .style('letter-spacing', `${letterSpacing}rem`)
        .style('text-rendering', textRendering)
        .attr('x', previousNodeXCoord + interval + previousNodeLength + markerLineLength + intervalInner)
        .attr('y', legendYCoord)
        .attr('id', nodeID + '-' + 'label')    

    } else if (marker == 'circle' || marker == 'circle no fill' || marker == 'circle w point') {

      let fill = color
      let radius = markerCircleRadius
      let stroke = 'none'
      let strokeWidth = 0
      
      let fillInner
      let radiusInner
      let strokeInner
      let strokeWidthInner

      if (i == 0) {
        
        previousNodeXCoord = legendXCoord
        previousNodeLength = 0
        interval = 0
        
      } else {
        
        previousNodeXCoord = d3legendGetPreviousNodeCoordinates(i)[0]
        previousNodeLength = d3legendGetPreviousNodeCoordinates(i)[1]
        interval = intervalNodes

      }

      if (marker == 'circle no fill') {
        
        fill = 'none'
        radius = markerCircleNoFillRadius
        stroke = color
        strokeWidth = markerCircleNoFillStrokeWidth
        
      } else if (marker == 'circle w point') {
        
        fill = 'none'
        radius = markerCircleNoFillRadius
        stroke = color
        strokeWidth = markerCircleNoFillStrokeWidth
        
        fillInner = color
        radiusInner = markerCirclePointRadius
        strokeInner = 'none'
        strokeWidthInner = 'none'
        
      }

      // separator if necessarry
      if (addSeparatorBefore.includes(i)) {

        let sepCoordX = Math.floor(previousNodeXCoord + interval + previousNodeLength) + 0.5
        let sepCoordY = Math.floor(legendYCoord - convertRemToPixels(markerCircleMarginBottom)) + 0.5
        
        addSeparator(mainNode, sepCoordX, sepCoordY, labelSize)

        interval = 2*interval

      }

      // primary circle
      node
        .append('circle')
        .attr('cx', Math.floor(previousNodeXCoord + interval + previousNodeLength + strokeWidth + radius) + 0.5)
        .attr('cy', Math.floor(legendYCoord - convertRemToPixels(markerCircleMarginBottom)) + 0.5)
        .attr('r', radius)
        .style('r', radius)
        .attr('id', nodeID + '-' + 'circle')
        .style('shape-rendering', 'geometricPrecision')
        .style('fill', fill)
        .style('stroke', stroke)
        .style('stroke-width', strokeWidth)

      // point if necessary
      if (marker == 'circle w point') {

        node
          .append('circle')
          .attr('cx', Math.floor(previousNodeXCoord + interval + previousNodeLength + strokeWidth + radius) + 0.5)
          .attr('cy', Math.floor(legendYCoord - convertRemToPixels(markerCircleMarginBottom)) + 0.5)
          .attr('r', radiusInner)
          .style('r', radiusInner)
          .attr('id', nodeID + '-' + 'circle')
          .style('shape-rendering', 'geometricPrecision')
          .style('fill', fillInner)
          .style('stroke', strokeInner)
          .style('stroke-width', strokeWidthInner)

      }

      // label
      node
        .append('text')
        .text(label)
        .style('font-family', PrimaryFont)
        .style('font-size', `${labelSize}rem`)
        .style('font-variation-settings', labelWeight)
        .style('fill', labelColor)
        .style('dominant-baseline', 'middle')
        .style('letter-spacing', `${letterSpacing}rem`)
        .style('text-rendering', textRendering)
        .attr('x', previousNodeXCoord + interval + previousNodeLength + strokeWidth + radius + intervalInner)
        .attr('y', legendYCoord)
        .attr('id', nodeID + '-' + 'label')

    } else if (marker == 'rect' || marker == 'square') {

      let width = markerRectWidth
      let height = markerRectHeight
      let rX = markerRectBorderRadius

      if (marker == 'square') {
        width = markerSquareWidth
        height = markerSquareWidth
        rX = markerSquareBorderRadius
        // shapeRendering = 'crispEdges'
      }

      if (i == 0) {
        
        previousNodeXCoord = legendXCoord
        previousNodeLength = 0
        interval = 0
        
      } else {

        previousNodeXCoord = d3legendGetPreviousNodeCoordinates(i)[0]
        previousNodeLength = d3legendGetPreviousNodeCoordinates(i)[1]
        interval = intervalNodes
        
      }

      node
        .append('rect')
        .attr('x', previousNodeXCoord + interval + previousNodeLength)
        .attr('y', legendYCoord - 0.5 * height - convertRemToPixels(markerRectMarginBottom))
        .attr('width', width)
        .attr('height', height)
        .style('fill', color)
        .attr('rx', rX)
        .style('shape-rendering', markerShapeRendering)

      node
        .append('text')
        .text(label)
        .style('font-family', PrimaryFont)
        .style('font-size', `${labelSize}rem`)
        .style('font-variation-settings', labelWeight)
        .style('fill', labelColor)
        .style('dominant-baseline', 'middle')
        .style('letter-spacing', `${letterSpacing}rem`)
        .style('text-rendering', textRendering)
        .attr('x', previousNodeXCoord + interval + previousNodeLength + width + intervalInner)
        .attr('y', legendYCoord)
        .attr('id', nodeID + '-' + 'label')    
      
    } else if (markersList.includes('label')) {

      let markerLabel = markerLabels[i]

      if (i == 0) {
        
        previousNodeXCoord = legendXCoord
        previousNodeLength = 0
        interval = 0
        
      } else {

        previousNodeXCoord = d3legendGetPreviousNodeCoordinates(i)[0]
        previousNodeLength = d3legendGetPreviousNodeCoordinates(i)[1]
        interval = intervalNodes
        
      }

      node
        .append('text')
        .text(markerLabel)
        .style('font-family', PrimaryFont)
        .style('fill', color)
        .style('font-size', `${markerLabelSize}rem`)
        .style('font-variation-settings', markerLabelWeight)
        .style('dominant-baseline', 'middle')
        .attr('x', previousNodeXCoord + interval + previousNodeLength)
        .attr('y', legendYCoord - convertRemToPixels(markerLabelMarginBottom))
        .attr('id', nodeID + '-' + 'label')

      let markerLength = getElement(nodeID + '-' + 'label').getBBox().width

      node
        .append('text')
        .text(label)
        .style('font-family', PrimaryFont)
        .style('font-size', `${labelSize}rem`)
        .style('letter-spacing', `${letterSpacing}rem`)
        .style('font-variation-settings', labelWeight)
        .style('text-rendering', textRendering)
        .style('fill', labelColor)
        .style('dominant-baseline', 'middle')
        .attr('x', previousNodeXCoord + interval + previousNodeLength + markerLength + markerLabelIntervalInner)
        .attr('y', legendYCoord)
        .attr('id', nodeID + '-' + 'label')
      
    }

  })

}


function d3StyleAxis(objectEntries, strokeWidth, fontSize, axis='x', pad, tickColor, tickLabelColor, tickLabelWeight=600) {

  objectEntries.forEach(([key, axis_]) => {

    let xTickLine = d3GetElement(axis_.selectAll('line'))
    let xTickLineWidth = xTickLine.getAttribute('x2')

    if (axis == 'x') {
      xTickLineWidth = xTickLine.getAttribute('y2')
    } else if (axis == 'y') {
      xTickLineWidth = xTickLine.getAttribute('x2')
    }

    axis_.selectAll('path')
      .style('stroke', tickColor)
      .style('stroke-width', `${strokeWidth}rem`)
      // .style('shape-rendering', 'crispEdges')
  
    axis_.selectAll('line')
      .style('stroke', tickColor)
      .style('stroke-width', `${strokeWidth}rem`)
      // .style('shape-rendering', 'crispEdges')
      // .style('stroke-linecap', 'round')

    // if (kind == 'round') {
    //   axis_.selectAll('line')
    //     .style('shape-rendering', 'geometricPrecision')
    //     .style('stroke-linecap', 'round')
    // } else if (kind == 'crisp') {
    //   axis_.selectAll('line')
    //     .style('shape-rendering', 'crispEdges')
    // }
  
    axis_.selectAll('text')
      .attr('font-family', PrimaryFont)
      .style('fill', tickLabelColor)
      // .style('fill', '#6F767F')
      .style('font-size', `${fontSize}px`)
      // .style('font-weight', 600)
      .style('font-variation-settings', `'wght' ${tickLabelWeight}`)
      .style('text-anchor', (axis == 'x') ? 'middle' : 'end')
      .style('dominant-baseline', (axis == 'x') ? 'hanging' : 'auto')
      .attr('dy', (axis == 'x') ? pad : px4) // x labels offset
      .attr('dx', (axis == 'x') ? 0 : -pad) // y labels offset

    if (axis == 'x') {
      axis_.selectAll('text')
        .attr('y', xTickLineWidth)
    } else if (axis == 'y') {
      axis_.selectAll('text')
        .attr('x', xTickLineWidth)
    } 
    
  })

}


function d3StyleAxisTopOrRight(objectEntries, strokeWidth, fontSize, axis='x', pad, tickColor, tickLabelColor, tickLabelWeight=600) {

  objectEntries.forEach(([key, axis_]) => {

    let xTickLine = d3GetElement(axis_.selectAll('line'))
    let xTickLineWidth = xTickLine.getAttribute('x2')

    if (axis == 'x') {
      xTickLineWidth = xTickLine.getAttribute('y2')
    } else if (axis == 'y') {
      xTickLineWidth = xTickLine.getAttribute('x2')
    }
  
    axis_.selectAll('path')
      .style('stroke', tickColor)
      .style('stroke-width', `${strokeWidth}rem`)
      .style('shape-rendering', 'crispEdges')
  
    axis_.selectAll('line')
      .style('stroke', tickColor)
      .style('stroke-width', `${strokeWidth}rem`)
      .style('shape-rendering', 'crispEdges')
  
    axis_.selectAll('text')
      .attr('font-family', PrimaryFont)
      .style('fill', tickLabelColor)
      // .style('fill', '#6F767F')
      .style('font-size', `${fontSize}px`)
      // .style('font-weight', 600)
      .style('font-variation-settings', `'wght' ${tickLabelWeight}`)
      .style('text-anchor', (axis == 'x') ? 'middle' : 'end')
      .style('dominant-baseline', (axis == 'x') ? 'hanging' : 'auto')
      .attr('dy', (axis == 'x') ? -pad : px4) // x labels offset
      .attr('dx', (axis == 'x') ? 0 : pad - px0_5) // y labels offset - px0_5 fixes d3 bug

    if (axis == 'x') {
      axis_.selectAll('text')
        .attr('y', xTickLineWidth)
    } else if (axis == 'y') {
      axis_.selectAll('text')
        .attr('x', xTickLineWidth)
    } 
    
  })
  
}


function d3CreateAxisRectangle(svg, width, height, axisR, stroke, strokeWidth, fill=null) {

  let axisWidth = width
  let axisHeight = height

  let axisG = svg
    .append('g')
    .attr('name', 'axis')

  axisG
    .append('rect')
    .attr('x', px0_5)
    .attr('y', px0_5)
    .attr('width', Math.round(axisWidth))
    .attr('height', Math.round(axisHeight))
    // .style('fill', 'none')
    .style('stroke', stroke)
    .style('stroke-width', `${strokeWidth}rem`)
    .style('shape-rendering', 'geometricPrecision')
    .style('rx', `${axisR}px`)

  if (fill) {

    axisG.style('fill', fill)
  } else {
    axisG.style('fill', 'none')
  }

  let axisEl = d3GetElement(axisG)

  return axisEl
  
}


function d3adjustPaddingOuter(paddingPx, scale, axis='x', type='band') {

  // insert this after xScale or yScale

  if (type == 'band') {
    
    scale.paddingOuter(
      (paddingPx - 0.5*scale.bandwidth() + px0_5) / scale.step()
    )

    // scale.paddingOuter(
    //   paddingPx / (2 * scale.align() * scale.step())
    // )
    
  } else if (type == 'linear') {

    let size
    let zero

    if (axis == 'x') {

      size = scale.range()[1]
      zero = scale.range()[0]

      scale.domain([
        scale.invert(zero - paddingPx),
        scale.invert(size + paddingPx)
      ])
      
    } else if (axis == 'y') {

      size = scale.range()[0]
      zero = scale.range()[1]

      scale.domain([
        scale.invert(size + paddingPx),
        scale.invert(zero - paddingPx)
      ])
      
    }
    
  }
  
}


function d3GetPaddingDistance(scale, kind='band') {

  let result

  if (kind == 'linear') {

    let domain = scale.domain()
    let ticks = scale.ticks()

    let domainStart = domain[0]
    let firstTick = ticks[0]

    result = Math.abs(scale(firstTick) - scale(domainStart))
    
  } else if (kind == 'band') {

    result = scale.step() * scale.paddingOuter() + 0.5*scale.bandwidth()
      
  }

  return result
  
}


function d3DrawXGrid(axis, name, scale, tickValues, start, end, color, scaleType='band', correction=px0_5) {

  // variables
  // if (!correction) { correction = px0_5}

  // vertical line

  let start_ = Math.ceil(start)
  let end_ = Math.ceil(end)

  let axisGrid = axis.append('g').attr('name', name)

  for (let tick of tickValues) {

    let scaledTick = scale(tick)

    if ((scaleType == 'linear') && correction) {scaledTick += correction}
    if ((scaleType == 'band')) { scaledTick += 0.5 * scale.bandwidth()}
    
    axisGrid.append('path')
      .attr('d', `M ${scaledTick}, ${start_} V ${end_}`)
      .style('stroke', color)
      .style('shape-rendering', 'crispEdges')
      // .style('stroke-dasharray', '8 4')
    
  }
  
}

function d3DrawYGrid(axis, name, scale, tickValues, start, end, color, scaleType='band') {

  // horizontal line

  let start_ = Math.ceil(start)
  let end_ = Math.ceil(end)

  let axisGrid = axis.append('g').attr('name', name)

  for (let tick of tickValues) {

    let scaledTick = scale(tick)

    if (scaleType == 'linear') {scaledTick += 0.5 * px1}
    if (scaleType == 'band') { scaledTick += 0.5 * scale.bandwidth()}
    
    axisGrid.append('path')
      .attr('d', `M ${start_}, ${scaledTick} H ${end_}`)
      .style('stroke', color)
      .style('shape-rendering', 'crispEdges')
      // .style('stroke-dasharray', '8 4')
    
  }
  
}


function generateRange(min, max, length='2', res='range') {

  // length == '1' : ~ 3-5 ticks
  // length == '2' : ~ 3-7 ticks
  // length == '3' : ~ 9-11 ticks

  if (min == max) {

    let decimals = countDecimals(min)
    let delta

    if (decimals == 0) {

      delta = Number('1'.padEnd(String(min).length, '0'))

    } else {

      delta = Number('0.' + ''.padStart(decimals-1, '0') + '1')

    }

    min = min - delta
    max = max + delta

  }
    
  if (min > max) {
    
    min_copy = min
    min = max
    max = min_copy
    
  }

  if (min == 0 && max == 0) {
    max = 1
  }

  // adfust min and max values to scale
  
  let pwr = Math.log(max - min) / Math.log(10)
  let scl = Math.pow(10, pwr - Math.floor(pwr))

  if (scl > 0 && scl <= 2.5) {

    // in example step was equal: step = 0.2

    step1 = 1

    if (scl > 0 && scl <=1) { step2 = 0.25 }
    else { step2 = 0.5 }
    
    step3 = 0.1
    
  } else if ( scl > 2.5 && scl <= 5) {

    // in example step was equal: step = 0.5

    step1 = 2
    step2 = 1
    step3 = 0.5
    
  } else if (scl > 5 && scl <= 7.5) {

    // in example step was equal: step = 1

    step1 = 4
    step2 = 2
    step3 = 1
      
  } else {

    // in example step was equal: step = 2

    step1 = 4
    step2 = 2
    step3 = 1
    
  }

  let step
  let count

  if (length == '1') { step = step1 }
  else if (length == '2') { step = step2 }
  else if (length == '3') { step = step3 }

  step = (Math.pow(10, Math.floor(pwr)) * step)
  count = Math.ceil((max - min) / step)

  let start = Math.floor(min / step) * step
  let end = Math.ceil(max / step) * step

  let range_ = range(start, end + step, step)

  let result

  if (res == 'range') { result = range_ }
  else if (res == 'step') { result = [range_, step] }
  else if (res == 'all') { result = [range_, start, end, step] }

  return result

}


function adjustFontSizeByParent(container, scale=1, max_iterations=10) {

  // container : container of text

  let parentElement = container.parentElement
  let computedStyle = getComputedStyle(parentElement)

  // parent width without paddings
  let parentElementWidth = parentElement.clientWidth
  parentElementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)

  if (container.offsetWidth > scale*parentElementWidth) {

    let breaker = 0

    while ((container.offsetWidth > scale*parentElementWidth) && (breaker < max_iterations)) {
      
      let fontSize = window.getComputedStyle(container).fontSize.replace('px', '')
      container.style.fontSize = `${0.9 * fontSize}px`

      breaker +=1
      
    }

    if (breaker == max_iterations) {
      logit(`Alert : More than ${max_iterations} iterations of font size adjusting`)
    }
    
  } else {
    container.style.fontSize = ''
  }

}


function eventDriversClearLaptimes(data, laptimesColumn, coeff=3) {

  // data : [{LapNumber: 1, Laptime: 123}]

  let laps = data.map(d => d['LapNumber'])
  let laptimes = data.map(d => d[laptimesColumn])

  laps.forEach((lap, i) => {

    if (i >= 3) {

      if (laps[i] == Number(laps[i-1]) + 1) {

        let currentTime = Number(laptimes[i])
        let previousTime1 = Number(laptimes[i-1])
        let previousTime2 = Number(laptimes[i-2])
        let previousTime3 = Number(laptimes[i-3])

        let previousDiff = 0.5 * (
          Math.abs(previousTime3 - previousTime2)
          + Math.abs(previousTime2 - previousTime1)
        )
        
        let marker = coeff * Math.abs(previousDiff)
  
        if (Math.abs(previousTime1 - currentTime) < marker) {
          data[i][laptimesColumn + 'IsCleared'] = 1
        } else {
          data[i][laptimesColumn + 'IsCleared'] = 0
        } 

      }

    }

  })

  return data

}


function imageNotFound(img) {

  let imageNotFound = true

  img.onerror = function() {
    if (imageNotFound) {
      img.src = pathImgDrivers + 'not-found.svg'
      imageNotFound = false
    }
  }
  
}


function d3ShowEveryNTicklabel(axis, n) {

  // axis : xBottom, yLeft, etc.

  let ticks = arrayFromElements(axis.selectAll(".tick text"))

  ticks.forEach((t, i) => {
    if (i%n !== 0) {ticks[i].style.opacity = 0}
  })
  
}


function arrayAddMeanElementsInside(array) {

  let result = []

  array.forEach((e, i) => {

    if (i != array.length - 1) {
      result.push(array[i])
      result.push(0.5 * (array[i] + array[i+1]))
    } else {
      result.push(array[i])
    }

  })

  return result
  
}


function delayAnimation(elementID, delayDurationMs) {

  // предварительно в DOM добавить класс 'stop-transitions' в элемент
  // эта функция удалит этот клас через delayDurationMs миллисекунд

  let element = getElement(elementID)

  if (element) {
    setTimeout(() => {
      element.classList.remove('stop-transitions')}, delayDurationMs)
  }

}


function removeClassName(element, className, delayMS=0) {
  if (element) { setTimeout(() => { element.classList.remove(className)}, delayMS) }
}

function addClassName(element, className, delayMS=0) {

  if (element) { setTimeout(() => { element.classList.add(className)}, delayMS) }
}


function secToLabel(value, decimals=3) {
  
  let minutes = Math.floor(value / 60)
  
  let seconds = Math.floor(value - minutes * 60)
  seconds = pad_with_zeroes(seconds, 2)

  let decimalValue = String(value).indexOf('.')

  if (decimalValue == -1) {
    var milliseconds = '0'.repeat(decimals)
  } else {
    var milliseconds = value.toString().substring(decimalValue+1)
    if (milliseconds.length < 3) {
      milliseconds = (milliseconds + '0'.repeat(decimals)).slice(0, decimals)
    }
  }

  if (String(minutes).length < 2) {
    result = `0${minutes}:${seconds}.${milliseconds}`
  } else {
    result = `${minutes}:${seconds}.${milliseconds}`
  }

  return result

}


function getSeasonOver(seasonID) {

  let result = calendar.filter(o => o['SeasonID'] == seasonID)[0]['SeasonOver']
  
  return result
  
}


function getNthParent(element, n) {
  let current = element;
  for (let i = 0; i < n; i++) {
    if (current.parentNode) {
      current = current.parentNode;
    } else {
      return null; // If there isn't an nth parent, return null
    }
  }
  return current;
}


function d3GetElement(d3_element) {
  return d3_element['_groups'][0][0]
}


function elementMiddleCoord(element) {

  let width = element.offsetWidth
  let left = element.offsetLeft
  let xMiddle = left + 0.5 * width

  let height = element.offsetHeight
  let top = element.offsetTop
  let yMiddle = top + 0.5 * height

  return [xMiddle, yMiddle]
  
}

function lowercaseFirstWord(str) {
  
  if (!str) {
    return '' // Handles empty strings
  }
  
  let firstSpaceIndex = str.indexOf(" ")
  
  if (firstSpaceIndex === -1) {
    return str.toLowerCase() // If no spaces, lowercase the whole string
  }
  
  let firstWord = str.substring(0, firstSpaceIndex)
  let restOfString = str.substring(firstSpaceIndex)
  
  return firstWord.toLowerCase() + restOfString
  
}


function scrollToID(ID) {
  getElement(ID).scrollIntoView()
}


function lapNumberToNameRus(lapnumber) {

  let result

  if (lapnumber == 0) {
    result = 'кругов'
  } else if (lapnumber == 1) {
    result = 'круг'
  } else if ((lapnumber > 1) && (lapnumber <= 4)) {
    result = 'круга'
  } else if ((lapnumber > 4) && (lapnumber <= 20)) {
    result = 'кругов'
  } else if (lapnumber > 20) {

    let lapnumberStr = String(lapnumber)
    let lastNumber = lapnumberStr.slice(-1)

    if (lastNumber == 0) {
      result = 'кругов'
    } else if (lastNumber == 1) {
      result = 'круг'
    } else if ((lastNumber > 1) && (lastNumber <= 4)) {
      result = 'круга'
    } else if (lastNumber > 4) {
      result = 'кругов'
    }
    
  }

  return result
  
}


function d3GetBandwidthLinear(axisLinear) {

  // axis : xBottom, yLeft, etc.

  let element = d3GetElement(axisLinear)

  let tick0 = element.children[0].children[1].children[0]
  let tick1 = element.children[0].children[2].children[0]

  let tick0Left = getSizes(tick0).left
  let tick1Left = getSizes(tick1).left

  let result = tick1Left - tick0Left

  return result
  
}


const d3PolyGeneratePoint = ({center, length, angle, angleDelta}) => {

  // center - первая точка
  // length - расстояние от первой точки

  let point = {
    x: Math.round(center.x + (length * Math.sin(Math.PI - angle - angleDelta))) + 0.5,
    y: Math.round(center.y + (length * Math.cos(Math.PI - angle - angleDelta))) + 0.5
  }
  
  return point 

}


const d3PolyDrawPath = (points, parent, linewidth, color, fill='none') => {
    
    let lineGenerator = d3.line()
      .x(d => d.x)
      .y(d => d.y)

    parent
      .append('path')
      .style('stroke', color)
      .style('stroke-width', linewidth)
      .style('fill', fill)
      .style('shape-rendering', 'geometricPrecision')
      .attr('d', lineGenerator(points))
   
  }


const d3PolyDrawLevels = (main, levelsCount, sideCount, attributes) => {

  let group = main
    .append('g')
    .attr('name', 'grid')

  let center = attributes['center']
  let r_0 = attributes['r_0']
  let r_1 = attributes['r_1']
  let polyangle = attributes['polyangle']
  let angleDelta = attributes['angleDelta']

  let levelColor = attributes['levelColor']
  let levelColorDark = attributes['levelColorDark']

  let drawDriverLevel = attributes['drawDriverLevel']
  let levelDriverLevelWidth = attributes['levelDriverLevelWidth']
  let levelDriverLevelColor = attributes['levelDriverLevelColor']
  let levelDriverLevelSides = attributes['levelDriverLevelSides']

  for (let i = 0; i < levelsCount; i++) {

    let length = r_1 * (i + 1)
    let points = []

    // highlight sides that calculated in driver level
    let pointsCountDriverLevelSides
    let pointsCountDriverLevel
    
    if (drawDriverLevel) {
      pointsCountDriverLevelSides = levelDriverLevelSides
      pointsCountDriverLevel = []
    }
    
    for (let j = 0; j < sideCount; j++) {

      let theta = j * polyangle
      
      let point = d3PolyGeneratePoint({
        center: center,
        length: length,
        angle: theta,
        angleDelta: angleDelta
      })

      points.push(point)

      // bold line at last level
      if (drawDriverLevel) {
        // for last level and first 3 sides
        if ((i == levelsCount - 1) && pointsCountDriverLevelSides.includes(j)) {
          pointsCountDriverLevel.push(point)
        }
      }

    }

    let linewidth = px1
    let color = levelColor

    if ((i == 0) | (i == levelsCount - 1)) {
      color = levelColorDark
    }

    d3PolyDrawPath([ ...points, points[0]], group, linewidth, color)

    if (drawDriverLevel) {
      // for last level
      if (i == levelsCount - 1) {
        d3PolyDrawPath([ ...pointsCountDriverLevel], group, levelDriverLevelWidth, levelDriverLevelColor)
      }
    }

  }
  
}

const d3PolyDrawAxis = (main, sideCount, attributes) => {

  let group = main
    .append( "g" )
    .attr('name', 'axis')

  let center = attributes['center']
  let r_0 = attributes['r_0']
  let r_1 = attributes['r_1']
  let polyangle = attributes['polyangle']
  let angleDelta = attributes['angleDelta']
  let r_3 = attributes['r_3']
  let color = attributes['axisColor']

  for (let i = 0; i < sideCount; i++) {

    let theta = i * polyangle
    
    // start point of axises - to make lines not cross center, center local starts from r_1
    let pointStart = d3PolyGeneratePoint({
      center: center,
      length: r_1,
      angle: theta,
      angleDelta: angleDelta
    })

    let pointEnd = d3PolyGeneratePoint({
      center: center,
      length: r_3,
      angle: theta,
      angleDelta: angleDelta
    })

    d3PolyDrawPath([pointStart, pointEnd], group, px1, color)

  }

}


const d3PolyDrawTicks = (main, ticks, attributes) => {

  let group = main
    .append('g')
    .attr('name', 'ticks')

  let ticksOffset = attributes['ticksOffset']
  let ticksAngle = attributes['ticksAngle']

  let center = attributes['center']
  let r_2 = attributes['r_2']
  let polyangle = attributes['polyangle']
  let angleDelta = attributes['angleDelta']

  ticks.forEach((tick, i) => {

    let legnth = r_2 * (i + 2) + ticksOffset
    
    let point = d3PolyGeneratePoint({
      center: center,
      length: legnth,
      angle: ticksAngle,
      angleDelta: angleDelta
    })

    group
      .append("text")
      .text(tick)
      .style('font-family', PrimaryFont)
      .style('fill', '#787B7F')
      .style('font-size', `${px11}px`)
      .style('font-weight', 700)
      .style('cursor', 'default')
      .style('text-anchor', 'end')
      .style('dominant-baseline', 'Auto')
      .attr("x", point.x)
      .attr("y", point.y)
    
  })
  
}

const d3PolyDrawLabels = (main, sideCount, labels, attributes, labelsAttributes) => {

  let group = main
    .append( "g" )
    .attr('name', 'labels')
    .style('cursor', 'default')

  let center = attributes['center']
  let polyangle = attributes['polyangle']
  let r_0 = attributes['r_0']
  let r_3 = attributes['r_3']
  let angleDelta = attributes['angleDelta']

  let labelsOffset = labelsAttributes['labelsOffset']
  let labelsOffsetY = labelsAttributes['labelsOffsetY']
  let textAnchors = labelsAttributes['textAnchors']
  let dominantBaselines = labelsAttributes['dominantBaselines']
  let textRendering = labelsAttributes['textRendering']

  let fontSize = labelsAttributes['fontSize']
  let fontWeight = labelsAttributes['fontWeight']
  let fill = labelsAttributes['color']
  
  for (let i = 0; i < sideCount; i++) {

    let point = d3PolyGeneratePoint({
      center: center,
      length: r_3 + labelsOffset,
      angle: i * polyangle,
      angleDelta: angleDelta
    })

    group
      .append('text')
      .text(labels[i])
      .style('font-family', PrimaryFont)
      .style('font-size', `${fontSize}px`)
      .style('font-variation-settings', fontWeight)
      .style('fill', fill)
      .style('dominant-baseline', dominantBaselines[i])
      .style('text-anchor', textAnchors[i])
      .style('text-rendering', textRendering)
      .attr('x', point.x)
      .attr('y', point.y + labelsOffsetY[i])
      // .attr('id', 'pentagon-1-label-' + labelIndex)
      
    }

}


const d3PolyDrawMiddlePoints = (main, sideCount, attributes, addLine=true) => {

  let group = main
    .append( "g" )
    .attr('name', 'middle-points')

  let center = attributes['center']
  let r_0 = attributes['r_0']
  let r_1 = attributes['r_1']
  let polyangle = attributes['polyangle']
  let angleDelta = attributes['angleDelta']
  
  let sidesDraw = attributes['midPointSides']
  let radius = attributes['midPointRadius']
  let pointColor = attributes['midPointColor']
  let lineColor = attributes['midPointLineColor']

  let linePoints = []

  for (let i = 0; i < sideCount; i++) {

    if (sidesDraw.includes(i)) {

      let halfLength = 0.5 * (r_0 + r_1)
      
      let point = d3PolyGeneratePoint({
        center: center,
        length: halfLength,
        angle: i * polyangle,
        angleDelta: angleDelta
      })

      group
        .append('circle')
        .attr('cx', point.x)
        .attr('cy', point.y)
        .attr('r', radius)
        .style('r', radius)
        .style('fill', pointColor)

      if (addLine) { linePoints.push(point) }

    }

  }

  if (addLine) { d3PolyDrawPath([ ...linePoints], group, px1, lineColor) }

}


const d3PolyDrawData = (main, data, features, scale, sides, color, linestyle, attributes) => {

  let center = attributes['center']
  let polyangle = attributes['polyangle']
  let angleDelta = attributes['angleDelta']

  let linewidth = attributes['metricLineWidth']

  let alpha = attributes['alpha']

  let points = []
  
  features.forEach((feature, i) => {

    let point = d3PolyGeneratePoint({
      center: center,
      length: scale(data[feature]),
      angle: i * polyangle,
      angleDelta: angleDelta
    })

    points.push({...point})
    
  })

  let group = main
    .append('g')
    .attr('name', 'metrics')
  
  let lineGenerator = d3.line()
    .curve(d3.curveCardinalClosed.tension(alpha))
    .x(d => d.x)
    .y(d => d.y)
    .defined(d => !isNaN(d.x) && !isNaN(d.y))

  group
    .append('path')
    .attr('d', lineGenerator(points))
    .style("stroke-width", linewidth)
    .style("stroke-linejoin", "round")
    .style('fill', color)
    .attr("fill-opacity", 0.1)
    .style('stroke', color)
    .style('stroke-dasharray', linestyle)
    // .style('filter', 'drop-shadow(0.0625rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.15))')
  
}


const d3CircleDrawLevels = (main, levelsCount, attributes) => {

  let group = main
    .append('g')
    .attr('name', 'levels')

  let center = attributes['center']
  let color1 = attributes['axisColorRegular']
  let color2 = attributes['axisColorSpecial']
  let r_1 = attributes['r_1']

  for (let i = 0; i < levelsCount; i++) {

    group
      .append('circle')
      .attr('cx', center.x)
      .attr('cy', center.y)
      .attr('fill', 'none')
      .attr('stroke', ((i == 0) || (i == levelsCount - 1)) ? color2 : color1)
      .attr('r', r_1 * (i + 1))
      .style('r', r_1 * (i + 1))

  }

}


const d3CircleDrawAxis = (main, sidesCount, attributes) => {

  let group = main
    .append('g')
    .attr('name', 'levels')

  let center = attributes['center']
  let polyangle = attributes['polyangle']
  let angleDelta = attributes['angleDelta']
  // let color1 = attributes['axisColorRegular']
  let color = attributes['axisColorSpecial']
  let r_1 = attributes['r_1']
  let r_2 = attributes['r_2']
  let width = attributes['axisWidth']

  for (let i = 0; i < sidesCount; i++) {

    let pointStart = d3PolyGeneratePoint({
      center: center,
      length: r_1,
      angle: i * polyangle,
      angleDelta: angleDelta
    })

    let pointEnd = d3PolyGeneratePoint({
      center: center,
      length: r_2,
      angle: i * polyangle,
      angleDelta: angleDelta
    })

    let points = [
      {x: pointStart.x, y: pointStart.y},
      {x: pointEnd.x, y: pointEnd.y}
    ]

    let lineGenerator = d3.line()
      .x(d => d.x)
      .y(d => d.y)

    group
      .append('path')
      .style('stroke', color)
      .style('stroke-width', width)
      .style('fill', 'none')
      .style('shape-rendering', 'geometricPrecision')
      .attr('d', lineGenerator(points))
    
  }
  
}


const d3CircleDrawTicks = (main, ticks, attributes) => {

  let group = main
    .append('g')
    .attr('name', 'ticks')

  let center = attributes['center']
  let polyangle = attributes['polyangle']
  let r_1 = attributes['r_1']
  let theta = -0.5 * polyangle
  let angleDelta = attributes['angleDelta']
  let ticksOffset = attributes['ticksOffset']

  let fill = attributes['tickColor']
  let fontSize = attributes['fontSize']
  let fontWeight = attributes['fontWeight']
  let tickAnchors = attributes['tickAnchors']
  let tickDominantBaselines = attributes['tickDominantBaselines']

  ticks.forEach((tick, i) => {

    let point = d3PolyGeneratePoint({
      center: center,
      length: r_1 * (i + 2) + ticksOffset,
      angle: theta,
      angleDelta: angleDelta
    })

    group
      .append('text')
      .text(tick)
      .style('font-family', PrimaryFont)
      .style('fill', fill)
      .style('font-size', `${fontSize}px`)
      .style('font-variation-settings', ` 'wght' ${fontWeight}`)
      .style('cursor', 'default')
      .style('text-anchor', tickAnchors[i])
      .style('dominant-baseline', tickDominantBaselines[i])
      .attr('x', point.x)
      .attr('y', point.y)
    
  })
    
}


const d3CircleDrawMeanPoints = (main, data, features, scale, sides, attributes) => {

  let group = main
    .append('g')
    .attr('name', 'middle-points')

  let center = attributes['center']
  let polyangle = attributes['polyangle']
  let angleDelta = attributes['angleDelta']

  let meanRadius = attributes['meanRadius']
  let fill = attributes['meanColor']

  features.forEach((feature, i) => {

    let point = d3PolyGeneratePoint({
      center: center,
      length: scale(data[feature + 'RaceMean']),
      angle: i * polyangle,
      angleDelta: angleDelta
    })

    group
      .append('circle')
      .attr('cx', point.x)
      .attr('cy', point.y)
      .attr('fill', fill)
      .attr('r', meanRadius)
      .style('r', meanRadius)

  })

}


// const d3CircleDrawLabels = (main, sideCount, labels, attributes) => {

//   let group = main
//     .append('g')
//     .attr('name', 'labels')

//   let center = attributes['center']
//   let polyangle = attributes['polyangle']
//   let r_2 = attributes['r_2']
//   let angleDelta = attributes['angleDelta']

//   let fontSize = attributes['labelsFontSize']
//   let fontWeight = attributes['labelsFontWeight']
//   let fill = attributes['labelsColor']
//   let dominantBaselines = attributes['labelsDominantBaselines']
//   let textAnchors = attributes['labelsTextAnchors']
//   let textRendering = attributes['labelsTextRendering']
//   let labelsOffset = attributes['labelsOffset']

//   for (let i = 0; i < sideCount; i++) {

//     let point = d3PolyGeneratePoint({
//       center: center,
//       length: r_2 + labelsOffset,
//       angle: i * polyangle,
//       angleDelta: angleDelta
//     })

//     group
//       .append('text')
//       .text(labels[i])
//       .style('font-family', PrimaryFont)
//       .style('font-size', `${fontSize}px`)
//       .style('font-variation-settings', ` 'wght' ${fontWeight}`)
//       .style('fill', fill)
//       .style('dominant-baseline', dominantBaselines[i])
//       .style('text-anchor', textAnchors[i])
//       .style('text-rendering', textRendering)
//       .attr('x', point.x)
//       .attr('y', point.y)
    
//   }

// }


const d3CircleDrawLabels = (main, sideCount, labels, attributes) => {

  let group = main
    .append('g')
    .attr('name', 'labels')

  let center = attributes['center']
  let polyangle = attributes['polyangle']
  let r_2 = attributes['r_2']
  let angleDelta = attributes['angleDelta']

  let fontSize = attributes['labelsFontSize']
  let fontWeight = attributes['labelsFontWeight']
  let fill = attributes['labelsColor']
  let dominantBaselines = attributes['labelsDominantBaselines']
  let textAnchors = attributes['labelsTextAnchors']
  let textRendering = attributes['labelsTextRendering']

  for (let i = 0; i < sideCount; i++) {

    let point = d3PolyGeneratePoint({
      center: center,
      length: r_2,
      angle: i * polyangle,
      angleDelta: angleDelta
    })

    let labelOffsetX
    let labelOffsetY

    if ((i == 0) | (i == 1) | (i == 2)) {
      labelOffsetX = attributes['labelsOffsetX'][i]
    } else {
      labelOffsetX = -attributes['labelsOffsetX'][i]
    }

    if ((i == 0) | (i == 1) | (i == 3)) {
      labelOffsetY = -attributes['labelsOffsetY'][i]
    } else {
      labelOffsetY = attributes['labelsOffsetY'][i]
    }

    let coordX = point.x + labelOffsetX
    let coordY = point.y + labelOffsetY
    
    let rotation = attributes['labelsRotation'][i]

    group
      .append('text')
      .text(labels[i])
      .style('font-family', PrimaryFont)
      .style('font-size', `${fontSize}px`)
      .style('font-variation-settings', ` 'wght' ${fontWeight}`)
      .style('fill', fill)
      .style('dominant-baseline', dominantBaselines[i])
      .style('text-anchor', textAnchors[i])
      .style('text-rendering', textRendering)
      // .attr('x', point.x + labelOffsetX)
      // .attr('y', point.y + labelOffsetY)
      .attr("transform", `translate(${coordX}, ${coordY}) rotate(${rotation})`); 
    
  }

}


const d3CircleDrawMetric = (main, data, features, color, linestyle, scale, sides, attributes) => {

  let group = main
    .append('g')
    .attr('name', 'metric')

  let center = attributes['center']
  let polyangle = attributes['polyangle']
  let angleDelta = attributes['angleDelta']

  let width = attributes['lineWidth']

  let points = []

  features.forEach((feature, i) => {

    let point = d3PolyGeneratePoint({
      center: center,
      length: scale(data[feature]),
      angle: i * polyangle,
      angleDelta: angleDelta
    })

    points.push({...point})

  })

  let lineGenerator = d3.line()
    .curve(d3.curveCardinalClosed)
    .x(d => d.x)
    .y(d => d.y)
    .defined(d => !isNaN(d.x) && !isNaN(d.y))

  group
    .append('path')
    .attr('d', lineGenerator(points))
    .style("stroke-width", width)
    .style("stroke-linejoin", "round")
    .style('fill', color)
    .attr("fill-opacity", 0.1)
    .style('stroke', color)
    .style('stroke-dasharray', linestyle)
    // .classed('theme-colors-control-img', true)

}


function objectDropDuplicatesByColumnValue(arrayOfObjects, column) {
      // 1. Create a Map using the specified column value as the key
      const uniqueMap = new Map();
      arrayOfObjects.forEach(obj => {
          // This line is crucial: it uses the column value as the map key.
          // If the key already exists, the new object overwrites the old one.
          uniqueMap.set(obj[column], obj);
      });
  
      // 2. Convert the Map values back to an array
      return Array.from(uniqueMap.values());
      // Alternatively, using spread syntax: [...uniqueMap.values()];
  }


function objectRemoveNaNs(arrayOfObjects, column) {

  let result = copyObject(arrayOfObjects)
  result = result.filter(obj => notNaN(obj[column]));

  return result
  
}


function d3getDataForColoredPathsZeroLine(data, condition) {

  let pathData = []
  let currentSegment = []
  
  for (let i = 0; i < data.length; i++) {
    
    const dataCurrent = data[i]
    const dataPrevious = data[i - 1]
    
    let dataNext

    if (i === 0) {
      currentSegment.push(dataCurrent)
    } else {
      
      // Check if crossing zero
      // const crossesZero = (dataPrevious.y >= 0 && d.y < 0) || (dataPrevious.y < 0 && d.y >= 0)
      const crossesZero = condition(dataCurrent, dataPrevious)
      const valueNaN = isNaN(dataCurrent.y)

      if (crossesZero || valueNaN) {

        // тангенс угла между горизонтальной осью и графиком
        let angleTg = (dataPrevious.y - dataCurrent.y) / (dataCurrent.x - dataPrevious.x)
        // в то же время этот тангенс равен
        // angleTg = (dataPrevious.y - 0) / (intersectionX - dataPrevious.x)
        // решая систему из двух уравнений с одним низвестным, получаем
        let intersectionX = dataPrevious.x + dataPrevious.y / angleTg
        
        currentSegment.push({ x: intersectionX, y: 0})
        pathData.push({ segment: currentSegment, type: dataPrevious.y >= 0 ? 'y_upper' : 'y_lower' })

        // Start a new segment from the intersection point
        currentSegment = [{ x: intersectionX, y: 0 }, dataCurrent]
        
        } else {
        currentSegment.push(dataCurrent)
      }
    }
  }
  
  // Add last segment to pathData
  if (currentSegment.length > 0) {

    let type = currentSegment.map( o => o.y)
    type = dropNaNs(type)
    type = type.filter(o => o != 0)
    type = type[0]
    
    pathData.push({ segment: currentSegment, type: (type >= 0) ? 'y_upper' : 'y_lower' })
    
  }

  return pathData
  
}


function d3getDataForColoredPathsBoth(data, condition) {

  let pathData = []
  let currentSegment = []
  
  for (let i = 0; i < data.length; i++) {
    
      const dataCurrent = data[i]
      const dataPrevious = data[i - 1]

      if (i === 0) {
          currentSegment.push(dataCurrent)
      } else {
        
          const crossDetection = condition(dataCurrent, dataPrevious)
          const valueNaN = isNaN(dataCurrent.y) || isNaN(dataCurrent.z)

          if (crossDetection || valueNaN) {

            // Add the intersection point to the current segment
            // Calculate the intersection point with the zero line
            // const intersectionX = (
            //   dataPrevious.x + (dataCurrent.x - dataPrevious.x) * (dataPrevious.y - dataPrevious.z) / (dataCurrent.y - dataPrevious.y)
            // )

            // тангенс - отношение противолежащего катета к прилежащему
            let angle1Tg = (dataPrevious.y - dataCurrent.y) / (dataCurrent.x - dataPrevious.x)
            let angle2Tg = (dataCurrent.z - dataPrevious.z) / (dataCurrent.x - dataPrevious.x)

            // так как мы знаем, что графики пересекаются, а значит их координаты Х и У (intersectionX и intersectionY) в этой точке равны,
            // то если записать формулу для тангенса улга треугольника с вершиной в неизвестной промежуточной точке,
            // получается система уравнений с двумя неизвестными
            
            // angle1Tg = (dataPrevious.y - intersectionY) / (intersectionX - dataPrevious.x)
            // angle2Tg = (intersectionY - dataPrevious.z) / (intersectionX - dataPrevious.x)

            // angle1Tg*(intersectionX - dataPrevious.x) = (dataPrevious.y - intersectionY)
            // angle2Tg*(intersectionX - dataPrevious.x) = (intersectionY - dataPrevious.z)

            // angle1Tg*(intersectionX - dataPrevious.x) + angle2Tg*(intersectionX - dataPrevious.x) = dataPrevious.y - dataPrevious.z
            // angle1Tg*intersectionX - angle1Tg*dataPrevious.x + angle2Tg*intersectionX - angle2Tg*dataPrevious.x = dataPrevious.y - dataPrevious.z
            // intersectionX*(angle1Tg + angle2Tg) - dataPrevious.x*(angle1Tg + angle2Tg) = (dataPrevious.y - dataPrevious.z)
            
            let intersectionX = ((dataPrevious.y - dataPrevious.z) + dataPrevious.x*(angle1Tg + angle2Tg)) / (angle1Tg + angle2Tg)

            // тогда 'intersectionY' выводится из формулы для 'angle2Tg'
            // intersectionY = angle2Tg*(intersectionX - dataPrevious.x) + dataPrevious.z
            
            let intersectionY = angle2Tg*(intersectionX - dataPrevious.x) + dataPrevious.z
          
            currentSegment.push({x: intersectionX, y: intersectionY, z: intersectionY})
            pathData.push({ segment: currentSegment, type: dataPrevious.y >= dataPrevious.z ? 'y_upper' : 'y_lower' })

            // Start a new segment from the intersection point
            currentSegment = [{x: intersectionX, y: intersectionY, z: intersectionY}, dataCurrent]
            
          } else {
              currentSegment.push(dataCurrent)
          }
      }
  }
  
  // Add the last segment
  if (currentSegment.length > 0) {
    
    let typeY = currentSegment.map( o => o.y)
    typeY = dropNaNs(typeY)
    typeY = typeY[0]

    let typeZ = currentSegment.map( o => o.z)
    typeZ = dropNaNs(typeZ)
    typeZ = typeZ[0]
    
    pathData.push({ segment: currentSegment, type: (typeY >= typeZ) ? 'y_upper' : 'y_lower' })
    
  }

  return pathData
  
}


function d3getDataForColoredPathsBothMarker(data, condition, marker) {

  let pathData = []
  let currentSegment = []
  
  for (let i = 0; i < data.length; i++) {
    
    const dataCurrent = data[i]
    const dataPrevious = data[i - 1]

    if (i === 0) {
      
        currentSegment.push(dataCurrent)
      
    } else {
      
      const crossDetection = condition(dataCurrent, dataPrevious)
      const valueNaN = isNaN(dataCurrent.y) || isNaN(dataCurrent.z)

      if (crossDetection || valueNaN) {

        // Add the intersection point to the current segment
        // Calculate the intersection point with the zero line
        // const intersectionX = (
        //   dataPrevious.x + (dataCurrent.x - dataPrevious.x) * (dataPrevious.y - dataPrevious.z) / (dataCurrent.y - dataPrevious.y)
        // )

        // тангенс - отношение противолежащего катета к прилежащему
        let angle1Tg = (dataPrevious.y - dataCurrent.y) / (dataCurrent.x - dataPrevious.x)
        let angle2Tg = (dataCurrent.z - dataPrevious.z) / (dataCurrent.x - dataPrevious.x)

        // так как мы знаем, что графики пересекаются, а значит их координаты Х и У (intersectionX и intersectionY) в этой точке равны,
        // то если записать формулу для тангенса улга треугольника с вершиной в неизвестной промежуточной точке,
        // получается система уравнений с двумя неизвестными
        
        // angle1Tg = (dataPrevious.y - intersectionY) / (intersectionX - dataPrevious.x)
        // angle2Tg = (intersectionY - dataPrevious.z) / (intersectionX - dataPrevious.x)

        // angle1Tg*(intersectionX - dataPrevious.x) = (dataPrevious.y - intersectionY)
        // angle2Tg*(intersectionX - dataPrevious.x) = (intersectionY - dataPrevious.z)

        // angle1Tg*(intersectionX - dataPrevious.x) + angle2Tg*(intersectionX - dataPrevious.x) = dataPrevious.y - dataPrevious.z
        // angle1Tg*intersectionX - angle1Tg*dataPrevious.x + angle2Tg*intersectionX - angle2Tg*dataPrevious.x = dataPrevious.y - dataPrevious.z
        // intersectionX*(angle1Tg + angle2Tg) - dataPrevious.x*(angle1Tg + angle2Tg) = (dataPrevious.y - dataPrevious.z)
        
        let intersectionX = ((dataPrevious.y - dataPrevious.z) + dataPrevious.x*(angle1Tg + angle2Tg)) / (angle1Tg + angle2Tg)

        // тогда 'intersectionY' выводится из формулы для 'angle2Tg'
        // intersectionY = angle2Tg*(intersectionX - dataPrevious.x) + dataPrevious.z
        
        let intersectionY = angle2Tg*(intersectionX - dataPrevious.x) + dataPrevious.z
      
        currentSegment.push({x: intersectionX, y: intersectionY, z: intersectionY})
        pathData.push({ segment: currentSegment, type: dataPrevious[marker] })

        // Start a new segment from the intersection point
        currentSegment = [{x: intersectionX, y: intersectionY, z: intersectionY}, dataCurrent]
        
      } else {
          currentSegment.push(dataCurrent)
      }
    }
  }
  
  // Add the last segment
  if (currentSegment.length > 0) {
    
    // let typeY = currentSegment.map( o => o.y)
    // typeY = dropNaNs(typeY)
    // typeY = typeY[0]

    // let typeZ = currentSegment.map( o => o.z)
    // typeZ = dropNaNs(typeZ)
    // typeZ = typeZ[0]

    let type = currentSegment.map(o => o[marker]).filter(notNaN)[0]

    pathData.push({ segment: currentSegment, type: type })
    
  }

  return pathData
  
}


function pageContainerGetScroll() {
  // scrollPosition = getElement(pageContainerID).scrollTop
  scrollPosition = document.documentElement.scrollTop
}


function pageContainerSetScroll(scrollPosition, behavior='instant') {
  
  // getElement(pageContainerID).scrollTop = scrollPosition
  // scrollPosition = 0
  document.documentElement.scrollTo({top: scrollPosition, behavior: behavior})
  // scrollPosition = 0
  
}


function pageContainerScrollTop() {
  // getElement(pageContainerID).scrollTo({top: 0, behavior: 'auto'})
  document.documentElement.scrollTo({top: 0, behavior: 'smooth'})
  
}


function d3ResetSVG(ContainerID, resetWidth=true, remove=true) {

  let container = d3.select('#' + ContainerID)

  if (resetWidth) {

    container
      .selectAll('svg')
      .attr('width', 0)
      .attr('height', 0)
    
  }

  if (remove) {

    container
      .selectAll('svg > *')
      .remove()
    
  }
  
}


function pathChangeCoordinates(path, x1, x2, y1, y2,) {

  path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`)

}


function horizontalTocFill(tocID, attributes, scrollBehavior='smooth', removeEventListeners=false) {

  if (removeEventListeners) { elementRemoveEventListeners(tocID) }

  let toc = getElement(tocID)

  clearElement(toc)

  attributes.forEach((obj, i) => {

    let element = document.createElement('div')

    Object.assign(element, {
      className: 'd4d7md',
      textContent: obj['title'],
    })

    element.setAttribute('scrollTo', obj['scrollTo'])

    element.addEventListener('mouseup', (event) => {

      
      let scrollToID = event.target.getAttribute('scrollTo')
      let scrollToElement = getElement(scrollToID)
      
      scrollToElement.scrollIntoView({behavior: scrollBehavior})
      
    })

    toc.appendChild(element)
    
  })
  
}


function themeTogglerReset(toggler) {
  toggler.onclick = ''
}


function d3YScale(type='linear', minmax=[], d3range=[]) {

  let yScale

  if (type == 'linear') { yScale = d3.scaleLinear() }

  yScale
    .domain([minmax[0], minmax[1]])
    .range([d3range[0], d3range[1]])

  return yScale

}


function d3YAxis(type='left', yScale, ytickValues, ytickSize, yickSizeOuter, tickFormatFunction) {

  let yAxis

  if (type == 'left') { yAxis = d3.axisLeft(yScale) }

  if (ytickValues) { yAxis.tickValues(ytickValues) }
  if (ytickSize) { yAxis.tickSize(ytickSize) }
  if (ytickSizeOuter) { yAxis.tickSizeOuter(ytickSizeOuter) }
  if (tickFormatFunction) { yAxis.tickFormat(x => tickFormatFunction(x)) }

  return yAxis
  
}


function d3YElement(main, yAxis, tickID, hideDomain=true) {

  let yLeft = main
    .append("g")
    .attr('name', 'axis-left')

  yLeft
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis)

  if (hideDomain) {
    yLeft.call(g => g.select('.domain').remove())
  }

  if (tickID) {
    yLeft.attr('id', tickID)
  } 

  return yLeft
  
}


function d3XScale(type='linear', minmax=[], d3range=[]) {

  let xScale

  if (type == 'linear') { xScale = d3.scaleLinear() }

  xScale
    .domain([minmax[0], minmax[1]])
    .range([d3range[0], d3range[1]])

  return xScale
  
}


function d3XAxis(type='bottom', xScale, xtickValues, xtickSize, xtickSizeOuter, tickFormatFunction) {

  let xAxis

  if (type == 'bottom') { xAxis = d3.axisBottom(xScale) }

  if (xtickValues) { xAxis.tickValues(xtickValues) }
  if (xtickSize) { xAxis.tickSize(xtickSize) }
  if (xtickSizeOuter) { xAxis.tickSizeOuter(xtickSizeOuter) }
  if (tickFormatFunction) { xAxis.tickFormat(x => tickFormatFunction(x)) }
    
  return xAxis
  
}


function d3XElement(main, xAxis, tickID, hideDomain=true) {

  let xBottom = main
    .append("g")
    .attr('name', 'axis-bottom')
    // .attr('class', 'bottom')
    // .attr('class', 'xaxis')

  xBottom
    .append("g")
    .attr('name', 'ticks')
    .attr('class', 'x axis')
    .attr('id', tickID)
    .call(xAxis)

  if (hideDomain) {
    xBottom.call(g => g.select('.domain').remove())
  }

  return xBottom
  
}


function arraySmooth(vector, variance) {

  function avg (v) {
    return v.reduce((a,b) => a+b, 0)/v.length;
  }
  
  var t_avg = avg(vector)*variance;
  var ret = Array(vector.length);
  for (var i = 0; i < vector.length; i++) {
    (function () {
      var prev = i>0 ? ret[i-1] : vector[i];
      var next = i<vector.length ? vector[i] : vector[i-1];
      ret[i] = avg([t_avg, avg([prev, vector[i], next])]);
    })();
  }
  return ret;
  
}


function arrayInterpolateNaNs(arr) {
  
  // Create a new array to avoid mutating the original
  const result = [...arr];
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    if (Number.isNaN(result[i])) { // Check specifically for NaN
      let leftIndex = -1;
      let rightIndex = -1;

      // Find the nearest non-NaN value to the left
      for (let j = i - 1; j >= 0; j--) {
        if (!Number.isNaN(result[j])) {
          leftIndex = j;
          break;
        }
      }

      // Find the nearest non-NaN value to the right
      for (let j = i + 1; j < len; j++) {
        if (!Number.isNaN(result[j])) {
          rightIndex = j;
          break;
        }
      }

      // If both left and right values are found, interpolate
      if (leftIndex !== -1 && rightIndex !== -1) {
        const leftVal = result[leftIndex];
        const rightVal = result[rightIndex];
        const distance = rightIndex - leftIndex;
        const weight = (i - leftIndex) / distance;
        
        // Linear interpolation formula: V_i = V_left + (V_right - V_left) * weight
        result[i] = leftVal + (rightVal - leftVal) * weight;
      } 
      // Handle edge cases (NaNs at the beginning or end with no neighbors on one side)
      // by leaving them as NaN or using another method (e.g., filling with mean or 0)
      else if (leftIndex !== -1) {
          // Fill with the nearest left value if no right value exists for the remaining NaNs
          result[i] = result[leftIndex];
      } else if (rightIndex !== -1) {
          // Fill with the nearest right value if no left value exists for the remaining NaNs
          result[i] = result[rightIndex];
      }
    }
  }
  
  return result;
  
}


function arrayFillNaNsByMean(arr) {
  
  // Create a new array to avoid mutating the original
  const result = [...arr];
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    if (Number.isNaN(result[i])) { // Check specifically for NaN
      let leftIndex = -1;
      let rightIndex = -1;

      // Find the nearest non-NaN value to the left
      for (let j = i - 1; j >= 0; j--) {
        if (!Number.isNaN(result[j])) {
          leftIndex = j;
          break;
        }
      }

      // Find the nearest non-NaN value to the right
      for (let j = i + 1; j < len; j++) {
        if (!Number.isNaN(result[j])) {
          rightIndex = j;
          break;
        }
      }

      // If both left and right values are found, interpolate
      if (leftIndex !== -1 && rightIndex !== -1) {
        const leftVal = result[leftIndex];
        const rightVal = result[rightIndex];
        const distance = rightIndex - leftIndex;
        const weight = (i - leftIndex) / distance;
        
        // Linear interpolation formula: V_i = V_left + (V_right - V_left) * weight
        // result[i] = leftVal + (rightVal - leftVal);
        result[i] = 0.5 * (leftVal + rightVal)
      } 
      // Handle edge cases (NaNs at the beginning or end with no neighbors on one side)
      // by leaving them as NaN or using another method (e.g., filling with mean or 0)
      else if (leftIndex !== -1) {
          // Fill with the nearest left value if no right value exists for the remaining NaNs
          result[i] = result[leftIndex];
      } else if (rightIndex !== -1) {
          // Fill with the nearest right value if no left value exists for the remaining NaNs
          result[i] = result[rightIndex];
      }
    }
  }
  
  return result;
  
}


function arraySeparateByNaNs(arr) {
  
  return arr.reduce((accumulator, currentValue) => {
    // Check if the currentValue is NaN using Object.is() as isNaN() can be confusing with other non-numeric values
    if (Object.is(currentValue, NaN)) {
      // If it's NaN, start a new empty sub-array in the accumulator
      accumulator.push([]);
    } else {
      // Otherwise, add the value to the last sub-array
      // The accumulator always has at least one sub-array initialized
      accumulator[accumulator.length - 1].push(currentValue);
    }
    return accumulator;
  }, [[]]); // Initialize the accumulator with an empty array
  
}


function resetCheckCollection(checkID) {

  let element = getElement(checkID)
  let icon = element.children[0].children[0]
  
  icon.classList.remove('checked')
  
}


function checkElementClick(elementID, iconID, condition=1) {

  let element = getElement(elementID)
  let icon = getElement(iconID)

  element.setAttribute('condition', condition)
  
  if (condition == 1) {
    icon.classList.add('checked')
  } else {
    icon.classList.remove('checked')
  }
  
}


function fillChartLegend(containerID, driversData) {

  let legend = getElement(containerID)
  legend.innerHTML = ''

  driversData.forEach((obj, i) => {

    let name = obj['Name']
    let color = obj['Color']

    let rectEl = document.createElement('div')
    let nameEl = document.createElement('div')

    Object.assign(rectEl, {
      className: 'nrpa21 rtiuvb'
    })

    rectEl.style.background = color

    Object.assign(nameEl, {
      className: 'i35xe4 jjylp2',
      textContent: name,
    })

    legend.appendChild(rectEl)
    legend.appendChild(nameEl)

    if (i < seasonPaceDrivers.length - 1) {

      let separatorEl = document.createElement('div')

      Object.assign(separatorEl, {
        className: 'mx-125'
      })

      legend.appendChild(separatorEl)
        
    }
    
  })
  
}


function chartsDescCloseAll(listWidthTablesIDs, element) {

  listWidthTablesIDs.forEach((id, i) => {

    let elementLocal = getElement(id)

    let con1 = !elementLocal.id.includes(element.id)
    let con2 = !elementLocal.classList.contains('invisible')

    if (con1 && con2) {
      
      document.body.classList.remove('o-hidden')
      elementLocal.classList.add('invisible')
      
    }
    
  })
  
}


function d3axisDecorAngles(yLeft, yRight, xLength, yLength, xPad, yPad, xtickOuterSize, ytickOuterSize, color) {

  // left

  let leftElement = d3GetElement(yLeft)
  let leftDomain = leftElement.querySelectorAll('path')[0]

  let leftDomainStartCoord = leftDomain.getPointAtLength(0)
  let leftDomainEndCoord = leftDomain.getPointAtLength(leftDomain.getTotalLength())

  // left-bottom

  let pathBottomStartX = leftDomainStartCoord['x'] - ytickOuterSize
  let pathBottomStartY = leftDomainStartCoord['y'] - yLength

  let pathBottomAngleX = pathBottomStartX
  let pathBottomAngleY = leftDomainStartCoord['y'] + xPad + xtickOuterSize

  let pathBottomEndX = pathBottomAngleX + ytickOuterSize + yPad + xLength
  let pathBottomEndY = pathBottomAngleY

  let pathBottomD = `
    M ${pathBottomStartX} ${pathBottomStartY}
    L ${pathBottomAngleX} ${pathBottomAngleY}
    L ${pathBottomEndX} ${pathBottomEndY}
  `
  
  yLeft
    .append('path')
    .attr('d', pathBottomD)
    .style('fill', 'none')
    .style('stroke', color)
    .style('stroke-width', px1_5)

  // left top

  let pathTopStartX = leftDomainEndCoord['x'] - ytickOuterSize
  let pathTopStartY = leftDomainEndCoord['y'] + yLength

  let pathTopAngleX = pathTopStartX
  let pathTopAngleY = leftDomainEndCoord['y'] - xPad - xtickOuterSize

  let pathTopEndX = pathTopAngleX + ytickOuterSize + yPad + xLength
  let pathTopEndY = pathTopAngleY

  let pathTopD = `
    M ${pathTopStartX} ${pathTopStartY}
    L ${pathTopAngleX} ${pathTopAngleY}
    L ${pathTopEndX} ${pathTopEndY}
  `

  yLeft
    .append('path')
    .attr('d', pathTopD)
    .style('fill', 'none')
    .style('stroke', color)
    .style('stroke-width', px1_5)

  // right

  let rightElement = d3GetElement(yRight)
  let rightDomain = rightElement.querySelectorAll('path')[0]

  let rightDomainStartCoord = rightDomain.getPointAtLength(0)
  let rightDomainEndCoord = rightDomain.getPointAtLength(rightDomain.getTotalLength())

  // right-bottom

  let pathRBottomStartX = rightDomainStartCoord['x'] + ytickOuterSize + px1
  let pathRBottomStartY = rightDomainStartCoord['y'] - yLength

  let pathRBottomAngleX = pathRBottomStartX
  let pathRBottomAngleY = rightDomainStartCoord['y'] + xPad + xtickOuterSize

  let pathRBottomEndX = pathRBottomAngleX - ytickOuterSize - yPad - xLength
  let pathRBottomEndY = pathRBottomAngleY

  let pathRBottomD = `
    M ${pathRBottomStartX} ${pathRBottomStartY}
    L ${pathRBottomAngleX} ${pathRBottomAngleY}
    L ${pathRBottomEndX} ${pathRBottomEndY}
  `
  
  yRight
    .append('path')
    .attr('d', pathRBottomD)
    .style('fill', 'none')
    .style('stroke', color)
    .style('stroke-width', px1_5)

  // right top

  let pathRTopStartX = rightDomainEndCoord['x'] + ytickOuterSize + px1
  let pathRTopStartY = rightDomainEndCoord['y'] + yLength

  let pathRTopAngleX = pathRTopStartX
  let pathRTopAngleY = rightDomainEndCoord['y'] - xPad - xtickOuterSize

  let pathRTopEndX = pathRTopAngleX - ytickOuterSize - yPad - xLength
  let pathRTopEndY = pathRTopAngleY

  let pathRTopD = `
    M ${pathRTopStartX} ${pathRTopStartY}
    L ${pathRTopAngleX} ${pathRTopAngleY}
    L ${pathRTopEndX} ${pathRTopEndY}
  `

  yRight
    .append('path')
    .attr('d', pathRTopD)
    .style('fill', 'none')
    .style('stroke', color)
    .style('stroke-width', px1_5)
  
}










function iconBackwardNextIndexDetect1(valuesList, currentValue) {

  let currentIndex = valuesList.indexOf(currentValue)
  let lastIndex = valuesList.indexOf(lastElement(valuesList))

  let previousIndex = currentIndex - 1

  let previousIndexReal

  if (currentIndex == 0) {
    previousIndexReal = lastIndex
  }
  else {
    previousIndexReal = previousIndex
  }

  return previousIndexReal
  
}





function createCustomRectPath(x, y, width, height, tl, tr, br, bl) {

  // Ensure radii do not exceed half of the width or height
  const maxW = 0.5 * width
  const maxH = 0.5 * height
  
  tl = Math.min(tl, maxW, maxH)
  tr = Math.min(tr, maxW, maxH)
  br = Math.min(br, maxW, maxH)
  bl = Math.min(bl, maxW, maxH)

  return [
    `M ${x + tl} ${y}`,                                     // Move to top-left corner start
    `H ${x + width - tr}`,                                  // Top line
    `A ${tr} ${tr} 0 0 1 ${x + width} ${y + tr}`,           // Top-right corner arc
    `V ${y + height - br}`,                                 // Right line
    `A ${br} ${br} 0 0 1 ${x + width - br} ${y + height}`,  // Bottom-right corner arc
    `H ${x + bl}`,                                          // Bottom line
    `A ${bl} ${bl} 0 0 1 ${x} ${y + height - bl}`,          // Bottom-left corner arc
    `V ${y + tl}`,                                          // Left line
    `A ${tl} ${tl} 0 0 1 ${x + tl} ${y}`,                   // Top-left corner arc
    `Z`                                                     // Close path
  ].join(' ')
  
}


function getStyle(el) {
  return getComputedStyle(el)
}


function elementGetScreenCoord(element) {

  let rect = element.getBoundingClientRect()

  let elementScreenX = window.screenX + rect.left;
  let elementScreenY = window.screenY + rect.top;

  return [elementScreenX, elementScreenY]
  
}


function elActive(el) {
  return el.classList.contains('active')
}


function elNotActive(el) {
  return !el.classList.contains('active')
}


function elClicked(el) {
  return el.classList.contains('clicked')
}


function elNotClicked(el) {
  return !el.classList.contains('clicked')
}


function elCheckTag(el, tagName) {
  return (el.tagName.toLowerCase() === tagName)
}


function d3hideTickLineByValue(d, value) {
  return (d == value) ? 'hidden': 'visible'
}


function getMaxWidth(element, container, textContentList, delta=1) {

  let widths = []

  container.style.width = 0
  container.style.width = 'max-content'

  textContentList.forEach((text, i) => {
    
    element.textContent = text
    widths.push(container.offsetWidth)
    
  })

  widths = sortArray(widths)
  widths = Math.ceil(widths[0])

  if (delta) {
    widths += delta
  }

  element.textContent = ''

  return widths
  
}


function getCSSVariable(variable) {
    
  let rootStyles = window.getComputedStyle(document.documentElement)
  let variableValue = rootStyles.getPropertyValue(variable).trim()
  
  return variableValue
  
}


function getCSS() {
  return window.getComputedStyle(document.documentElement)
}


function cssGetVariable(variable, css) {
  
  if (!css) {
    css = window.getComputedStyle(document.documentElement)
  }
  
  return css.getPropertyValue(variable).trim()
  
}


function CSSGetProperty(variable, css) {
  
  if (!css) {
    css = window.getComputedStyle(document.documentElement)
  }
  
  return css.getPropertyValue(variable).trim()
  
}


function boxShadowFromColor(colorHEX, x1=0, x2=0, x3=0.125) {
  return `${x1}rem ${x2}rem ${x3}rem ${colorHEX}`
}


function descCloseAllExcept(element, descsBodiesIDsList) {

  descsBodiesIDsList.forEach((id, i) => {

    let elementLocal = getElement(id)

    let con1 = !elementLocal.id.includes(element.id)
    let con2 = !elementLocal.classList.contains('invisible')

    if (con1 && con2) {
      
      document.body.classList.remove('o-hidden')
      elementLocal.classList.add('invisible')
      
    }
    
  })
  
}


function downloadDivAsSVG(divId, filename = "image.svg") {
  
    // 1. Get the target div
    let div = document.getElementById(divId)

    if (!div) {
        console.error("Div not found!")
        return;
    }

    // 2. Clone the node to avoid mutating the original
    let clonedDiv = div.cloneNode(true)

    // 4. Serialize to XML
    let serializer = new XMLSerializer()
    let source = serializer.serializeToString(clonedDiv)

    // 5. Add proper SVG XML declarations
    let svgString = '<?xml version="1.0" standalone="no"?>\r\n' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://w3.org">\r\n' +
        source;

    // 6. Create a Blob and trigger the download
    let blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
    let url = URL.createObjectURL(blob)
    
    let downloadLink = document.createElement("a")
    downloadLink.href = url
    downloadLink.download = filename
    document.body.appendChild(downloadLink)
    downloadLink.click()
    
    // Clean up
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(url)
  
}


async function downloadDivAsPNG(divId, filename = 'image.png') {
    
  let element = document.getElementById(divId);
  if (!element) return;

  let width = element.offsetWidth;
  let height = element.offsetHeight;

  let scale = window.devicePixelRatio || 1;

  // 1. Clone element and inline its styles
  let clone = element.cloneNode(true);
  // inlineStyles(element, clone);

  // 2. Format HTML into strictly well-formed XML
  let xmlSerializer = new XMLSerializer();
  let htmlString = xmlSerializer.serializeToString(clone);
  
  // Quick-fix for common non-closed HTML elements to ensure valid XML
  htmlString = htmlString
    .replace(/<br>(?!<\/br>)/gi, '<br />')
    .replace(/<img([^>]+)>/gi, '<img$1 />')
    .replace(/<input([^>]+)>/gi, '<input$1 />');

  // 3. Create the XML-safe SVG envelope
  let svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${htmlString}
        </div>
      </foreignObject>
    </svg>
  `;

  // 4. Force safe Base64 URL compilation to kickstart browser parser
  let base64Svg = btoa(unescape(encodeURIComponent(svgString)));
  let imgSrc = `data:image/svg+xml;base64,${base64Svg}`;
  
  let img = new Image();
  img.width = width;
  img.height = height;
  
  // Fallback diagnostic listener if it still fails
  img.onerror = (err) => {
    console.error("SVG Image failed to parse. Your HTML likely violates strict XML rules.", err);
  };
  
  img.onload = () => {
    
    let canvas = document.createElement('canvas');
    canvas.width = scale * width;
    canvas.height = scale * height;
    
    let ctx = canvas.getContext('2d')
    
    ctx.scale(scale, scale)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    
    ctx.drawImage(img, 0, 0);

    let pngUrl = canvas.toDataURL('image/png');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    document.body.removeChild(downloadLink);
    
  };

  img.src = imgSrc;
  
}


function downloadButtonClose(downloadID, elementID) {

  if (!elementID.includes(downloadID)) {

    let downloadButton = getElement(downloadID)
  
    let menuID = downloadID + '-menu'
    let menu = getElement(menuID)
  
    let imgID = downloadID + '-img'
    let img = getElement(imgID)
  
    downloadButton.classList.remove('active')
    menu.classList.add('invisible')
    
  }

  
  
}


function downloadButtonMouseUp(elementID) {

  let element = getElement(elementID)

  let menuID = elementID + '-menu'
  let menu = getElement(menuID)

  element.classList.toggle('active')
  menu.classList.toggle('invisible')
  
}


function downloadChartItemMouseUp(itemID, event) {

  event.stopPropagation()

  let item = getElement(itemID)

  let elID = item.getAttribute('download_id')
  let el = getElement(elID)

  let filename = item.getAttribute('download_name')
  let type = item.getAttribute('download_type')

  let elementID = itemID.split('-')[0]
  let element = getElement(elementID)

  let menuID = elementID + '-menu'
  let menu = getElement(menuID)

  element.classList.remove('active')
  menu.classList.add('invisible')

  if (type == 'svg') {
    downloadD3SvgAsSVG(elID, filename)
  } else if (type == 'png') {
    downloadD3SvgAsPNG(elID, filename)
  }
  
}


function downloadD3SvgAsSVG(svgID, name='image.png') {

  const xmlns = "http://www.w3.org/2000/xmlns/"
  const xlinkns = "http://www.w3.org/1999/xlink"
  const svgns = "http://www.w3.org/2000/svg"

  function serialize(svg) {
    
    svg = svg.cloneNode(true)
    
    const fragment = window.location.href + "#"
    const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT)
    
    while (walker.nextNode()) {
      for (const attr of walker.currentNode.attributes) {
        if (attr.value.includes(fragment)) {
          attr.value = attr.value.replace(fragment, "#")
        }
      }
    }
    
    svg.setAttributeNS(xmlns, "xmlns", svgns)
    svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns)
    
    const serializer = new window.XMLSerializer;
    const string = serializer.serializeToString(svg)
    
    return new Blob([string], {type: "image/svg+xml"})
    
  }
  
  let svg = getElement(svgID)
  let blob = serialize(svg)
  let url = URL.createObjectURL(blob)

  let downloadElement = document.createElement('a')
  
  downloadElement.href = url
  downloadElement.download = `${name}.svg`

  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  delete downloadElement
  
}


function downloadD3SvgAsPNG(svgID, filename='image.png') {

  let svgSelector = '#' + svgID

  // 1. Target the SVG element created by D3
  const svgElement = document.querySelector(svgSelector);
  if (!svgElement) return console.error('SVG element not found');

  // 2. Serialize the SVG DOM element into a string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  
  // 3. Create a Blob from the SVG string
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  // 4. Get SVG dimensions
  const bbox = svgElement.getBoundingClientRect();
  const width = bbox.width || 800; // Fallback if width is 0
  const height = bbox.height || 600;

  // 5. Load the SVG Blob into a temporary Image object
  const img = new Image();
  img.onload = function() {
    // 6. Setup an off-screen Canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    // Optional: Fill background with white (SVGs default to transparent)
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);

    // 7. Draw the image onto the canvas
    context.drawImage(img, 0, 0, width, height);

    // 8. Convert Canvas to PNG URL and trigger the download
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = filename;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // 9. Clean up memory
    URL.revokeObjectURL(url);
  };

  img.src = url;
}


function svgRectPath(x, y, widthPath, heightPath, rx, ry = rx) {
  
  // Clamp radii to avoid path self-intersection
  const maxR = 0.5 * Math.min(widthPath, heightPath)
  const rX = Math.min(rx, maxR);
  const rY = Math.min(ry, maxR);

  return [
    `M ${x + rX} ${y}`,
    `h ${widthPath - rX * 2}`,
    `a ${rX} ${rY} 0 0 1 ${rX} ${rY}`,
    `v ${heightPath - rY * 2}`,
    `a ${rX} ${rY} 0 0 1 ${-rX} ${rY}`,
    `h ${(widthPath - rX * 2) * -1}`,
    `a ${rX} ${rY} 0 0 1 ${-rX} ${-rY}`,
    `v ${(heightPath - rY * 2) * -1}`,
    `a ${rX} ${rY} 0 0 1 ${rX} ${-rY}`,
    `Z`
  ].join(" ");
  
}


function globalHideBlurScreen() {

  let blurScreen = getElement(blurScreenID)
  blurScreen.classList.add('hidden')
  
}


// function chartDescOpen(element) {

//   let ID = element.id

//   let tableID = ID + '-table'
//   let contentID = ID + '-content'

//   let table = getElement(tableID)
//   let content = getElement(contentID)
//   let blurScreen = getElement(blurScreenID)

//   table.classList.toggle('invisible')
//   document.body.classList.toggle('o-hidden')
//   content.scrollTo(0, 0)
//   blurScreen.classList.toggle('hidden')
  
// }


function chartDescOpen(descID) {

  let tableID = descID + '-table'
  let contentID = descID + '-content'

  let table = getElement(tableID)
  let content = getElement(contentID)
  let blurScreen = getElement(blurScreenID)

  table.classList.toggle('invisible')
  content.scrollTo(0, 0)
  blurScreen.classList.toggle('hidden')

  document.body.classList.toggle('o-hidden')
  
}


function chartDescClose(descID) {

  let tableID = descID + '-table'
  let contentID = descID + '-content'

  let table = getElement(tableID)
  let content = getElement(contentID)
  let blurScreen = getElement(blurScreenID)

  table.classList.add('invisible')
  content.scrollTo(0, 0)
  blurScreen.classList.add('hidden')

  document.body.classList.remove('o-hidden')
  
}


function infoIconMouseUp(element) {
  chartDescOpen(element.id)
}


function descCloseIconMouseUp(element) {

  let descID = element.getAttribute('desc_id')
  chartDescClose(descID)
  
}


function downloadItemFill(item, filename='chart') {
  item.setAttribute('download_name', filename)  
}


function dropdownAddScroll(dropdownMenu, maxItems) {

  if (dropdownMenu.childElementCount > maxItems) {

    // px32 - min-height of dropdown-item
    let maxHeight = maxItems*px32

    dropdownMenu.style.paddingRight = '0.25rem'
    dropdownMenu.style.maxHeight = `${maxHeight}px`
    dropdownMenu.style.overflowY = 'scroll'
    
  }

}


function dropdownMenuFill(attributesDict) {

  let dropdownID = attributesDict['dropdownID']
  let items = attributesDict['items']
  let attributes = attributesDict['attributes']

  // for navigation icons
  let indexes = attributesDict['indexes']
  
  let width = attributesDict['width']
  let titles = attributesDict['titles']
  let maxItems = attributesDict['maxItems'] ?? 10
  let disableList = attributesDict['disableList']
  let border = attributesDict['border']
  let addSeparatorAfterIdx = attributesDict['addSeparatorAfterIdx'] ?? []
  let itemClass = attributesDict['itemClass'] ?? 'dropdown-item'
  let itemID = attributesDict['itemID'] ?? dropdownID + '-item-'

  let dropdown = getElement(dropdownID)
  let title = getElement(dropdownID + '-title')
  let menu = getElement(dropdownID + '-menu')

  let titleValue = copyObject(title.textContent)

  let widths

  let attrKeys
  let attrValues

  menu.textContent = ''
  dropdown.style.width = 'max-content'

  if (width) {
    
    widths = []
    
  }

  if (attributes) {
    attrKeys = Object.keys(attributes)
    attrValues = []
  }

  // add items
  items.forEach((item, i) => {

    let li = document.createElement('li')
    
    li = Object.assign(li, {className: itemClass, id: itemID + String(i)})
    
    if (disableList) {
      if (disableList.includes(item)) {
        li.classList.add('disabled')
      }
    }
    
    li.appendChild(document.createTextNode(item))
    menu.appendChild(li)

    // if need to save index
    if (indexes) {
      indexes.push(i)
    }

    // add separator
    if (addSeparatorAfterIdx.includes(i)) {

      let separator = document.createElement('div')
      separator = Object.assign(separator, {className: 'dropdown-separator', id: ''})
      menu.appendChild(separator)
      
    }

    // if constant width - collect dropdown widths with every item as title
    if (width) {

      title.textContent = item
      
      let dropdownSizes = getSizes(getElement(dropdownID))
      let widthLocal = Math.ceil(dropdownSizes.width)
      
      widths.push(widthLocal)

    }

    // if attributes
    if (attributes) {
      
      attrKeys.forEach((attribute, j) => {
    
        if (attribute == 'index') {
          li.setAttribute('index', i)
        } else if (attributes[attribute] == 'id') {
          li.setAttribute(attribute, i)
        } else if (isString(attributes[attribute])) {
          
          li.setAttribute(attribute, attributes[attribute])
        } else {
          li.setAttribute(attribute, attributes[attribute][i])
        }
        
      })
      
    }
   
  })

  // if constant width
  if (width) {

    // check default titles
    if (titles) {

      if (Array.isArray(titles)) {
        
        for (let titleLocal of titles) {
          
          title.textContent = titleLocal
          let dropdownSizes = getSizes(getElement(dropdownID))
          let widthLocal = Math.ceil(dropdownSizes.width)
          widths.push(widthLocal)
          
        }
        
      } else {

        title.textContent = titles
        let dropdownSizes = getSizes(getElement(dropdownID))
        let widthLocal = Math.ceil(dropdownSizes.width)
        widths.push(widthLocal)
        
      }
      
    }

    // check default title
    title.textContent = titleValue

    let dropdownSizes = getSizes(getElement(dropdownID))
    let widthLocal = Math.ceil(dropdownSizes.width)
    
    widths.push(widthLocal)

    // sort widths
    widths = sortArray(widths)

    // get max possible width in REM
    let maxWidth = widths[0]
    maxWidth = convertPixelsToRem(maxWidth)

    // set width of dropdown
    dropdown.style.width = `${maxWidth}rem`
      
  }

  if (border) {
    
    let dropdownContainer = getElement(dropdownID + '-container')
    let dropdownTitleContainer = getElement(dropdownID + '-title-container')

    let dropdownWidth = convertPixelsToRem(dropdown.offsetWidth)
    let dropdownHeight = convertPixelsToRem(dropdown.offsetHeight)

    dropdownContainer.style.width = `${dropdownWidth}rem`
    dropdownContainer.style.height = `${dropdownHeight}rem`

    dropdownTitleContainer.style.height = `${dropdownHeight - 0.125}rem`

  }

  // add scroll if necessarry
  dropdownAddScroll(menu, maxItems)

}


function dropdownToggle(dropdown, event) {

  if (!event.target.classList.contains('disabled')) {

    let dropdownID = dropdown.id

    let dropdownMenuContainerID = dropdownID + '-menu-container'
    let dropdownMenuID = dropdownID + '-menu'
    
    let dropdownMenuContainer = getElement(dropdownMenuContainerID)
    let dropdownMenu = getElement(dropdownMenuID)
  
    let caretID = dropdownID + '-caret'
    let caret = getElement(caretID)
  
    dropdownMenuContainer.classList.toggle('closed')
    dropdownMenu.classList.toggle('closed')
    caret.classList.toggle('dropdown-caret-up')

    dropdownMenu.scrollTop = 0
    
  }

}


function dropdownClose(dropdownID, elementID, element) {

  if ((!elementID.includes(dropdownID)) & (!element.classList.contains('dropdown-separator'))) {

    let dropdownMenuContainerID = dropdownID + '-menu-container'
    let dropdownMenuID = dropdownID + '-menu'
    
    let dropdownMenuContainer = getElement(dropdownMenuContainerID)
    let dropdownMenu = getElement(dropdownMenuID)
  
    let caretID = dropdownID + '-caret'
    let caret = getElement(caretID)
  
    dropdownMenuContainer.classList.add('closed')
    dropdownMenu.classList.add('closed')
    caret.classList.remove('dropdown-caret-up')

    dropdownMenu.scrollTop = 0

  } 
  
}


function dropdownNavNextIndex(currentIndex, indexes, kind) {
  
  let nextIndex
  let maxIndex = lastElement(indexes)

  if (isNULL(currentIndex)) {

    if (kind == 'f') {
      nextIndex = 0
    } else if (kind == 'b') {
      if (isNULL(maxIndex)) {
        nextIndex = 0
      } else {
        nextIndex = maxIndex
      }
    }

  } else {

    if (kind == 'f') {
      nextIndex = currentIndex + 1
      if (nextIndex > maxIndex) {
        nextIndex = 0
      }
    } else if (kind == 'b') {
      nextIndex = currentIndex - 1
      if (nextIndex < 0) {
        nextIndex = maxIndex
      }
    }
    
  }

  return nextIndex
  
}


function dropdownNavItemGetID(element, indexes) {

  let kind = element.getAttribute('nav_kind')
  let dropdownID = element.getAttribute('dropdown_id')
  let title = getElement(dropdownID + '-title')

  let currentIndex

  let attributeValue = title.getAttribute('index')

  if (isNULL(attributeValue)) {
    currentIndex = null
  } else {
    currentIndex = Number(attributeValue)
  }

  let nextIndex = dropdownNavNextIndex(currentIndex, indexes, kind)
  let itemID = dropdownID + '-item-' + nextIndex

  return itemID
  
}


function svgElementMoveAhead(element) {
  element.parentElement.appendChild(element)
}


function svgElementMoveBehind(element) {
  element.parentElement.prepend(element)
}


function tableGetTeam(id) {
  return teams.filter(o => o['TeamID'] == id)[0]['Team']
}


function tableGetFullName(id) {
  return drivers.filter(o => o['DriverID'] == id)[0]['FullName']
}


function tableGetColor(seasonID, teamID, colorType='') {

  let colorsFiltered = colors.filter(o => (o['SeasonID'] == seasonID) && (o['TeamID'] == teamID))[0]
  let colorName = 'Color' + colorType

  return colorsFiltered[colorName]
  
}


function colorCheck(color, oppositeColors, driverData) {

  // color - color to check
  // opposite colors - colors, that already been used (if check one opposite color - enter just it)
  // driverData - dict with drivers colors

  let colors
  let result = '#505050'

  if ((!checkIfArray(oppositeColors)) && (color != oppositeColors)) {

    result = color
    
  } else {

    if (!checkIfArray(oppositeColors)) {
      colors = oppositeColors
    } else {
      colors = [oppositeColors]
    }

    if (oppositeColors.length > 0) {

      let alternativeColors = ['Color1', 'Color2', 'Color3', 'Color4']

      let newColorName = alternativeColors.find(o => !oppositeColors.includes(driverData[o]))
      result = driverData[newColorName]
      
    } else {
      result = color
    }
        
  }

  return result
  
}


function setColor1(color, seasonID, colors) {
  return colors.filter(o => (o['Color'] == color) && (o['SeasonID'] == seasonID))[0]['Color1']
}


function getValueByCondition(column, columnCondition, valueCondition, data) {

  let result = data.filter(o => o[columnCondition] == valueCondition)
  if (result.length) { result = result[0][column] } else { result = null }

  return result
    
}
























