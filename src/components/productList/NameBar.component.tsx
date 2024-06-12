import React from 'react';

import '../../App.css';
import styles from './nameBar.module.css';

type ButtonName = 'Electronics' | 'Shoes' | 'Clothes';

const buttons: { name: ButtonName; label: string }[] = [
    { name: 'Electronics', label: 'Electronics' },
    { name: 'Shoes', label: 'Shoes' },
    { name: 'Clothes', label: 'Clothes' },
];

interface NameBarProps {
    selectedCategory: ButtonName | '';
    setSelectedCategory: (category: ButtonName | '') => void;
}

const NameBarComponent: React.FC<NameBarProps> = ({ selectedCategory, setSelectedCategory }) => {
    const handleButtonClick = (name: ButtonName) => {
        setSelectedCategory(name === selectedCategory ? '' : name);
    };

    return (
        <div className={styles.buttonGroup}>
            {buttons.map((button) => (
                <button
                    key={button.name}
                    className={`${styles.nameButton} ${selectedCategory === button.name ? styles.active : ''}`}
                    onClick={() => handleButtonClick(button.name)}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default NameBarComponent;
