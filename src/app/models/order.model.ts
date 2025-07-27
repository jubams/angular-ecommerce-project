export interface Order {
  orderId: string;
  userId: number;
  date: string; // ISO format
  items: {
    productId: number;
    quantity: number;
  }[];
  total: number;
}
