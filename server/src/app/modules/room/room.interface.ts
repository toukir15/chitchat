export interface IProduct {
  id: string;
  shopId: string;
  name: string;
  price: number;
  categoryId: string;
  description: string;
  inventoryCount: number;
  discount: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
