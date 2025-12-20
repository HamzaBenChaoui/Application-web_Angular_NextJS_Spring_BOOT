export interface Rental {
  id: number;
  product: {
    id: number;
    nameProducts: string;
    image: string;
  };
  user: {
    id: number;
    nom: string;
    email: string;
  };
  startDate: Date;
  endDate: Date;
  status: string;
}
