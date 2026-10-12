import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../../src/App';

const button = (name: string): HTMLButtonElement => screen.getByRole('button', { name });
const count = (): string | null => document.querySelector('output')?.textContent ?? null;

async function click(name: string, times = 1): Promise<void> {
  const user = userEvent.setup();
  for (let i = 0; i < times; i++) await user.click(button(name));
}

describe('counter app', () => {
  it('renders a heading and starts at zero', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Counter' })).toBeTruthy();
    expect(count()).toBe('0');
  });

  it('announces the count politely to screen readers', () => {
    render(<App />);
    expect(document.querySelector('p')?.getAttribute('aria-live')).toBe('polite');
  });

  it('starts with Decrease disabled and Increase enabled', () => {
    render(<App />);
    expect(button('Decrease').disabled).toBe(true);
    expect(button('Increase').disabled).toBe(false);
  });

  it('counts up and down with the buttons', async () => {
    render(<App />);
    await click('Increase', 2);
    expect(count()).toBe('2');
    await click('Decrease');
    expect(count()).toBe('1');
    expect(button('Decrease').disabled).toBe(false);
  });

  it('disables Increase at the maximum and Decrease again at the minimum', async () => {
    render(<App />);
    await click('Increase', 10);
    expect(count()).toBe('10');
    expect(button('Increase').disabled).toBe(true);
    expect(button('Decrease').disabled).toBe(false);

    await click('Decrease', 10);
    expect(count()).toBe('0');
    expect(button('Decrease').disabled).toBe(true);
  });

  it('keeps Increase enabled one step below the maximum', async () => {
    render(<App />);
    await click('Increase', 9);
    expect(button('Increase').disabled).toBe(false);
  });

  it('starts at zero again when rendered fresh', async () => {
    const first = render(<App />);
    await click('Increase');
    first.unmount();
    render(<App />);
    expect(count()).toBe('0');
  });
});
