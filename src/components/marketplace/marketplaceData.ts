
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
    image: '/lovable-uploads/c28a1f1b-47ba-420d-a7b5-cfc66179f6ba.png',
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
    image: '/lovable-uploads/3a4c0805-0e97-4baa-b9c3-54187fd6330d.png',
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
    image: '/lovable-uploads/7c65c97b-0cbb-44d5-8262-0f8d63549c53.png',
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
    image: '/lovable-uploads/0cf6e2d1-534a-41e1-b9e2-03a53aee01f1.png',
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
    image: '/lovable-uploads/42cf3d3d-6da7-4e18-91b9-b5cd5b62476c.png',
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
    image: '/lovable-uploads/b95131a7-8654-4dca-8475-e1a2f0805d17.png',
  },
];
