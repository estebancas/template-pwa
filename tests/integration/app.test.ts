import { beforeEach, describe, expect, it } from 'vitest';
import { mountApp } from '../../src/app';

function find(label: string): HTMLButtonElement {
  const match = [...document.querySelectorAll('button')].find((b) => b.textContent === label);
  if (!match) throw new Error(`No button labelled "${label}"`);
  return match;
}

const count = (): string | null => document.querySelector('output')?.textContent ?? null;

describe('counter app', () => {
  beforeEach(() => {
    document.body.innerHTML = '<main id="app"></main>';
    const root = document.getElementById('app');
    if (!root) throw new Error('missing root');
    mountApp(root);
  });

  it('renders a heading and starts at zero', () => {
    expect(document.querySelector('h1')?.textContent).toBe('Counter');
    expect(count()).toBe('0');
  });

  it('announces the count politely to screen readers', () => {
    expect(document.querySelector('p')?.getAttribute('aria-live')).toBe('polite');
  });

  it('starts with Decrease disabled and Increase enabled', () => {
    expect(find('Decrease').disabled).toBe(true);
    expect(find('Increase').disabled).toBe(false);
  });

  it('counts up and down with the buttons', () => {
    find('Increase').click();
    find('Increase').click();
    expect(count()).toBe('2');
    find('Decrease').click();
    expect(count()).toBe('1');
    expect(find('Decrease').disabled).toBe(false);
  });

  it('disables Increase at the maximum and Decrease again at the minimum', () => {
    for (let i = 0; i < 10; i++) find('Increase').click();
    expect(count()).toBe('10');
    expect(find('Increase').disabled).toBe(true);
    expect(find('Decrease').disabled).toBe(false);

    for (let i = 0; i < 10; i++) find('Decrease').click();
    expect(count()).toBe('0');
    expect(find('Decrease').disabled).toBe(true);
  });

  it('keeps Increase enabled one step below the maximum', () => {
    for (let i = 0; i < 9; i++) find('Increase').click();
    expect(find('Increase').disabled).toBe(false);
  });

  it('replaces earlier content when mounted again', () => {
    const root = document.getElementById('app');
    if (!root) throw new Error('missing root');
    find('Increase').click();
    mountApp(root);
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(count()).toBe('0');
  });
});
