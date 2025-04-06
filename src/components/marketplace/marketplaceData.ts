
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
    image: '/lovable-uploads/ccb1b03b-541d-4755-8644-467aa109f858.png',
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
    image: '/lovable-uploads/b0b0247e-5bee-4714-8530-9e1eec46881c.png',
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
    image: '/lovable-uploads/3cb89ce7-797c-434a-a895-f55aa2a100e5.png',
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
    image: '/lovable-uploads/e585e885-4efe-4e44-a468-76a6fc8e7b55.png',
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
    image: '/lovable-uploads/f79b9c9f-9efb-48c8-a2fe-7fbf93772b3c.png',
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
    image: '/lovable-uploads/82cd352a-a3cf-461e-b99e-92a282509363.png',
  },
];
