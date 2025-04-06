
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Laptop, TabletSmartphone, Headphones, Monitor, Watch, LucideIcon } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';

interface Category {
  name: string;
  icon: LucideIcon | null;
  value: string;
}

interface CategoryTabsProps {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ products, filteredProducts, searchQuery }) => {
  const categories: Category[] = [
    { name: 'All', icon: null, value: 'all' },
    { name: 'Phones', icon: Smartphone, value: 'phones' },
    { name: 'Laptops', icon: Laptop, value: 'laptops' },
    { name: 'Tablets', icon: TabletSmartphone, value: 'tablets' },
    { name: 'Audio', icon: Headphones, value: 'audio' },
    { name: 'Monitors', icon: Monitor, value: 'monitors' },
    { name: 'Wearables', icon: Watch, value: 'wearables' },
  ];

  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4 flex w-full overflow-x-auto">
        {categories.map((category) => (
          <TabsTrigger key={category.value} value={category.value} className="flex-1">
            {category.icon && <category.icon className="mr-2 h-4 w-4" />}
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map((category) => (
        <TabsContent key={category.value} value={category.value} className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts
              .filter(product => category.value === 'all' || product.category === category.value)
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
          
          {filteredProducts.filter(product => 
            category.value === 'all' || product.category === category.value
          ).length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found for your search criteria</p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
