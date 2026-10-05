import { decrement, increment, MAX, MIN } from './counter';

function button(label: string): HTMLButtonElement {
  const el = document.createElement('button');
  el.type = 'button';
  el.textContent = label;
  return el;
}

/** Renders the starter counter into `root`. Replace this with your app. */
export function mountApp(root: HTMLElement): void {
  let count = MIN;

  const heading = document.createElement('h1');
  heading.textContent = 'Counter';

  const status = document.createElement('p');
  status.setAttribute('aria-live', 'polite');
  status.append('Count: ');
  const output = document.createElement('output');
  status.append(output);

  const down = button('Decrease');
  const up = button('Increase');
  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.append(down, up);

  const render = (): void => {
    output.textContent = String(count);
    down.disabled = count <= MIN;
    up.disabled = count >= MAX;
  };

  down.addEventListener('click', () => {
    count = decrement(count);
    render();
  });
  up.addEventListener('click', () => {
    count = increment(count);
    render();
  });

  root.replaceChildren(heading, status, actions);
  render();
}
