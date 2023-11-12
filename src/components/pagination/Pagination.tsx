import React from 'react';

import './Pagination.css';

type Props = {
  gotoPrevPage: () => void;
  gotoNextPage: () => void;
  currentPage: string;
  itemsPerPage: string;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Pagination: React.FC<Props> = ({
  gotoPrevPage,
  gotoNextPage,
  currentPage,
  itemsPerPage,
  handleSelectChange,
}) => {
  return (
    <div className="pagination">
      <span
        className="pagination__arrow pagination__arrow_left"
        onClick={gotoPrevPage}
      >
        {' '}
      </span>
      <span className="pagination__counter">{currentPage}</span>
      <span
        className="pagination__arrow pagination__arrow_right"
        onClick={gotoNextPage}
      >
        {' '}
      </span>
      <div>
        <label htmlFor="select">items per page:</label>
        <select id="select" value={itemsPerPage} onChange={handleSelectChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
