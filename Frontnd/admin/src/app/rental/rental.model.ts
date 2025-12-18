export interface Rental {
  id: number;
  product: {
    id: number;
    nameProducts: string;
  };
  user: {
    id: number;
    nom: string;
  };
  startDate: Date;
  endDate: Date;
  status: string;
}
