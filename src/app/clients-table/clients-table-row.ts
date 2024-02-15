export interface TableRow {
    _id: number;
    isActive: boolean;
    balance: string;
    picture: string;
    age: number;
    name: { first: string, last: string }[];
    company: string;
    email: string;
    address: string;
    favoriteFruit: string;
    tags: Array<any>;
    [key: string]: any;
  }