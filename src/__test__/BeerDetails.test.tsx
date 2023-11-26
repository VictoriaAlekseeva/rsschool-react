import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { BeerData } from '@/__test__/utils/mockData';
import createMockRouter from '@/__test__/utils/mockRouter';
import BeerDetails from '@/components/beerDetails/BeerDetails';

describe('Tests for the Detailed Card component', () => {
  const id = '4';
  const mockRouter = createMockRouter({
    pathname: `/detailedpage/${id}`,
    query: { beer_name: '', page: '1', per_page: '10' },
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const { asFragment } = render(
      <RouterContext.Provider value={mockRouter}>
        <BeerDetails beerInfo={[BeerData[0]]} />
      </RouterContext.Provider>
    );
    const buttonBack = screen.getByText(/Back/i);
    expect(asFragment()).toMatchSnapshot();
    await waitFor(() => {
      expect(buttonBack).toBeInTheDocument();
    });
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <BeerDetails beerInfo={[BeerData[0]]} />
      </RouterContext.Provider>
    );

    const buttonBack = screen.getByText(/Back/i);

    fireEvent.click(buttonBack);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalled();
    });
  });
});
