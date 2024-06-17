import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AboutPage from './components/LayoutComponent/AboutPage.tsx';
import LayoutComponent from './components/LayoutComponent/LayoutComponent.tsx';
import PageNotFound from './components/LayoutComponent/PageNotFound.tsx';
import ProductsPage from './components/LayoutComponent/ProductPage.tsx';
import { mockData } from './mock_data';

import './App.css';

function App() {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredName, setFilteredName] = useState('');
    const [sortOption, setSortOption] = useState('');

    const getPreferredTheme = () => !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === null ? getPreferredTheme() : storedTheme === 'dark';
    });

    const products = mockData;

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
        localStorage.setItem('theme', theme);

        const bodyElement = document.body;
        if (isDark) {
            bodyElement.classList.add('dark');
            bodyElement.classList.remove('light');
        } else {
            bodyElement.classList.add('light');
            bodyElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        const storedSelectedProducts = localStorage.getItem('selectedProducts');
        if (storedSelectedProducts) {
            setSelectedProducts(JSON.parse(storedSelectedProducts));
        }
    }, []);

    useEffect(() => {
        const bodyElement = document.body;
        if (isDarkTheme) {
            bodyElement.classList.add('dark');
            bodyElement.classList.remove('light');
        } else {
            bodyElement.classList.add('light');
            bodyElement.classList.remove('dark');
        }

        return () => {
            bodyElement.classList.remove('light', 'dark');
        };
    }, [isDarkTheme]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LayoutComponent
                                products={products}
                                selectedProducts={selectedProducts}
                                setTheme={setTheme}
                                isDarkTheme={isDarkTheme}
                                toggleComponent={() => {}}
                            />
                        }
                    >
                        <Route index element={<AboutPage />} />
                        <Route
                            path="products"
                            element={
                                <ProductsPage
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
                            }
                        />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
