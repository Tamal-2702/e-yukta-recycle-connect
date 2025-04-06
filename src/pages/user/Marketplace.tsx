
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ShoppingCart, Search, Tag, Star, Filter, Smartphone, Laptop, Headphones, Monitor, TabletSmartphone, Watch } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow card-hover">
      <div className="aspect-square relative bg-gray-100 flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-contain max-h-40"
        />
        {product.discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            {product.discount}% OFF
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{product.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm ml-1">{product.rating}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {product.condition}
          </Badge>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <Badge variant="secondary" className="text-xs">
              {product.warranty}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

const Marketplace: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Refurbished iPhone 12 Pro - 128GB',
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
      name: 'Renewed Dell XPS 13 Laptop - 16GB RAM',
      price: 68999,
      originalPrice: 89999,
      discount: 23,
      rating: 4.7,
      condition: 'Like New',
      warranty: '1 year',
      category: 'laptops',
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
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
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
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
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
    },
    {
      id: 5,
      name: 'Refurbished Apple Watch Series 6',
      price: 22999,
      originalPrice: 32999,
      discount: 30,
      rating: 4.6,
      condition: 'Like New',
      warranty: '6 months',
      category: 'wearables',
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
    },
    {
      id: 6,
      name: 'Renewed LG 27" 4K Monitor',
      price: 16999,
      originalPrice: 24999,
      discount: 32,
      rating: 4.4,
      condition: 'Good',
      warranty: '1 year',
      category: 'monitors',
      image: '/lovable-uploads/06f3edc4-4f11-48ce-bc8c-00ca6214de52.png',
    },
  ];

  const categories = [
    { name: 'All', icon: null, value: 'all' },
    { name: 'Phones', icon: Smartphone, value: 'phones' },
    { name: 'Laptops', icon: Laptop, value: 'laptops' },
    { name: 'Tablets', icon: TabletSmartphone, value: 'tablets' },
    { name: 'Audio', icon: Headphones, value: 'audio' },
    { name: 'Monitors', icon: Monitor, value: 'monitors' },
    { name: 'Wearables', icon: Watch, value: 'wearables' },
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const formatPrice = (value) => {
    return `₹${value.toLocaleString()}`;
  };

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('user.marketplace')}</h1>
          <p className="text-muted-foreground mt-1">Browse refurbished and renewed electronics</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mr-2"
                    leftElement={<Search className="h-4 w-4" />}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              {showFilters && (
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Price Range</h4>
                      <Slider
                        defaultValue={[0, 100000]}
                        max={100000}
                        step={1000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;
