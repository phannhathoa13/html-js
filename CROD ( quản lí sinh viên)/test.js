const students = [
    {
        id: 1,
        name: 'Nguyen Van A',
        age: 20,
        gender: 'Male',
        scores: {
            math: 8,
            literature: 7,
            english: 9,
        },
        hobbies: ['football', 'gaming', 'coding'],
        address: {
            city: 'Hanoi',
            district: 'Cau Giay',
        },
        isGraduated: false,
    },
    {
        id: 2,
        name: 'Tran Thi B',
        age: 22,
        gender: 'Female',
        scores: {
            math: 6,
            literature: 9,
            english: 8,
        },
        hobbies: ['reading', 'swimming'],
        address: {
            city: 'Ho Chi Minh',
            district: 'District 1',
        },
        isGraduated: true,
    },
    {
        id: 3,
        name: 'Le Van C',
        age: 19,
        gender: 'Male',
        scores: {
            math: 10,
            literature: 6,
            english: 7,
        },
        hobbies: ['chess', 'coding'],
        address: {
            city: 'Da Nang',
            district: 'Hai Chau',
        },
        isGraduated: false,
    },
    {
        id: 4,
        name: 'Pham Thi D',
        age: 21,
        gender: 'Female',
        scores: {
            math: 7,
            literature: 8,
            english: 9,
        },
        hobbies: ['yoga', 'traveling', 'gaming'],
        address: {
            city: 'Can Tho',
            district: 'Ninh Kieu',
        },
        isGraduated: true,
    },
];


// loc ra sinh vien co so thich "coding"
// console.log(checkHobbiesCodingInList());
function checkHobbiesCodingInList() {
    const hobbiesCoding = students.filter((student) => student.hobbies.some((hobby) => hobby == 'coding'));
    return hobbiesCoding;
}
// tim sinh vien song o thanh pho "hanoi"
// console.log(checkStudentLiveOnHanoi());
function checkStudentLiveOnHanoi() {
    const studentLiveOnHaNoi = students.filter((student) => student.address.city == 'Hanoi');
    return studentLiveOnHaNoi;
}
// kiem tra xem co sinh vien nao chua tot nghiep va co diem toan lon hon 8
// console.log(checkStudentIsGraduatedAndMathScoresOVer8());
function checkStudentIsGraduatedAndMathScoresOVer8() {
    const StudentIsGraduated = students
        .filter((student) => student.isGraduated == false)
        .filter((student) => student.scores.math > 8);
    return StudentIsGraduated
}
// tinh tong so sinh vien da tot nghiep
// console.log(totalStudentIsGraduted());
function totalStudentIsGraduted() {
    const StudentIsGraduated = students.filter((student) => student.isGraduated == true).length;
    return StudentIsGraduated
}
//tang tuoi cua tat ca sinh vien them 1 nam
// console.log(IncreaseAgeEveryStudent1Year());
function IncreaseAgeEveryStudent1Year() {
    const increaseAge = students
        .map((students) => students.age = students.age + 1)
    console.log(students);
    return increaseAge;
}

// tinh diem trung moi sinh vien
const avg = students.reduce((max, student) => {
    const math = student.scores.math;
    const literature = student.scores.literature;
    const english = student.scores.english;
    const avg = (math + literature + english) / 3
    return max < avg ? avg : max
})
console.log(avg);



