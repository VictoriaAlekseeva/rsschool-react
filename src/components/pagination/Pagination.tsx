import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { decrement, increment } from '../../store/slices/paginationSlice';

import './Pagination.css';

type Props = {
  itemsPerPage: string;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Pagination: React.FC<Props> = ({ itemsPerPage, handleSelectChange }) => {
  const count = useAppSelector((state) => state.pageNumber.value);
  const dispatch = useAppDispatch();

  return (
    <div className="pagination">
      <span
        className="pagination__arrow pagination__arrow_left"
        onClick={() => dispatch(decrement())}
      >
        {' '}
      </span>
      <span className="pagination__counter">{count}</span>
      <span
        className="pagination__arrow pagination__arrow_right"
        onClick={() => dispatch(increment())}
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
