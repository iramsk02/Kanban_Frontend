import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import KanbanBoard from '../../components/KanbanBoard';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios'); // Mock axios for API calls

// Mock ChartJS to avoid rendering full canvas in test
vi.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="mock-chart" />,
}));

describe('KanbanBoard', () => {
  // Sample mock tasks to be returned by the axios call
  const mockTasks = [
    { id: 1, title: 'Task 1', description: 'Desc 1', status: 'todo', priority: 'High' },
    { id: 2, title: 'Task 2', description: 'Desc 2', status: 'in-progress', priority: 'Medium' },
    { id: 3, title: 'Task 3', description: 'Desc 3', status: 'done', priority: 'Low' },
  ];

  // Before each test, mock axios GET request to return mock tasks
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockTasks });
  });

  // Clear mocks after each test to ensure no leftover state
  afterEach(() => {
    vi.clearAllMocks();
  });

  // Test the initial loading state
  it('renders loading initially', () => {
    render(<KanbanBoard />);
    expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
  });

  // Test that tasks and columns render correctly
  it('renders columns and tasks correctly', async () => {
    render(<KanbanBoard />);

    // Wait for tasks to load and columns to appear
    await waitFor(() => {
      expect(screen.getByText('To Do')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
    });

    // Check if each task is displayed
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();

    // Ensure the chart is rendered (mocked version)
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });

  // Test that the move and delete API calls work
  it('should call move and delete APIs correctly', async () => {
    // Mock the PUT and DELETE requests
    axios.put.mockResolvedValue({ data: {} });
    axios.delete.mockResolvedValue({ data: {} });

    render(<KanbanBoard />);

    // Wait for the tasks to load before interacting with them
    await waitFor(() => screen.getByText('Task 1'));

    // Test the "move" button functionality (move task to 'in-progress')
    const moveBtn = screen.getAllByText(/move to in progress/i)[0];
    fireEvent.click(moveBtn);

    // Assert that the PUT request was made with correct URL and payload
    await waitFor(() =>
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:5000/api/tasks/1', // Task ID
        { status: 'in-progress' } // New status
      )
    );

    // Test the "delete" button functionality (delete task)
    const deleteBtn = screen.getAllByText(/delete/i)[0];
    fireEvent.click(deleteBtn);

    // Assert that the DELETE request was made with correct URL
    await waitFor(() =>
      expect(axios.delete).toHaveBeenCalledWith(
        'http://localhost:5000/api/tasks/1' // Task ID
      )
    );
  });
});
