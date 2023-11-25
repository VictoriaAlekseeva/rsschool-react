import React from 'react';
import { useRouter } from 'next/router';

type Props = {
  totalCount: number;
};

const Pagination: React.FC<Props> = ({ totalCount }) => {
  const router = useRouter();
  const { page = 1, per_page = 5, beer_name = '' } = router.query;

  const handleChangePage = (page: number) => {
    if (beer_name) {
      router.push(`/?beer_name=${beer_name}&page=${page}&per_page=${per_page}`);
    } else {
      router.push(`/?page=${page}&per_page=${per_page}`);
    }
  };

  const handlerClickPrev = () => {
    const currenPage = +page > 1 ? +page - 1 : +page;
    handleChangePage(currenPage);
  };

  const handlerClickNext = () => {
    const currenPage = +page + 1;
    handleChangePage(currenPage);
  };
  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    if (beer_name) {
      router.push(`/?beer_name=${beer_name}&page=1&per_page=${value}`);
    } else {
      router.push(`/?page=1&per_page=${value}`);
    }
  };

  return (
    <div className="pagination">
      <span
        className="pagination__arrow pagination__arrow_left"
        onClick={handlerClickPrev}
      >
        {' '}
      </span>
      <span className="pagination__counter">{page}</span>
      {totalCount > 0 && (
        <span
          className="pagination__arrow pagination__arrow_right"
          onClick={handlerClickNext}
        >
          {' '}
        </span>
      )}
      <div>
        <label htmlFor="select">items per page:</label>
        <select id="select" value={per_page} onChange={handleChangeSelect}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
