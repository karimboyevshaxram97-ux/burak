/**
M-TASK

Shunday function yozing, u raqamlardan tashkil topgan array qabul qilsin va array ichidagi har bir raqam uchun raqamni ozi 
va hamda osha raqamni kvadratidan tashkil topgan object hosil qilib, hosil bolgan objectlarni array ichida qaytarsin.
 MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}].
 */


function getSquareNumbers(arr: number[]): { number: number; square: number }[] {
  return arr.map(num => ({
    number: num,
    square: num * num
  }));
}

console.log(getSquareNumbers([1, 2, 3]));

//================================================================================================

/**
 L-TASK
Shunday function yozing, u string qabul qilsin va string ichidagi hamma sozlarni chappasiga yozib 
va sozlar ketma-ketligini buzmasdan stringni qaytarsin. MASALAN: reverseSentence("we like coding!")
 return "ew ekil gnidoc".



function reverseSentence(str: string): string {
  return str
    .split(" ") // stringni so‘zlarga bo‘lib olamiz
    .map((word: string) => word.split("").reverse().join("")) // har bir so‘zni chappasiga yozamiz
    .join(" "); // so‘zlarni qayta birlashtiramiz
}

// Test
console.log(reverseSentence("we like coding!"));
// Natija: "ew ekil gnidoc!"
*/
//===========================================================================

/*

function countVowels(str: string): number {
  const matches = str.match(/[aeiou]/gi);            // unli harflarni topadi (g - global, i - case-insensitive)
  return matches ? matches.length : 0;
}

// Misollar:
console.log(countVowels("string"));      // Natija: 1
console.log(countVowels("education"));   // Natija: 5
console.log(countVowels("JavaScript"));  // Natija: 3
*/


/**
 * 
 J-TASK

Shunday function yozing, u string qabul qilsin va string ichidagi eng uzun sozni qaytarsin.
 MASALAN: findLongestWord("I come from Uzbekistan") return "Uzbekistan".

 

function findLongestWord(sentence: string): string {
  const words = sentence.split(" ");
  let longest = "";

  for (const word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }

  return longest;
}

console.log(findLongestWord("I come from Uzbekistan")); // Natija: "Uzbekistan"
*/

//====================================================================
/* Project Standards:
 - Logging standards
 - Naming standards:
   - function, method, variable: camelCase
   - class: PascalCase
   - folder: kebab-case
   - css: snake_case
   -error handling
*/
 /**
  traditional api
  rest api
  graphql api
  */


//====================================================================

//I-TASK
 
//Shunday function yozing, u parametridagi array ichida eng kop takrorlangan
 //raqamni topib qaytarsin. MASALAN: majorityElement([1,2,3,4,5,4,3,4]) return 4.
/*
function majorityElement(arr: number[]): number {
  const countMap: { [key: number]: number } = {};

  // Har bir raqamni sanaladi
  for (const num of arr) {
    countMap[num] = (countMap[num] || 0) + 1;
  }

  // Eng ko‘p takrorlangan raqamni topiladi
  let maxCount = 0;
  let majority = arr[0];

  for (const num in countMap) {
    if (countMap[+num] > maxCount) {
      maxCount = countMap[+num];
      majority = +num;
    }
  }

  return majority;
}

console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4])); 

*/

//=======================================================================================

//H-TASK

//Shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib,
// faqat positive qiymatlarni olib string holatda return qilsin.
//  MASALAN: getPositive([1, -4, 2]) return qiladi "12".
/*
function getPositive(arr: number[]): string {
    const positives = arr.filter(num => num > 0);
    const strArray = positives.map(num => num.toString());
    return strArray.join('');
}+    
*/
//=====================================================================================

//G-TASK
//Shunday function tuzingki unga integerlardan iborat array pass 
 //bolsin va function bizga osha arrayning eng katta qiymatiga
 //tegishli birinchi indexni qaytarsin. 
 //MASALAN: getHighestIndex([5, 21, 12, 21, 8]) return qiladi
 // 1 sonini.


 /*
 function getHighestIndex(arr: number[]): number {
  let max = arr[0];
  let index = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      index = i;
    }
  }
 
  return index;
}

console.log(getHighestIndex([5, 21, 12, 21, 8]));
*/