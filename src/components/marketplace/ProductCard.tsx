
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow card-hover">
      <div className="aspect-square relative bg-gray-100 flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-contain h-full max-h-40 w-auto"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error(`Failed to load image: ${target.src}`);
            target.src = 'https://placehold.co/300x300?text=Product+Image';
            target.onerror = null; // Prevent infinite fallback loop
          }}
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

export default ProductCard;
