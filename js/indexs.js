import { ru } from './ru.js';
import { en } from './en.js';
// eslint-disable-next-line import/no-cycle
import { MakeButton } from './button.js';

const lang = { en, ru };
console.log(lang);

const boardRows = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Delete'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

export function create(tag, classNames, child, parent, ...attr) {
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
let textarea = create('textarea', 'user-text', null, main);
const text = textarea.value;
const keyboard = create('section', 'keyboard', null, main);
document.body.prepend(main);

window.addEventListener('load', () => {
  textarea.addEventListener('blur', () => {
    textarea.focus();
  });
  textarea.focus();
});

function backspace() {
  const newArea = textarea;
  let cursor = textarea.selectionStart;
  const start = textarea.value.slice(0, cursor);
  const end = textarea.value.slice(cursor);
  newArea.value = `${start.slice(0, -1)}${end}`;
  cursor -= 1;
  return newArea;
}

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

keyboard.addEventListener('mousedown', (e) => {
  const buttonCode = e.target.dataset.code;
  boardRows.forEach((row) => {
    row.forEach((button) => {
      if (button === buttonCode) {
        e.target.classList.add('board-active');
        if (!buttonCode.match(/Del|Tab|Backspace|CapsLock|Enter|ShiftLeft|ShiftRight|ControlLeft|MetaLeft|AltLeft|Space|ControlRight/)) {
          textarea.textContent += e.target.textContent;
        }
        if (buttonCode === 'Delete') {
          textarea = delElement();
        }
        if (buttonCode === 'Backspace') {
          textarea = backspace();
        }
      }
      textarea.selectionStart += 1;
    });
  });
});

keyboard.addEventListener('mouseup', (e) => {
  const buttonCode = e.target.dataset.code;
  boardRows.forEach((row) => {
    row.forEach((button) => {
      if ((button === buttonCode) && e.target.classList.contains('board-active')) {
        e.target.classList.remove('board-active');
      }
    });
  });
});

// const body = document.querySelector('body');
// body.addEventListener('keydown', (e) => {
//   const buttonCode = e.code;
//   boardRows.forEach((row) => {
//     row.forEach((button) => {
//       if (button === buttonCode) {
//         console.log(e.target);
//       }
//     });
//   });
// });
// window.onkeydown = function now(e) {
//   console.log(e.code);
// };
