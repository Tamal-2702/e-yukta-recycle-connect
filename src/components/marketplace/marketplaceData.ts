
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
    image: '/lovable-uploads/cf4f5ece-f6ce-45c7-84cf-eeecea28f44e.png',
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
    image: '/lovable-uploads/9587ca95-35c2-4a79-8ccc-875ad37277e0.png',
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
    image: '/lovable-uploads/ba4f1960-d64a-4fce-aa1c-7daf62d3a8e7.png',
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
    image: '/lovable-uploads/468f7ccd-02cb-4300-9446-b4f560399545.png',
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
    image: '/lovable-uploads/d3dc81bc-d03a-46a5-ac86-60c89f4613f6.png',
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
    image: '/lovable-uploads/cbb073f8-08b9-4600-945c-07115e99a37f.png',
  },
  {
    id: 7,
    name: 'E-Waste Collection Service - Electronics',
    price: 500,
    originalPrice: 1200,
    discount: 58,
    rating: 4.8,
    condition: 'Service',
    warranty: 'N/A',
    category: 'services',
    image: '/lovable-uploads/9b90cbb4-b8f0-48c4-b56a-83c6e7cb33f1.png',
  },
  {
    id: 8,
    name: 'Corporate E-Waste Solution Package',
    price: 25000,
    originalPrice: 40000,
    discount: 38,
    rating: 4.9,
    condition: 'Service',
    warranty: '1 year',
    category: 'services',
    image: '/lovable-uploads/287f9982-1146-4d1e-84db-d2869cf34067.png',
  },
  {
    id: 9,
    name: 'E-Waste Collection & Recycling',
    price: 999,
    originalPrice: 1999,
    discount: 50,
    rating: 4.7,
    condition: 'Service',
    warranty: 'N/A',
    category: 'services',
    image: '/lovable-uploads/f26be4dc-f146-4643-a4e2-36f0d4edb962.png',
  },
];
