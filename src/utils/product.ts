export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  reviewCount?: number;  
  image: string;
  images?:string[];
  category: string;
  originalPrice?: number;
  brand: string;
  size?: string | string[];   
  color?: string[];
  style?: string;
}
