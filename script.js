const heading = document.createElement('h1');
heading.innerHTML = 'Virtual Keyboard';
heading.classList.add('heading');
document.body.append(heading);
const introInfo = document.createElement('p');
introInfo.innerHTML = 'The Virtual Keyboard was created in Windows operating system. <br> Please use LeftCtrl for language switch.';
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

const KEYS = {
  // SymbolOptions: ['Eng', 'Eng + Caps', 'Eng + Shift', 'Rus', 'Rus + Caps', 'Rus + Shift']
  Backquote: ['`', '`', '~', 'ё', 'Ё', 'Ё'],
  Number1: ['1', '1', '!', '1', '1', '!'],
  Number2: ['2', '2', '@', '2', '2', '"'],
  Number3: ['3', '3', '#', '3', '3', '№'],
  Number4: ['4', '4', '$', '4', '4', ';'],
  Number5: ['5', '5', '%', '5', '5', '%'],
  Number6: ['6', '6', '^', '6', '6', ':'],
  Number7: ['7', '7', '&', '7', '7', '?'],
  Number8: ['8', '8', '*', '8', '8', '*'],
  Number9: ['9', '9', '(', '9', '9', '('],
  Number0: ['0', '0', ')', '0', '0', ')'],
  Hyphen: ['-', '-', '_', '-', '-', '_'],
  Equal: ['=', '=', '+', '=', '=', '+'],
  Tab: ['Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
  KeyA: ['a', 'A', 'A', 'ф', 'Ф', 'Ф'],
  KeyB: ['b', 'B', 'B', 'и', 'И', 'И'],
  KeyC: ['c', 'C', 'C', 'с', 'С', 'С'],
  KeyD: ['d', 'D', 'D', 'в', 'В', 'В'],
  KeyE: ['e', 'E', 'E', 'у', 'У', 'У'],
  KeyF: ['f', 'F', 'F', 'а', 'А', 'А'],
  KeyG: ['g', 'G', 'G', 'п', 'П', 'П'],
  KeyH: ['h', 'H', 'H', 'р', 'Р', 'Р'],
  KeyI: ['i', 'I', 'I', 'ш', 'Ш', 'Ш'],
  KeyJ: ['j', 'J', 'J', 'о', 'О', 'О'],
  KeyK: ['k', 'K', 'K', 'л', 'Л', 'Л'],
  KeyL: ['l', 'L', 'L', 'д', 'Д', 'Д'],
  KeyM: ['m', 'M', 'M', 'ь', 'Ь', 'Ь'],
  KeyN: ['n', 'N', 'N', 'т', 'Т', 'Т'],
  KeyO: ['o', 'O', 'O', 'щ', 'Щ', 'Щ'],
  KeyP: ['p', 'P', 'P', 'з', 'З', 'З'],
  KeyQ: ['q', 'Q', 'Q', 'й', 'Й', 'Й'],
  KeyR: ['r', 'R', 'R', 'к', 'К', 'К'],
  KeyS: ['s', 'S', 'S', 'ы', 'Ы', 'Ы'],
  KeyT: ['t', 'T', 'T', 'е', 'Е', 'Е'],
  KeyU: ['u', 'U', 'U', 'г', 'Г', 'Г'],
  KeyV: ['v', 'V', 'V', 'м', 'М', 'М'],
  KeyW: ['w', 'W', 'W', 'ц', 'Ц', 'Ц'],
  KeyX: ['x', 'X', 'X', 'ч', 'Ч', 'Ч'],
  KeyY: ['y', 'Y', 'Y', 'н', 'Н', 'Н'],
  KeyZ: ['z', 'Z', 'Z', 'я', 'Я', 'Я'],
  BracketLeft: ['[', '[', '{', 'х', 'Х', 'Х'],
  BracketRight: [']', ']', '}', 'ъ', 'Ъ', 'Ъ'],
  Backslash: ['\\', '\\', '|', '\\', '\\', '/'],
  Del: ['Del', 'Del', 'Del', 'Del', 'Del', 'Del'],
  Comma: [',', ',', '<', 'б', 'Б', 'Б'],
  Period: ['.', '.', '>', 'ю', 'Ю', 'Ю'],
  Slash: ['/', '/', '?', '.', '.', ','],
  Backspace: ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace'],
  Enter: ['Enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
  Caps: ['Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock'],
  ShiftLeft: ['Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
  ShiftRight: ['Shift', 'Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
  CtrlLeft: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
  CtrlRight: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
  Win: ['Win', 'Win', 'Win', 'Win', 'Win', 'Win'],
  AltLeft: ['Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
  AltRight: ['Alt', 'Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
  Space: [' ', ' ', ' ', ' ', ' ', ' '],
  ArrowUp: ['▲', '▲', '▲', '▲', '▲', '▲'],
  ArrowRight: ['►', '►', '►', '►', '►', '►'],
  ArrowDown: ['▼', '▼', '▼', '▼', '▼', '▼'],
  ArrowLeft: ['◄', '◄', '◄', '◄', '◄', '◄'],
  Semicolon: [';', ';', ':', 'ж', 'Ж', 'Ж'],
  Quote: ['\'', '\'', '"', 'э', 'Э', 'Э']
};

const KEYBOARD_LAYOUT = [
  ['Backquote', 'Number1', 'Number2', 'Number3', 'Number4', 'Number5', 'Number6', 'Number7', 'Number8', 'Number9', 'Number0', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Del'],
  ['Caps', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['CtrlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'CtrlRight']
];
