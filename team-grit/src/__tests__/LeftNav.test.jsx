import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import LeftNav from '../components/LeftNav';

describe('LeftNav', () => {
  const onUserSelect = vi.fn();
  const onFileSelect = vi.fn();

  test('shows only groups containing the student', () => {
    const groups = [
      { id: 1, users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] },
      { id: 2, users: [{ id: 3, name: 'Carol' }] },
    ];
    const currentUser = { id: 1, role: 'student' };
    render(
      <LeftNav
        files={[]}
        groups={groups}
        currentUser={currentUser}
        onFileSelect={onFileSelect}
        onUserSelect={onUserSelect}
      />
    );
    expect(screen.getByText(/Group 1/)).toBeInTheDocument();
    expect(screen.queryByText(/Group 2/)).toBeNull();
  });
});
