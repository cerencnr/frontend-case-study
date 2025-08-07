import "./Pagination.css";

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

export default function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 4) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 3) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className="custom-pagination">
            <ul>
                <li className="page-item">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                </li>

                {pageNumbers.map((page, idx) => (
                    <li
                        key={idx}
                        className={`page-item ${
                            page === currentPage ? "active" : ""
                        } ${page === "..." ? "dots" : ""}`}
                    >
                        {page === "..." ? (
                            <span className="dots">...</span>
                        ) : (
                            <button onClick={() => setCurrentPage(Number(page))}>
                                {page}
                            </button>
                        )}
                    </li>
                ))}

                <li className="page-item">
                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </li>
            </ul>
        </nav>
    );
}
