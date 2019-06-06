

export const repeat = (list, tpl) => {
  return list.reduce((t, it, i) => t + tpl(it, i), '');
}

export const classMap = (classObj) => {
  return Object.keys(classObj).filter(clz => classObj[clz] || '').join(' ');
}

export const styleMap = (styleObj) => {
  return Object.keys(styleObj).filter(style => styleObj[style]).join(' ');
}

export const toCamelCase = (str) => {
  return str.replace(/(-[a-z])/g, t => t[1].toUpperCase());
}

export const toSnakeCase = (str) => {
  return str.replace(/[A-Z]/g, t => '-' + t.toLowerCase());
}

export const KeyCode = {
  BACKSPACE: 8,
  TAB: 9,
  CLEAR: 12,
  ENTER: 13,
  SHIFT: 16,
  CONTROL: 17,
  ALT: 18,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACEBAR: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  INSERT: 45,
  DELETE: 46,
  HELP: 47,
  NUM_LOCK: 144
};
