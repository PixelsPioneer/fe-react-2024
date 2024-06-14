import React, { useState } from 'react';

import searchIcon from '@/assets/search.svg';

import '../../App.css';
import styles from './searchBar.module.css';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className={styles.searchBarContainer}>
            <input type="text" className={styles.searchBar} placeholder="Search..." value={query} onChange={handleChange} />
            <button className={styles.searchButton} onClick={handleSearch}>
                <img src={searchIcon} alt="Search" className={styles.searchIcon} />
            </button>
        </div>
    );
};

export default SearchBarComponent;
