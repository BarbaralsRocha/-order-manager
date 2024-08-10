export interface ICustomer {
  id: number;
  type: 'legalEntity' | 'individual';
  name: string;
  address: string;
  cnpj?: number;
  cpf?: number;
  phoneNumber?: number;
  otherDocument?: number;
}
