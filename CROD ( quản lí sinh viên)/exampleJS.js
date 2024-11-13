// const numbers = [4, 11, 42, 7, 19, 20];

// // Yêu cầu: Tạo mảng `greaterThanTen` chứa các số lớn hơn 10
// const greaterThanTen = numbers.filter((numbers) => numbers > 10)

// console.log(greaterThanTen); // Kết quả mong muốn: [11, 42, 19, 20]

// const phrases = ["How are you?", "Hello!", "What time is it?", "Good morning", "Are you ready?"];

// // Yêu cầu: Tạo mảng `questions` chứa các chuỗi có dấu "?"
// const questtions = phrases.filter((element) => element.includes("?"))
// console.log(questtions); // Kết quả mong muốn: ["How are you?", "What time is it?", "Are you ready?"]

// const items = ["catnip", "dog bone", "cat food", "bird seed", "fish tank"];
// const catItems = items.filter((element) => element.includes("cat"))
// // Yêu cầu: Tạo mảng `catItems` chứa các phần tử có từ "cat"
// console.log(catItems); // Kết quả mong muốn: ["catnip", "cat food"]

// const products = ["milk", "bread", "butter", "cheese", "eggs", "apples"];
// const shoppingList = ["bread", "cheese", "apples", "coffee"];
// const neededItems = products.filter((element) => shoppingList.includes(element))
// // Yêu cầu: Tạo mảng `neededItems` chứa các phần tử trong `products` có trong `shoppingList`
// console.log(neededItems); // Kết quả mong muốn: ["bread", "cheese", "apples"]

const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15];
function isPrime(numbers) {
    return (numbers % 2 == 1)
}
// Yêu cầu: Tạo mảng `primeNumbers` chứa các số lẻ
// Gợi ý: Viết hàm `isPrime` để kiểm tra một số lẻ
// Sau đó dùng `.filter()` để lọc

const primeNumbers = numbers.filter(isPrime)
console.log(primeNumbers); // Kết quả mong muốn: [3,5,7,9,11,13,15]
