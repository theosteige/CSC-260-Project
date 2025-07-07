import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../pages/LoginPage';
import { MemoryRouter } from 'react-router-dom';

describe('LoginPage', () => {
  test('renders email field and login button', () => {
    render(
      <MemoryRouter>
        <LoginPage onLoginSuccess={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Code Review Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error when submitting empty email', async () => {
    render(
      <MemoryRouter>
        <LoginPage onLoginSuccess={() => {}} />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/Please enter your email/i)).toBeInTheDocument();
  });
});
