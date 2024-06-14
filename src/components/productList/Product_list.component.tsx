import React, { useEffect, useMemo, useState } from 'react';

import Pagination from '@/components/pagination/Pagination.component';
import NameBarComponent from '@/components/productList/NameBar.component';
import SearchBarComponent from '@/components/productList/SearchBar.component';
import TriageBarComponent from '@/components/productList/TriageBar.component';
import type { ProductsInterface } from '@/interfaces/interface_product';

import addToCardImage from '../../assets/add_to_card.svg';
import addToCardDarkThemes from '../../assets/card.svg';

import '../../App.css';
import styles from './product_list.module.css';

interface ProductListComponentProps {
    products: ProductsInterface[];
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

type ButtonName = 'Electronics' | 'Shoes' | 'Clothes' | '';

const ProductListComponent: React.FC<ProductListComponentProps> = ({
    products,
    selectedProducts,
    toggleProductSelection,
    searchQuery,
    filteredName,
    sortOption,
    setSearchQuery,
    setFilteredName,
    setSortOption,
    isDarkTheme,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<ButtonName>('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const productsPerPage = 8;
    const options = ['Price (Low - High)', 'Price (High - Low)', 'Newest', 'Oldest'];

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, sortOption, searchQuery]);

    const filteredProducts = useMemo(
        () =>
            products.filter((product) => {
                const isCategoryMatched = selectedCategory === '' || product.category.name === selectedCategory;
                const isSearchQueryMatched =
                    !isSearchActive || searchQuery === '' || product.title.toLowerCase().includes(searchQuery.toLowerCase());
                return isCategoryMatched && isSearchQueryMatched;
            }),
        [products, selectedCategory, searchQuery, isSearchActive],
    );

    const sortedProducts = useMemo(
        () =>
            [...filteredProducts].sort((a, b) => {
                switch (sortOption) {
                    case 'Price (High - Low)': {
                        return b.price - a.price;
                    }
                    case 'Price (Low - High)': {
                        return a.price - b.price;
                    }
                    case 'Newest': {
                        return new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime();
                    }
                    case 'Oldest': {
                        return new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime();
                    }
                    default: {
                        return 0;
                    }
                }
            }),
        [filteredProducts, sortOption],
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setIsSearchActive(true);
    };

    return (
        <div className={styles.mainCard}>
            <div className={styles.barContainer}>
                <div className={styles.searchContainer}>
                    <SearchBarComponent onSearch={handleSearch} />
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.nameContainer}>
                        <NameBarComponent selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    </div>
                    <div className={styles.triageContainer}>
                        <TriageBarComponent options={options} setSortOption={setSortOption} />
                    </div>
                </div>
            </div>
            <ul className={styles.cardContainer}>
                {currentProducts.map((product) => (
                    <li className={styles.card} key={product.id}>
                        <img className={styles.productImages} src={product.images[0]} alt="product" />
                        <p className={styles.productTitle}>{product.title}</p>
                        <div className={styles.priceContainer}>
                            <p className={styles.productPrice}>{product.price} ₴</p>
                            <button className={styles.addToCardButton} onClick={() => toggleProductSelection(product.id)}>
                                <img
                                    className={styles.addProductToCard}
                                    src={isDarkTheme ? addToCardDarkThemes : addToCardImage}
                                    alt={isDarkTheme ? 'add_product_card_dark' : 'add_product_card'}
                                />
                                {selectedProducts.includes(product.id) && <span className={styles.cartIndicator}>1</span>}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(sortedProducts.length / productsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ProductListComponent;
