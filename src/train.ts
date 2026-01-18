






//H-TASK

//Shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib,
// faqat positive qiymatlarni olib string holatda return qilsin.
//  MASALAN: getPositive([1, -4, 2]) return qiladi "12".

function getPositive(arr: number[]): string {
    const positives = arr.filter(num => num > 0);
    const strArray = positives.map(num => num.toString());
    return strArray.join('');
}+    

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