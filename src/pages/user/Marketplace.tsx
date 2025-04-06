
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import FilterSection from '@/components/marketplace/FilterSection';
import CategoryTabs from '@/components/marketplace/CategoryTabs';
import { products } from '@/components/marketplace/marketplaceData';

const Marketplace: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Debug products on component mount
  useEffect(() => {
    console.log('Marketplace mounted - Available products:', products.length);
    console.log('Product categories:');
    
    // Log all unique categories
    const categories = [...new Set(products.map(p => p.category))];
    console.log('Available categories:', categories);
    
    // Log products by category
    categories.forEach(category => {
      const categoryProducts = products.filter(p => p.category === category);
      console.log(`${category}: ${categoryProducts.length} products`);
    });
    
    // Check for service products specifically
    const serviceProducts = products.filter(p => p.category === 'services');
    console.log('Services products:', serviceProducts.length);
    serviceProducts.forEach(p => console.log(`- ${p.name}`));
    
    // Pre-load images to check for errors
    products.forEach(product => {
      console.log(`- ${product.name}: ${product.image}`);
      
      const img = new Image();
      img.onload = () => console.log(`✅ Image loaded successfully: ${product.image}`);
      img.onerror = () => console.log(`❌ Failed to load image: ${product.image}`);
      img.src = product.image;
    });
  }, []);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('user.marketplace')}</h1>
          <p className="text-muted-foreground mt-1">Browse refurbished and renewed electronics at ई-Yukta Kart</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <FilterSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />

            <CategoryTabs 
              products={products}
              filteredProducts={filteredProducts}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;
