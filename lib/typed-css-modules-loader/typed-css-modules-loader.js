const fs = require('fs');
const { getLineSeparator, printDefinition } = require('./print-utils');

const getTokens = content => {
  const tokens = [];

  // Only `locals` export is desired

  const locals = content.match(/exports\.locals = ([\s\S]*);/);

  if (!locals) return tokens;
  let match;

  // RegExp.exec is state-full, so we need to initialize new one for each run
  const re = /"(.*?)":.*\n/g;
  while ((match = re.exec(locals[1])) !== null) tokens.push(match[1]);

  return tokens;
};

function typedCssModuleLoader(content) {
  const tokens = getTokens(content);

  // NOTE: We cannot use .emitFile as people might use this with devServer
  // (e.g. in memory storage).
  const outputPath = this.resourcePath + '.d.ts';
  fs.writeFile(
    outputPath,
    printDefinition(tokens, getLineSeparator(content)),
    {},
    function() {}
  );

  return content;
};

module.exports = typedCssModuleLoader;
