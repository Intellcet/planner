const os = require("os");
const postcss = require('postcss');


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

// opts = { convertToVW: boolean, width: number, convertToHW: boolean, height: number }
module.exports = opts => {
  return {
    postcssPlugin: 'postcss-px-to-viewport',
    Declaration: decl => {
      const tokens = decl.toString();
      const arrayOfTokens = tokens.split(getLineSeparator(tokens));
    },
  };
};

module.exports.postcss = true;
