import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTaskForm from '../../components/AddTaskForm';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('AddTaskForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all input fields', () => {
    render(<AddTaskForm />);
    expect(screen.getByPlaceholderText(/task title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/➕ add task/i)).toBeInTheDocument();
  });

  it('fills the form and submits a task successfully', async () => {
    const taskResponse = { data: { id: '123', title: 'Test Task' }, status: 200 };
    const uploadResponse = {
      data: { task: { attachment: 'http://localhost:5000/uploads/test.png' } },
    };

    axios.post
      .mockResolvedValueOnce(taskResponse) // For task creation
      .mockResolvedValueOnce(uploadResponse); // For file upload

    render(<AddTaskForm />);

    fireEvent.change(screen.getByPlaceholderText(/task title/i), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: 'This is a description' },
    });

    // Optional: mock file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
   

    fireEvent.change(screen.getByLabelText(/Upload Attachment/i), {
      target: { files: [file] },
    });
    

    fireEvent.click(screen.getByText(/add task/i));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/tasks',
        expect.objectContaining({
          title: 'Test Task',
          description: 'This is a description',
          priority: 'Medium',
          category: 'Feature',
          status: 'todo',
        })
      )
    );

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/tasks/upload/123',
        expect.any(FormData)
      )
    );

    // ✅ Check for preview
    expect(await screen.findByText(/attachment preview/i)).toBeInTheDocument();
    expect(await screen.findByAltText(/uploaded preview/i)).toBeInTheDocument();
  });

  it('handles API failure gracefully', async () => {
    axios.post.mockRejectedValue(new Error('Server error'));

    render(<AddTaskForm />);

    fireEvent.change(screen.getByPlaceholderText(/task title/i), {
      target: { value: 'Broken Task' },
    });

    fireEvent.click(screen.getByText(/add task/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      // Add your error message display if you show any in UI
    });
  });
});
