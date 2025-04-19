import { render, screen, waitFor } from '@testing-library/react';

import KanbanBoard from "../components/KanbanBoard";

// mock socket.io-client library

test("WebSocket receives task update", async () => {
  render(<KanbanBoard />);

  await waitFor(() => screen.getByText(/Task/i));
});

// TODO: Add more integration tests
