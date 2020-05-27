'use strict';

function tags (
  name,
  str = '',
  options = {},
  newlineInside = false,
  newlineAfter = false
) {
  let output = `<${name}`;
  const linebreakInside = newlineInside ? '\n' : '';
  const linebreakAfter = newlineAfter ? '\n' : '';
  output += extractOptions(options, output);
  output += `>${linebreakInside}${str}</${name}>${linebreakAfter}`;
  return output;
}

function tag (name, options = {}, newlineAfter = false) {
  let output = `<${name}${extractOptions(options)} />`;
  output += newlineAfter ? '\n' : '';
  return output;
}

function extractOptions (options) {
  let output = '';
  const entries = Object.entries(options);
  for (const [name, value] of entries) {
    if (value !== undefined) {
      output += ` ${name}="${value}"`;
    } else {
      output += ` ${name}`;
    }
  }
  return output;
}

exports.html = function html (str, options = {}) {
  return '<!DOCTYPE html>\n' + tags('html', str, options, true, true);
};

exports.form = function form (str, options = {}) {
  return tags('form', str, options, true, true);
};

exports.head = function head (str, options = {}) {
  return tags('head', str, options, true, true);
};

exports.title = function title (str, options = {}) {
  return tags('title', str, options, false, true);
};

exports.link = function link (options) {
  return tag('link', options, true);
};

exports.body = function body (str, options = {}) {
  return tags('body', str, options, true, true);
};

exports.h1 = function h1 (str, options = {}) {
  return tags('h1', str, options, false, true);
};

exports.h2 = function h2 (str, options = {}) {
  return tags('h2', str, options, false, true);
};

exports.h3 = function h3 (str, options = {}) {
  return tags('h3', str, options, false, true);
};

exports.p = function p (str, options = {}) {
  return tags('p', str, options, false, true);
};

exports.div = function div (str, options = {}) {
  return tags('div', str, options, false, true);
};

exports.canvas = function canvas (str, options = {}) {
  return tags('canvas', str, options, false, true);
};

exports.span = function span (str, options = {}) {
  return tags('span', str, options);
};

exports.ol = function ol (str, options = {}) {
  return tags('ol', str, options, true, true);
};

exports.ul = function ul (str, options = {}) {
  return tags('ul', str, options, true, true);
};

exports.li = function li (str, options = {}) {
  return tags('li', str, options, false, true);
};

exports.a = function a (str, options = {}) {
  return tags('a', str, options);
};

exports.label = function label (str, options = {}) {
  return tags('label', str, options);
};

exports.input = function input (str, options = {}) {
  return tag('input', str, options, true);
};

exports.button = function button (str, options = {}) {
  return tags('button', str, options);
};

exports.link = function link (str, options = {}) {
  return tag('link', str, options, true);
};

exports.script = function script (str, options = {}) {
  return tags('script', str, options, true, true);
};

exports.style = function style (str, options = {}) {
  return tags('style', str, options, true, true);
};

exports.table = function table (str, options = {}) {
  return tags('table', str, options, true, true);
};

exports.thead = function thead (str, options = {}) {
  return tags('thead', str, options, true, true);
};

exports.tbody = function tbody (str, options = {}) {
  return tags('tbody', str, options, true, true);
};

exports.tr = function tr (str, options = {}) {
  return tags('tr', str, options, false, true);
};

exports.th = function th (str, options = {}) {
  return tags('th', str, options, false, false);
};

exports.td = function td (str, options = {}) {
  return tags('td', str, options, false, false);
};

exports.b = function b (str, options = {}) {
  return tags('b', str, options, false, false);
};

exports.br = function br (str, options = {}) {
  return tags('br', str, options);
};
