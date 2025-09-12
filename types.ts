export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  attributes: {
    color: string;
    size: string;
  };
  image: string;
  stock: number;
}

export interface ProductReview {
    id: string;
    author: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
}

export interface ProductSpecification {
    name: string;
    value: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  basePrice: number;
  variants: ProductVariant[];
  defaultImage: string;
  tags: string[];
  reviews: ProductReview[];
  specifications: ProductSpecification[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  attributes: {
    color: string;
    size: string;
  };
}