
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
    console.log('Marketplace - Products available:', products.length);
    if (products.length > 0) {
      products.forEach(product => {
        console.log(`Product ${product.id} - ${product.name} - Image: ${product.image}`);
      });
    }
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
