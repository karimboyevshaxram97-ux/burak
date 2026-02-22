/*
W-TASK

Shunday function yozing, uni array va number parametrlari bolsin. 
Function arrayni numberda berilgan uzunlikda kesib bolaklarga ajratilgan array holatida qaytarsin. 
MASALAN: chunkArray([1,2,3,4,5,6,7,8,9,10], 3) 
return [[1,2,3], [4,5,6], [7,8,9], [10]].
*/

function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("size 0 dan katta bo‘lishi kerak");
  }

  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

const nums = chunkArray([1,2,3,4,5,6,7,8,9,10], 3);
console.log(nums);

//===============================================================================

/*
V-TASK

Shunday function yozing, uni string parametri bolsin va stringdagi harf va 
u harf necha marta takrorlangani sonidan tashkil topgan object qaytarsin. 
MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}.


function countChars(str: string): Record<string, number> {
  const result: Record<string, number> = {};

  for (const char of str) {
    result[char] = (result[char] || 0) + 1;
  }

  return result;
}


console.log(countChars("hello"));
*/



//==============================================================================
/*
U-TASK

Shunday function yozing, uni number parametri bolsin va 0 dan berilgan
 parametrgacha bolgan oraliqdagi faqat toq sonlar nechtaligini return qilsin.
 MASALAN: sumOdds(9) return 4; sumOdds(11) return 5.


function sumOdds(n: number): number {
  let count = 0;

  for (let i = 1; i <= n; i += 2) {
    count++;
  }

  return count;
}

// Test
console.log(sumOdds(9));   // 4
console.log(sumOdds(11));  // 5
*/

//===============================================================================
/**
 T-TASK

Shunday function yozing, u sonlardan tashkil topgan 2 ta array qabul  
qilsin va ikkala arraydagi sonlarni tartiblab bir arrayda qaytarsin.
 MASALAN: mergeSortedArrays([0,3,4,31], [4,6,30]) return [0,3,4,4,6,30,31].

 

function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
  return arr1.concat(arr2).sort((a, b) => a - b);
}

console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));
*/

//==========================================================================
/*
S-TASK

Shunday function yozing, u numberlardan tashkil topgan array qabul qilsin va
 osha numberlar orasidagi tushib qolgan sonni topib uni return qilsin.
  MASALAN: missingNumber([3, 0, 1]) return 2.


function missingNumber(nums: number[]): number {
  const n = nums.length;
  
 // 0 dan n gacha bo'lgan sonlar yig'indisi: n * (n + 1) / 2
  const expectedSum = (n * (n + 1)) / 2;
  
  // Array'dagi sonlar yig'indisi
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  
  // Farq = tushib qolgan son
  return expectedSum - actualSum;
}

// Test
console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1])); // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8
console.log(missingNumber([0])); // 1
*/

//===============================================================================
/*
R-TASK

Shunday function yozing, u string parametrga ega bolsin. String "1+2" 
holatda pass qilinganda string ichidagi sonlar
 yigindisini number holatda qaytarsin. MASALAN: calculate("1+3") return 4.


function calculate(str: string): number {
  return str
    .split('+')             
    .map((num) => Number(num))
    .reduce((sum, cur) => sum + cur, 0);
}

console.log(calculate("1+3"));     
console.log(calculate("10+5"));     
console.log(calculate("7+8+2"));   
console.log(calculate("100+200"));  

*/
//==========================================================================
/*
Q-TASK

Shunday function yozing, u 2 ta parametrgga ega bolib birinchisi object,
 ikkinchisi string. Agar string parametr objectni propertysi bolsa true 
 bolmasa false qaytarsin. MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") 
 return true; hasProperty({name: "BMW", model: "M3"}, "year") return false.


function hasProperty(obj: Record<string, unknown>, prop: string): boolean {
  return obj.hasOwnProperty(prop);
}


console.log(hasProperty({name: "BMW", model: "M3"}, "model")); 
console.log(hasProperty({name: "BMW", model: "M3"}, "year"));  
*/
//=======================================================================
/*


function objectToArray(obj: Record<string, any>): [string, any][] {
    return Object.entries(obj);
}

// Test
console.log(objectToArray({a: 10, b: 20}));



/*
O-TASK

Shunday function yozing, u har xil valuelardan iborat array qabul qilsin
 va array ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin. 
MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45.

function calculateSumOfNumbers(arr: unknown[]): number {
  let sum = 0;

  for (const item of arr) {
    if (typeof item === "number") {
      sum += item;
    } else if (typeof item === "string" && !isNaN(Number(item))) {
      sum += Number(item);
    } else if (typeof item === "object" && item !== null && "son" in item) {
      const val = (item as { son: unknown }).son;
      if (typeof val === "number") {
        sum += val;
      }
    }
  }

  return sum;
}

const result = calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]);
console.log("Natija:", result);
*/



//========================================================================

/*
N-TASK

Shunday function yozing, u string qabul qilsin va string palindrom yani togri oqilganda ham,
 orqasidan oqilganda ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin. 
MASALAN: palindromCheck("dad") return true; palindromCheck("son") return false.



function palindromCheck(str: string): boolean {
  
  const cleaned = str.toLowerCase().replace(/\s+/g, "");        // Stringni kichik harflarga o‘tkazamiz va bo‘sh joylarni olib tashlaymiz

  
  const reversed = cleaned.split("").reverse().join("");       // Stringni teskarisini hosil qilamiz

  return cleaned === reversed;                               // Palindromligini tekshiramiz
}

// Test misollar
console.log(palindromCheck("dad")); // true
console.log(palindromCheck("son")); // false
console.log(palindromCheck("level")); // true
console.log(palindromCheck("hello")); // false
console.log(palindromCheck("nurses run")); // true (bo‘sh joylarni olib tashlaganligi uchun)
*/
//===============================================================================
/**
M-TASK

Shunday function yozing, u raqamlardan tashkil topgan array qabul qilsin va array ichidagi har bir raqam uchun raqamni ozi 
va hamda osha raqamni kvadratidan tashkil topgan object hosil qilib, hosil bolgan objectlarni array ichida qaytarsin.
 MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}].
 


function getSquareNumbers(arr: number[]): { number: number; square: number }[] {
  return arr.map(num => ({
    number: num,
    square: num * num
  }));
}

console.log(getSquareNumbers([1, 2, 3]));
*/
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

 /*
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