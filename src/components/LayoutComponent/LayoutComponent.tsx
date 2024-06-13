import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const LayoutComponent: React.FC = () => (
    <div>
        <header>
            <h1>My Website</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">About</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            <p>Footer Content</p>
        </footer>
    </div>
);

export default LayoutComponent;
