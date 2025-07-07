import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import CodeViewPage from '../pages/CodeViewPage';

vi.stubGlobal('fetch', vi.fn());

const mockGroups = [
  { id: 1, users: [{ id: 5, name: 'Bob' }] },
];

const mockSubmissions = [
  {
    id: 10,
    assignment: 3,
    user: 5,
    files: [
      { id: 3, name: 'main.py', submission: 10, content: 'print(1)' },
    ],
  },
];

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={["/code/3"]}>
      <Routes>
        <Route path="/code/:assignmentId" element={<CodeViewPage currentUser={{ id: 5, role: 'teacher' }} />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('CodeViewPage', () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  test('fetches groups on mount', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockGroups) });
    renderWithRouter();
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/assignments/3/groups/');
    expect(await screen.findByText(/Group 1/)).toBeInTheDocument();
  });

  test('selecting a user loads files and displays code', async () => {
    fetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockGroups) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSubmissions) });
    renderWithRouter();
    await screen.findByText(/Group 1/);
    await userEvent.click(screen.getByText('Bob'));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    const fileItem = await screen.findByText(/file name: main.py/);
    await userEvent.click(fileItem);
    expect(screen.getByText(/1\s+print\(1\)/)).toBeInTheDocument();
  });

  test('adds a comment to the list', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockGroups) });
    renderWithRouter();
    await screen.findByText(/Group 1/);
    await userEvent.type(screen.getByPlaceholderText(/Enter a line number/i), '5');
    await userEvent.type(screen.getByPlaceholderText(/Add a comment/i), 'Great job');
    await userEvent.click(screen.getByRole('button', { name: /submit comment/i }));
    expect(screen.getByText(/CurrentUser/)).toBeInTheDocument();
    expect(screen.getByText(/Great job/)).toBeInTheDocument();
  });
});
