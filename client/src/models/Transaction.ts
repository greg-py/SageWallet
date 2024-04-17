export interface Transaction {
  id?: string;
  date: string;
  vendor: string;
  price: number;
  category: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
