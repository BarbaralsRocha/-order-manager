export interface IProduct {
  id: number | null;
  name: string | null;
  quantity: number | null;
  type: 'un' | 'kg' | null;
  price: number | null;
  totalPrice: number | null;
  unitaryWeight: number | null;
  totalWeight: number | null;
  additionalInformations: string | null;
}
