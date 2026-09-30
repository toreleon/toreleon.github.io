'use strict';

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
function selectTab(tab, focus = false) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
  if (focus) tab.focus();
}
for (const tab of tabs) {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    const index = tabs.indexOf(tab);
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next], true);
    }
  });
}

document.getElementById('copy-command').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  const button = document.getElementById('copy-command');
  try {
    await navigator.clipboard.writeText(document.getElementById('commands').textContent);
    button.textContent = 'Copied';
    status.textContent = 'Commands copied to your clipboard.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('commands'));
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Clipboard access is unavailable. Commands selected; use your device’s copy shortcut.';
  }
});
