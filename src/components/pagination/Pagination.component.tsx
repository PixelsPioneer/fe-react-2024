import React, { useMemo } from 'react';

import styles from './pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = useMemo(() => {
        const getPageRange = (start: number, end: number) => {
            const range = [];
            for (let index = start; index <= end; index++) {
                range.push(index);
            }
            return range;
        };

        const pageNumbers = [];
        const maxPageButtons = 5;

        if (totalPages <= maxPageButtons) {
            return getPageRange(1, totalPages);
        }

        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 1);

        if (currentPage === 1) {
            endPage = 2;
        } else if (currentPage === totalPages) {
            startPage = totalPages - 1;
        }

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) {
                pageNumbers.push('...');
            }
        }

        pageNumbers.push(...getPageRange(startPage, endPage));

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    }, [currentPage, totalPages]);

    return (
        <div className={styles.pagination}>
            <button
                className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {generatePageNumbers.map((number, index) =>
                typeof number === 'number' ? (
                    <button
                        key={index}
                        className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </button>
                ) : (
                    <span key={index} className={styles.ellipsis}>
                        {number}
                    </span>
                ),
            )}
            <button
                className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
