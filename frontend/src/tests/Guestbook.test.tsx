import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Guestbook from '../pages/Guestbook';
import { api } from '../lib/api';
import React from 'react';

// Mock framer-motion to avoid jsdom compatibility issues
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    button: 'button',
    form: 'form',
    article: 'article',
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock the API module
vi.mock('../lib/api', () => ({
  api: {
    getGuestbookSignatures: vi.fn(),
    signGuestbook: vi.fn(),
  }
}));

describe('Guestbook Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the Guestbook page correctly', async () => {
    // Mock the response
    vi.mocked(api.getGuestbookSignatures).mockResolvedValue([
      { id: '1', name: 'John', message: 'Great site!', created_at: new Date().toISOString() }
    ]);

    render(
      <HelmetProvider>
        <MemoryRouter>
          <Guestbook />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('Sign the Guestbook')).toBeInTheDocument();
    
    // Wait for signatures to load
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Great site!')).toBeInTheDocument();
    });
  });
});
