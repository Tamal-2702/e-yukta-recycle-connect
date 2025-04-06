
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Search, Filter } from 'lucide-react';

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  showFilters,
  setShowFilters
}) => {
  const formatPrice = (value: number) => {
    return `₹${value.toLocaleString()}`;
  };

  return (
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
  );
};

export default FilterSection;
