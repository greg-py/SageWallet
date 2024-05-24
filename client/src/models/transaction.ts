export interface Transaction {
  id?: string;
  date: string;
  vendor: string;
  price: string;
  category: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
