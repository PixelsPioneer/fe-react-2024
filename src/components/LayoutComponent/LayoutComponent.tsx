import React from 'react';
import { Outlet } from 'react-router-dom';

import FooterComponent from '@/components/footer/Footer.component.tsx';
import HeaderComponent from '@/components/header/Header.component.tsx';
import type { HeaderComponentProps } from '@/components/header/HeaderComponentProps.tsx';

interface LayoutComponentProps extends Omit<HeaderComponentProps, 'toggleComponent'> {
    toggleComponent: (componentName: string) => void;
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({ products, selectedProducts, setTheme, isDarkTheme, toggleComponent }) => (
    <div className="LayoutComponent">
        <HeaderComponent
            products={products}
            selectedProducts={selectedProducts}
            setTheme={setTheme}
            isDarkTheme={isDarkTheme}
            toggleComponent={toggleComponent}
        />
        <main className="main">
            <Outlet />
        </main>
        <FooterComponent />
    </div>
);

export default LayoutComponent;
