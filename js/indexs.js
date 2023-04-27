/* eslint-disable import/no-cycle */
// import ru from './ru.js';
import en from './en.js';
import MakeButton from './button.js';

const boardRows = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Del'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
  ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

export default function create(tag, classNames, child, parent, ...attr) {
  const el = document.createElement(tag);
  if (classNames) {
    el.classList.add(...classNames.split(' '));
  }
  if (child && Array.isArray(child)) {
    child.forEach((childEl) => childEl && el.append(childEl));
  } else if (child && typeof child === 'object') {
    el.append(child);
  } else if (child && typeof child === 'string') {
    el.textContent = child;
  }

  if (parent) {
    parent.append(el);
  }
  if (attr.length) {
    attr.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        el.setAttribute(attrName, '');
      }
      if (attrName.match(/value|id|placeholder|type/)) {
        el.setAttribute(attrName, attrValue);
      } else {
        el.dataset[attrName] = attrValue;
      }
    });
  }
  return el;
}

const h1 = create('h1', 'title', 'Виртуальная клавиатура');
const main = create('main', '', h1);
create('textarea', 'user-text', null, main);
const keyboard = create('section', 'keyboard', null, main);
document.body.prepend(main);

class Keyboard {
  constructor() {
    this.boardRows = boardRows;
    this.keysPressed = {};
    this.isCaps = false;
  }

  generateBoard() {
    this.keyButtons = [];
    this.boardRows.forEach((row, i) => {
      const rowEl = create('div', 'board-row', null, keyboard, [
        'row',
        i + 1,
      ]);
      row.forEach((code) => {
        const keyObj = en.find((key) => key.code === code);
        if (keyObj) {
          const keyButton = new MakeButton(keyObj);
          this.keyButtons.push(keyButton);
          rowEl.append(keyButton.div);
        }
      });
    });
  }
}
new Keyboard(boardRows).generateBoard();
document.onkeydown = (e )=> {
  console.log(e.code);
}
