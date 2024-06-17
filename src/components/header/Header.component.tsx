import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BurgerMenu from '../../assets/burger-menu.png';
import Card from '../../assets/card.svg';
import DarkTheme from '../../assets/DarkThemes.svg';
import LightTheme from '../../assets/LightThemes.svg';
import Login from '../../assets/login.png';
import LogoMOCG from '../../assets/logoMOCG.png';
import Signup from '../../assets/signup.png';

import styles from './header.module.css';

interface Product {
    id: number;
}

interface HeaderComponentProps {
    products: Product[];
    selectedProducts: number[];
    setTheme: (theme: 'light' | 'dark') => void;
    isDarkTheme: boolean;
}

interface HeaderComponentProps {
    toggleComponent?: unknown;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ products, selectedProducts, setTheme, isDarkTheme, toggleComponent }) => {
    const [totalItemsInCart, setTotalItemsInCart] = useState(0);

    useEffect(() => {
        setTotalItemsInCart(selectedProducts.length);
    }, [selectedProducts]);

    const handleThemeChange = (theme: 'light' | 'dark') => {
        setTheme(theme);
        localStorage.setItem('theme', theme);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    return (
        <div className={styles.header_wrapper}>
            <header className={styles.header}>
                <div className={styles.themesContainer}>
                    <img className={styles.logoMOCG} src={LogoMOCG} alt="Logo MA" />
                    <div className={styles.themesMenuContainer}>
                        <button
                            className={`${styles.lightThemeButton} ${isDarkTheme ? '' : styles.active}`}
                            onClick={() => handleThemeChange('light')}
                        >
                            <img className={styles.lightThemeIcon} src={LightTheme} alt="Light Theme" />
                        </button>
                        <hr className={styles.customHr} />
                        <button
                            className={`${styles.darkThemesButton} ${isDarkTheme ? styles.active : ''}`}
                            onClick={() => handleThemeChange('dark')}
                        >
                            <img className={styles.darkThemeIcon} src={DarkTheme} alt="Dark Theme" />
                        </button>
                    </div>
                </div>
                <div className={styles.menuAndAuthContainer}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.burgerMenuButton}>
                            <img className={styles.burgerMenu} src={BurgerMenu} alt="Burger Menu" />
                        </button>
                    </div>
                    <div className={styles.aboutProdct}>
                        <Link className={styles.aboutMe} to="/">
                            About
                        </Link>
                        <Link className={styles.products} to="/products">
                            Products
                        </Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.Card}>
                            <img className={styles.cardIcon} src={Card} alt="Card" />
                            {totalItemsInCart > 0 && <span className={styles.cartIndicator}>{totalItemsInCart}</span>}
                        </button>
                        <button className={styles.logOutButton}>
                            <img className={styles.loginLogo} src={Login} alt="Login" />
                            <p>Login</p>
                        </button>
                        <button className={styles.signupButton}>
                            <img className={styles.signupLogo} src={Signup} alt="Signup" />
                            <p>Sign up</p>
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default HeaderComponent;
