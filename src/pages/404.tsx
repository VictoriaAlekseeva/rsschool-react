import Link from 'next/link';
import React from 'react';

const Error404 = () => {
  return (
    <>
      <h4>Oops! Something went wrong...</h4>
      <p>We encountered a problem trying to display this section.</p>
      <p>Please try refreshing the page or come back later.</p>
      <Link href={'/'} className="red-text">
        Reload Page
      </Link>
    </>
  );
};

export default Error404;
