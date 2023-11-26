import { render, screen } from '@testing-library/react';
import Error404 from '../pages/404';

describe('Tests for the 404 Page component', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(<Error404 />);
    expect(
      screen.getByText(/Oops! Something went wrong.../i)
    ).toBeInTheDocument();
  });
});
