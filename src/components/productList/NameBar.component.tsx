import React, { useState } from 'react';

import '../../App.css';
import styles from './nameBar.module.css';

type ButtonName = 'Electronics' | 'Shoes' | 'Clothes';

const buttons: { name: ButtonName; label: string }[] = [
    { name: 'Electronics', label: 'Electronics' },
    { name: 'Shoes', label: 'Shoes' },
    { name: 'Clothes', label: 'Clothes' },
];

const NameBarComponent: React.FC = () => {
    const [activeButton, setActiveButton] = useState<ButtonName | ''>('');

    const handleButtonClick = (name: ButtonName) => {
        setActiveButton((previousActiveButton) => (previousActiveButton === name ? '' : name));
    };

    return (
        <div className={styles.buttonGroup}>
            {buttons.map((button) => (
                <button
                    key={button.name}
                    className={`${styles.nameButton} ${activeButton === button.name ? styles.active : ''}`}
                    onClick={() => handleButtonClick(button.name)}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default NameBarComponent;
