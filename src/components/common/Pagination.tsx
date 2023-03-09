import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";

interface PaginationProps {
  total: number;
  initialPage: number;
  onChange: (page: number) => void;
}

function Pagination({
  total,
  initialPage,
  onChange,
}: PaginationProps): ReactElement {
  const [current, setCurrent] = useState(initialPage);
  const handleClickWrapper = (nextPage: number) => (): void => {
    onChange(nextPage);
    setCurrent(nextPage);
  };

  return (
    <nav>
      <ul className="pagination">
        {Array.from(Array(total), (_, index) => (
          <li
            key={index}
            className={current === index + 1 ? "page-item active" : "page-item"}
          >
            <Link
              to="."
              onClick={handleClickWrapper(index + 1)}
              className="page-link"
            >
              {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
