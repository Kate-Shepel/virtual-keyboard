const heading = document.createElement('h1');
heading.innerHTML = 'Virtual Keyboard';
heading.classList.add('heading');
document.body.append(heading);
const introInfo = document.createElement('p');
introInfo.innerHTML = 'The Virtual Keyboard was created in Windows operating system. <br> Please use ShiftLeft + AltLeft for language switch.';
introInfo.classList.add('intro-info');
document.body.append(introInfo);
const inputField = document.createElement('textarea');
inputField.id = 'inputField';
inputField.classList.add('input-field');
document.body.appendChild(inputField);
const keyboard = document.createElement('div');
keyboard.id = 'keyboard';
keyboard.classList.add('keyboard');
document.body.appendChild(keyboard);

let lang = localStorage.getItem('lang') || 'eng';
let caps = false;
let shift = false;
let alt = false;

const KEYS = {
  Backquote: ['`', '`', '~', 'ё', 'Ё', 'Ё', '~', 'ё'],
  Digit1: ['1', '1', '!', '1', '1', '!', '!', '!'],
  Digit2: ['2', '2', '@', '2', '2', '"', '@', '"'],
  Digit3: ['3', '3', '#', '3', '3', '№', '#', '№'],
  Digit4: ['4', '4', '$', '4', '4', ';', '$', ';'],
  Digit5: ['5', '5', '%', '5', '5', '%', '%', '%'],
  Digit6: ['6', '6', '^', '6', '6', ':', '^', ':'],
  Digit7: ['7', '7', '&', '7', '7', '?', '&', '?'],
  Digit8: ['8', '8', '*', '8', '8', '*', '*', '*'],
  Digit9: ['9', '9', '(', '9', '9', '(', '(', '('],
  Digit0: ['0', '0', ')', '0', '0', ')', ')', ')'],
  Minus: ['-', '-', '_', '-', '-', '_', '_', '_'],
  Equal: ['=', '=', '+', '=', '=', '+', '+', '+'],
  Tab: ['Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
  KeyA: ['a', 'A', 'A', 'ф', 'Ф', 'Ф', 'a', 'ф'],
  KeyB: ['b', 'B', 'B', 'и', 'И', 'И', 'b', 'и'],
  KeyC: ['c', 'C', 'C', 'с', 'С', 'С', 'c', 'с'],
  KeyD: ['d', 'D', 'D', 'в', 'В', 'В', 'd', 'в'],
  KeyE: ['e', 'E', 'E', 'у', 'У', 'У', 'e', 'у'],
  KeyF: ['f', 'F', 'F', 'а', 'А', 'А', 'f', 'а'],
  KeyG: ['g', 'G', 'G', 'п', 'П', 'П', 'g', 'п'],
  KeyH: ['h', 'H', 'H', 'р', 'Р', 'Р', 'h', 'р'],
  KeyI: ['i', 'I', 'I', 'ш', 'Ш', 'Ш', 'i', 'ш'],
  KeyJ: ['j', 'J', 'J', 'о', 'О', 'О', 'j', 'о'],
  KeyK: ['k', 'K', 'K', 'л', 'Л', 'Л', 'k', 'л'],
  KeyL: ['l', 'L', 'L', 'д', 'Д', 'Д', 'l', 'д'],
  KeyM: ['m', 'M', 'M', 'ь', 'Ь', 'Ь', 'm', 'ь'],
  KeyN: ['n', 'N', 'N', 'т', 'Т', 'Т', 'n', 'т'],
  KeyO: ['o', 'O', 'O', 'щ', 'Щ', 'Щ', 'o', 'щ'],
  KeyP: ['p', 'P', 'P', 'з', 'З', 'З', 'p', 'з'],
  KeyQ: ['q', 'Q', 'Q', 'й', 'Й', 'Й', 'q', 'й'],
  KeyR: ['r', 'R', 'R', 'к', 'К', 'К', 'r', 'к'],
  KeyS: ['s', 'S', 'S', 'ы', 'Ы', 'Ы', 's', 'ы'],
  KeyT: ['t', 'T', 'T', 'е', 'Е', 'Е', 't', 'е'],
  KeyU: ['u', 'U', 'U', 'г', 'Г', 'Г', 'u', 'г'],
  KeyV: ['v', 'V', 'V', 'м', 'М', 'М', 'v', 'м'],
  KeyW: ['w', 'W', 'W', 'ц', 'Ц', 'Ц', 'w', 'ц'],
  KeyX: ['x', 'X', 'X', 'ч', 'Ч', 'Ч', 'x', 'ч'],
  KeyY: ['y', 'Y', 'Y', 'н', 'Н', 'Н', 'y', 'н'],
  KeyZ: ['z', 'Z', 'Z', 'я', 'Я', 'Я', 'z', 'я'],
  BracketLeft: ['[', '[', '{', 'х', 'Х', 'Х', '{', 'х'],
  BracketRight: [']', ']', '}', 'ъ', 'Ъ', 'Ъ', '}', 'ъ'],
  Backslash: ['\\', '\\', '|', '\\', '\\', '/', '|', '/'],
  Delete: ['Del', 'Del', 'Del', 'Del', 'Del', 'Del', 'Del', 'Del'],
  Comma: [',', ',', '<', 'б', 'Б', 'Б', '<', 'б'],
  Period: ['.', '.', '>', 'ю', 'Ю', 'Ю', '>', 'ю'],
  Slash: ['/', '/', '?', '.', '.', ',', '?', ','],
  Backspace: ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace'],
  Enter: ['Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
  CapsLock: ['Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock'],
  ShiftLeft: ['Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
  ShiftRight: ['Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
  ControlLeft: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
  ControlRight: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
  MetaLeft: ['Win', 'Win', 'Win', 'Win', 'Win', 'Win', 'Win', 'Win'],
  AltLeft: ['Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
  AltRight: ['Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
  Space: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ArrowUp: ['▲', '▲', '▲', '▲', '▲', '▲', '▲', '▲'],
  ArrowRight: ['►', '►', '►', '►', '►', '►', '►', '►'],
  ArrowDown: ['▼', '▼', '▼', '▼', '▼', '▼', '▼', '▼'],
  ArrowLeft: ['◄', '◄', '◄', '◄', '◄', '◄', '◄', '◄'],
  Semicolon: [';', ';', ':', 'ж', 'Ж', 'Ж', ':', 'ж'],
  Quote: ['\'', '\'', '"', 'э', 'Э', 'Э', '"', 'э']
};

const KEYBOARD_LAYOUT = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']
];

function getKeyChar(keyCode) {
  const keyData = KEYS[keyCode];
  if (!keyData) return '';

  if (lang === 'eng') {
    if (caps && shift) return keyData[6];
    if (caps && !shift) return keyData[1];
    if (!caps && shift) return keyData[2];
    if (!caps && !shift) return keyData[0];
  } else if (lang === 'rus') {
    if (caps && shift) return keyData[7];
    if (caps && !shift) return keyData[4];
    if (!caps && shift) return keyData[5];
    if (!caps && !shift) return keyData[3];
  }

  return keyData[0];
}

function updateKeys() {
  const keys = document.querySelectorAll('.key');
  keys.forEach((key) => {
    const code = key.getAttribute('data-key');
    const keyData = KEYS[code];
    let text;

    if (shift && caps && lang === 'eng') {
      text = keyData[6];
    } else if (shift && caps && lang === 'rus') {
      text = keyData[7];
    } else if (shift) {
      if (lang === 'eng') {
        text = keyData[2];
      } else {
        text = keyData[5];
      }
    } else if (caps) {
      if (lang === 'eng') {
        text = keyData[1];
      } else {
        text = keyData[4];
      }
    } else if (lang === 'eng') {
      text = keyData[0];
    } else {
      text = keyData[3];
    }

    key.textContent = text;
  });
}

function deleteCharacterAfterCursor() {
  const textArea = document.querySelector('#inputField');
  const start = textArea.selectionStart;
  const end = textArea.selectionEnd;

  if (start === end) {
    const newValue = textArea.value.slice(0, start) + textArea.value.slice(start + 1);
    textArea.value = newValue;
    textArea.selectionStart = start;
    textArea.selectionEnd = start;
  } else {
    const newValue = textArea.value.slice(0, start) + textArea.value.slice(end);
    textArea.value = newValue;
    textArea.selectionStart = start;
    textArea.selectionEnd = start;
  }
}

KEYBOARD_LAYOUT.forEach(row => {
  const rowElement = document.createElement('div');
  rowElement.classList.add('row');

  row.forEach(keyCode => {
    const keyElement = document.createElement('button');
    keyElement.textContent = getKeyChar(keyCode);
    keyElement.classList.add('key');
    keyElement.dataset.key = keyCode;

    keyElement.addEventListener('mousedown', () => {
      switch (keyCode) {
        case 'ShiftLeft':
        case 'ShiftRight':
          shift = true;
          updateKeys();
          keyElement.classList.add('key_pressed');
          break;
        case 'AltLeft':
          alt = true;
          keyElement.classList.add('key_pressed');
          break;
        default:
          break;
      }
    });

    keyElement.addEventListener('mouseup', () => {
      switch (keyCode) {
        case 'ShiftLeft':
        case 'ShiftRight':
          shift = false;
          updateKeys();
          keyElement.classList.remove('key_pressed');
          break;
        case 'AltLeft':
          alt = false;
          keyElement.classList.remove('key_pressed');
          break;
        default:
          break;
      }
    });

    keyElement.addEventListener('click', () => {
      switch (keyCode) {
        case 'Backspace':
          inputField.value = inputField.value.slice(0, -1);
          break;
        case 'Space':
          inputField.value += ' ';
          break;
        case 'Enter':
          inputField.value += '\n';
          break;
        case 'Tab':
          inputField.value += '    ';
          break;
        case 'CapsLock':
          caps = !caps;
          updateKeys();
          if (caps) keyElement.classList.add('key_pressed');
          else keyElement.classList.remove('key_pressed');
          break;
        case 'Delete':
          deleteCharacterAfterCursor();
          break;
        case 'ShiftLeft':
          if (alt) {
            lang = lang === 'eng' ? 'rus' : 'eng';
            localStorage.setItem('lang', lang);
            updateKeys();
          }
          break;
        case 'ShiftRight':
          break;
        case 'ControlLeft':
          break;
        case 'MetaLeft':
          break;
        case 'ControlRight':
          break;
        case 'AltLeft':
          break;
        case 'AltRight':
          break;
        default:
          inputField.value += getKeyChar(keyCode);
      }
    });

    rowElement.appendChild(keyElement);
  });

  keyboard.appendChild(rowElement);
});

updateKeys();

document.addEventListener('keydown', (event) => {
  const key = document.querySelector(`.key[data-key="${event.code}"]`);
  if (key) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      shift = true;
      updateKeys();
    }
    key.classList.add('key_pressed');
  }
});

document.addEventListener('keyup', (event) => {
  const key = document.querySelector(`.key[data-key="${event.code}"]`);
  if (key) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      shift = false;
      updateKeys();
    }
    if (event.code !== 'CapsLock' && event.code !== 'ControlLeft') {
      key.classList.remove('key_pressed');
    }
  }
});

function handleKeyDown(event) {
  const keyCode = event.code;
  const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (keyElement) {
    switch (keyCode) {
      case 'CapsLock':
        caps = !caps;
        updateKeys();
        if (caps) {
          keyElement.classList.add('key_pressed');
        } else {
          keyElement.classList.remove('key_pressed');
        }
        break;
      case 'Delete':
        deleteCharacterAfterCursor();
        break;
      default:
        keyElement.classList.add('key_pressed');
    }
  }
}

function handleKeyUp(event) {
  const keyCode = event.code;
  const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (keyElement && keyCode !== 'CapsLock') {
    keyElement.classList.remove('key_pressed');
  }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyboardEvent(event) {
  if (event.code === 'ShiftLeft' || event.code === 'AltLeft') {
    if (event.type === 'keydown') {
      if (event.shiftKey && event.altKey) {
        lang = lang === 'eng' ? 'rus' : 'eng';
        localStorage.setItem('lang', lang);
        updateKeys();
      }
    }
  }
}

document.addEventListener('keydown', handleKeyboardEvent);
document.addEventListener('keyup', handleKeyboardEvent);
