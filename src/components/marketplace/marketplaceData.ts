
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount: number;
  rating: number;
  condition: string;
  warranty: string;
  category: string;
  image: string;
}

// Sample product data
export const products: Product[] = [
  {
    id: 1,
    name: 'Refurbished iPhone 13 Pro - 128GB',
    price: 45999,
    originalPrice: 59999,
    discount: 23,
    rating: 4.5,
    condition: 'Excellent',
    warranty: '6 months',
    category: 'phones',
    image: '/photo-1581090464777-f3220bbe1b8b.jpg',
  },
  {
    id: 2,
    name: 'Renewed Dell Inspiron Laptop - 16GB RAM',
    price: 68999,
    originalPrice: 89999,
    discount: 23,
    rating: 4.7,
    condition: 'Like New',
    warranty: '1 year',
    category: 'laptops',
    image: '/photo-1498050108023-c5249f4df085.jpg',
  },
  {
    id: 3,
    name: 'Refurbished Samsung Galaxy Tab S7',
    price: 32999,
    originalPrice: 42999,
    discount: 23,
    rating: 4.2,
    condition: 'Good',
    warranty: '6 months',
    category: 'tablets',
    image: '/photo-1531297484001-80022131f5a1.jpg',
  },
  {
    id: 4,
    name: 'Renewed Sony WH-1000XM4 Headphones',
    price: 18999,
    originalPrice: 29999,
    discount: 37,
    rating: 4.8,
    condition: 'Excellent',
    warranty: '1 year',
    category: 'audio',
    image: '/photo-1518770660439-4636190af475.jpg',
  },
  {
    id: 5,
    name: 'Refurbished Smart Watch Series 6',
    price: 22999,
    originalPrice: 32999,
    discount: 30,
    rating: 4.6,
    condition: 'Like New',
    warranty: '6 months',
    category: 'wearables',
    image: '/photo-1488590528505-98d2b5aba04b.jpg',
  },
  {
    id: 6,
    name: 'Renewed Intex 32" 4K Smart TV',
    price: 16999,
    originalPrice: 24999,
    discount: 32,
    rating: 4.4,
    condition: 'Good',
    warranty: '1 year',
    category: 'monitors',
    image: '/photo-1581090464777-f3220bbe1b8b.jpg',
  },
];
