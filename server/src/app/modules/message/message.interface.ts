export interface Cupon {
  id: string;
  code: string;
  discountPercentage: number;
  validFrom: Date;
  validUntil: Date;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
}
