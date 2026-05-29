export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  sku: string;
  stock: number;
  category: string;
  thumbnail: string;
  tags: string[];
  meta: ProductMeta;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
