import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => (
    <div>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist</p>
        <Link to="">Go to About Page</Link>
    </div>
);

export default PageNotFound;
