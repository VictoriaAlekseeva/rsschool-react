import { render, screen } from '@testing-library/react';
import Error500 from '../pages/500';

describe('Tests for the 404 Page component', () => {
  it('Ensure that the 500 page is displayed when navigating to an invalid route', () => {
    render(<Error500 />);
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });
});
