import React from 'react';

import ProductListComponent from '@/components/productList/Product_list.component.tsx';
import type { ProductsInterface } from '@/interfaces/interface_product';
import { mockData } from '@/mock_data.ts';

interface ProductsPageProps {
    selectedProducts: number[];
    toggleProductSelection: (productId: number) => void;
    searchQuery: string;
    filteredName: string;
    sortOption: string;
    setSearchQuery: (query: string) => void;
    setFilteredName: (name: string) => void;
    setSortOption: (option: string) => void;
    isDarkTheme: boolean;
}

const ProductsPage: React.FC<ProductsPageProps> = ({
    selectedProducts,
    toggleProductSelection,
    searchQuery,
    filteredName,
    sortOption,
    setSearchQuery,
    setFilteredName,
    setSortOption,
    isDarkTheme,
}) => (
    <ProductListComponent
        products={mockData as ProductsInterface[]}
        selectedProducts={selectedProducts}
        toggleProductSelection={toggleProductSelection}
        searchQuery={searchQuery}
        filteredName={filteredName}
        sortOption={sortOption}
        setSearchQuery={setSearchQuery}
        setFilteredName={setFilteredName}
        setSortOption={setSortOption}
        isDarkTheme={isDarkTheme}
    />
);

export default ProductsPage;
