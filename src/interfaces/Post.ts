export interface IPost {
  _id: string;
  title: string;
  desc: string;
  img: string;
  content: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFinance {
  _id: string;
  title: string;
  value: number;
  category: string;
  date: string;
  tipo: boolean;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
