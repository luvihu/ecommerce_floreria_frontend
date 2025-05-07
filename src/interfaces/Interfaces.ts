
export interface Product {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  activo?: boolean;
  fechaCreacion: string;
  categories: Category[];
  user?: User;
  images: Image[];
  promotions?: Promotion[];
}
export interface ProductPost {
  nombre: string;
  descripcion?: string;
  precio: number;
  activo?: boolean;
  categoryIds: string[];
  promotionIds?: string[];
}

export interface Category {
  id: string;
  nombre: string;
  activa?: boolean;
  products?: Array<{
    id: string;
    nombre: string;
    activo: boolean;
  }>;
}
export interface CategoryPost {
  nombre: string;
  activa?: boolean;
}

export interface User {
  id: string;
  nombre: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface PromotionPost {
  nombre: string;
  descripcion?: string;
  valor: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  products?:string[]
}
export interface Promotion {
 id: string;
   nombre: string;
   descripcion?: string;
   tipo: "porcentaje"; 
   valor: number; 
   fecha_inicio: Date;
   fecha_fin: Date;
   activo: boolean;
   products?: ProductPromotion[];
}
export interface ProductPromotion {
  id: string;
  nombre: string;
  precio: number;
  activo: boolean;
}

export interface IUser {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  password: string;
  rol?: 'ADMIN' | 'USER';
  activo?: boolean;
  fechaRegistro: string;
  products: ProductUser[];
};

export interface ProductUser {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  activo?: boolean;
  fechaCreacion: string;
}

export interface UserAuth {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  password: string;
  rol?: 'ADMIN' | 'USER';
  activo?: boolean;
}

export interface ImageDashboard {
  id: string;
  url: string;
  alt_text: string;
  principal: boolean;
  public_id: string;
  product?: {
    id: string;
    nombre?: string;
    // Otros campos del producto que puedas necesitar
  };
}
