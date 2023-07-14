interface userObj {
    name: string;
    email: string;
    createdAt: number;
    role: string;
}

interface itemObj {
    id?: string;
    name: string;
    uploadedAt: number;
    lastModified: number;
    price: number;
    age: number;
    author?: any;
}
