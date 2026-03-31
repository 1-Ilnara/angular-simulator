function sum(a:number,b:number):number {
    return a + b ;
}

type TUploadStatus = "loading" | "success" | "error";
let uploadStatus: TUploadStatus = "loading";

type TTextFormat = 'uppercase' | 'lowercase' | 'capitalize';
let textFormat: TTextFormat = 'uppercase';

interface IUser {
    id: number;
    name: string;
    email?: string; 
}

interface IEmployee extends IUser {
    salary: number;
    position: string;
}

function formatText(text: string, format: TTextFormat): string {
    if (format === 'uppercase') {
        return text.toUpperCase();
    } 
    if (format === 'lowercase') {
        return text.toLowerCase();
    }
    if (format === 'capitalize') {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    return text;
}

console.log(formatText('привет МИР', 'capitalize')); 
console.log(formatText('привет', 'uppercase'));     

function removeChar(text: string, char: string): string {

    return text.replaceAll(char, '');
}


console.log(removeChar("экскаватор", "а")); 

const users: IUser[] = [
    { id: 1, name: 'Anna', email: 'anna@mail.com' },
    { id: 2, name: 'Ivan' }, 
    { id: 3, name: 'Ivan', email: 'ivan2@mail.com' }
];

const filteredUsers = users.filter((user: IUser) => user.name === 'Ivan');

console.log(filteredUsers); // В консоли останется только массив из двух Иванов