import React, { useEffect, useState } from 'react';

import { AboutMeComponents } from '@/components/about/About_me.component.tsx';
import Footer from '@/components/footer/Footer.component.tsx';
import ProductListComponent from '@/components/productList/Product_list.component.tsx';
import { mockData } from '@/mock_data.ts';

import { HeaderComponent } from './components/header/Header.component.tsx';

import './App.css';

function App() {
    const [currentComponent, setCurrentComponent] = useState('About');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredName, setFilteredName] = useState('');
    const [sortOption, setSortOption] = useState('');

    const getPreferredTheme = () => !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === null ? getPreferredTheme() : JSON.parse(storedTheme);
    });

    const products = mockData;

    const toggleComponent = (componentName: string) => setCurrentComponent(componentName);

    const toggleProductSelection = (productId: number) => {
        setSelectedProducts((previousSelectedProducts) => {
            const updatedSelectedProducts = previousSelectedProducts.includes(productId)
                ? previousSelectedProducts.filter((id) => id !== productId)
                : [...previousSelectedProducts, productId];

            localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
            return updatedSelectedProducts;
        });
    };

    const setTheme = (theme: string) => {
        const isDark = theme === 'dark';
        setIsDarkTheme(isDark);
        localStorage.setItem('theme', JSON.stringify(isDark));
    };

    useEffect(() => {
        const storedSelectedProducts = localStorage.getItem('selectedProducts');
        if (storedSelectedProducts) {
            setSelectedProducts(JSON.parse(storedSelectedProducts));
        }
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = isDarkTheme ? '#111' : '#FFF';
    }, [isDarkTheme]);

    useEffect(() => {
        const rootElement = document.documentElement;
        if (isDarkTheme) {
            rootElement.classList.add('dark');
        } else {
            rootElement.classList.remove('dark');
        }
    }, [isDarkTheme]);

    return (
        <div className={`App ${isDarkTheme ? 'dark' : 'light'}`}>
            <HeaderComponent
                toggleComponent={toggleComponent}
                products={products}
                selectedProducts={selectedProducts}
                setTheme={setTheme}
                isDarkTheme={isDarkTheme}
            />
            {currentComponent === 'About' ? (
                <AboutMeComponents />
            ) : (
                <ProductListComponent
                    products={products}
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
            )}
            <Footer />
        </div>
    );
}

export default App;
