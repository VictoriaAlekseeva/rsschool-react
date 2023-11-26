import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { BeerData } from '@/__test__/utils/mockData';
import createMockRouter from '@/__test__/utils/mockRouter';
import SearchResults from '@/components/searchResults/SearchResults';

describe('Tests for the Card List component', () => {
  const mockRouter = createMockRouter({
    query: { beer_name: 'ipa', page: '1', per_page: '10' },
  });

  it('Verify that the component renders the specified number of cards', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <SearchResults beerData={BeerData} />
      </RouterContext.Provider>
    );

    expect(screen.getAllByText(/ABV:/i)).toHaveLength(BeerData?.length);
  });

  it('Check that an appropriate message is displayed if no cards are present.', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <SearchResults beerData={[]} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(/No beer found/i)).toBeInTheDocument();
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <SearchResults beerData={BeerData} />
      </RouterContext.Provider>
    );

    fireEvent.click(screen.getAllByRole('beerItem')[0]);

    expect(mockRouter.push).toHaveBeenCalledWith(expect.stringContaining(`4`));
  });
});
