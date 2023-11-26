import { render, screen } from '@testing-library/react';
import Error from '../pages/_error';

describe('Tests for the error Page component', () => {
  it('Ensure that the _error page is displayed when navigating to an invalid route', () => {
    render(<Error />);
    expect(screen.getByText(/Error!!!/i)).toBeInTheDocument();
  });
});
