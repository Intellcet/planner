const os = require('os');

const EOL = {
  LF: '\n',
  CRLF: '\r\n',
};

const getLineSeparator = content => {
  if (typeof content !== 'string') return os.EOL;
  if (content.includes(EOL.CRLF)) return EOL.CRLF;
  if (content.includes(EOL.LF)) return EOL.LF;

  return os.EOL;
};

const printDefinition = (tokensList, eol = os.EOL, indent = '  ') => {
  const typings = tokensList
    .map(item => `${indent}readonly ${item}: string;`)
    .join(eol);

  return `declare const styles: {
${typings}
};
export = styles;
`;
};

module.exports = {
  getLineSeparator,
  printDefinition,
};
