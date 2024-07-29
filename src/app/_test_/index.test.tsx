import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '@/app/(navbarWrapper)/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue({ get: jest.fn() })
}));

describe('Home', () => {
  it('renders a heading', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', {
      name: /welcome/i
    });

    expect(heading).toBeInTheDocument();
  });
});