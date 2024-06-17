import type { ProductsInterface } from '@/interfaces/interface_product.ts';

export interface HeaderComponentProps {
    toggleComponent: (componentName: string) => void;
    products: ProductsInterface[];
    selectedProducts: number[];
    setTheme: (theme: 'light' | 'dark') => void;
    isDarkTheme: boolean;
}
