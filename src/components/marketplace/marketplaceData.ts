
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
    image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
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
    image: '/lovable-uploads/231eef4b-a949-4db1-849d-b2221390e0dd.png',
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
    image: '/lovable-uploads/27733395-edc3-4227-9c4f-64c67cc6ae4a.png',
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
    image: '/lovable-uploads/32c2b3a5-bb3d-4561-b297-f359fb664bf6.png',
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
    image: '/lovable-uploads/5cf4d238-8867-41cf-8b31-91d2cabfc66a.png',
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
    image: '/lovable-uploads/6c301a42-c407-456b-b013-05fa8c7bb54b.png',
  },
];
