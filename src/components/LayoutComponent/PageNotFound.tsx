import React from 'react';
import { Link } from 'react-router-dom';

import styles from './page_not_found.module.css';

const PageNotFound = () => (
    <div className={styles.pages_not_found}>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Go to About Page</Link>
    </div>
);

export default PageNotFound;
