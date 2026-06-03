import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import Home from '../pages/Home';
import resumeData from '../data/resume.json';

describe('Home Component', () => {
  it('renders the home page correctly with resume data', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Verify it renders the name (split across elements)
    expect(screen.getByText((content, element) => {
      return element?.textContent === resumeData.profile.name;
    })).toBeInTheDocument();
    
    // Verify it renders the tagline
    expect(screen.getByText(resumeData.profile.tagline)).toBeInTheDocument();
  });
});
