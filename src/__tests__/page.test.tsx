/// <reference types="vitest/globals" />

import { render, screen } from '@testing-library/react';
import Home from '../app/page';

vi.mock('next/image', () => ({
  default: ({ priority, ...props }: { priority?: boolean; [key: string]: any }) => <img {...props} alt={props.alt || ''} />
}));

test('renders homepage', () => {
  render(<Home />);
  expect(screen.getByText('To get started, edit the page.js file.')).toBeInTheDocument();
});