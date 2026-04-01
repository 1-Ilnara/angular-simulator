function sum(a: number, b: number): number {
    return a + b;
}

type UploadStatus = "loading" | "success" | "error";
let uploadStatus: UploadStatus = "loading";

type TextFormat = 'uppercase' | 'lowercase' | 'capitalize';
let textFormat: TextFormat = 'uppercase';

interface IUser {
    id: number;
    name: string;
    email?: string; 
}

interface IEmployee extends IUser {
    salary: number;
    position: string;
}

function formatText(text: string, format: TextFormat): string {
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

function removeChar(text: string, char: string): string {
    return text.replaceAll(char, '');
}

const users: IUser[] = [
    { 
        id: 1, 
        name: 'Anna', 
        email: 'anna@mail.com' 
    },
    { 
        id: 2, 
        name: 'Ivan' 
    }, 
    { 
        id: 3, 
        name: 'Ivan', 
        email: 'ivan2@mail.com' 
    }
];

const filteredUsers: IUser[] = users.filter((user: IUser) => user.name === 'Ivan');
