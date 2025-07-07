import { render, screen, waitFor } from '@testing-library/react';
import AssignmentListPage from '../pages/AssignmentListPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.stubGlobal('fetch', vi.fn());

const mockAssignments = [
  { id: 1, name: 'HW1', description: 'first' },
  { id: 2, name: 'HW2', description: 'second' },
];

describe('AssignmentListPage', () => {
  beforeEach(() => {
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockAssignments) });
  });

  afterEach(() => {
    fetch.mockReset();
  });

  test('renders assignments from API', async () => {
    const currentClass = { id: 3, name: 'Algorithms', description: 'Algo class' };
    render(
      <MemoryRouter initialEntries={[{ pathname: '/assignments/3', state: { currentClass } }]}> 
        <Routes>
          <Route path="/assignments/:classId" element={<AssignmentListPage currentUser={{ role: 'teacher' }} />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(await screen.findByText(/HW1/)).toBeInTheDocument();
  });
});
