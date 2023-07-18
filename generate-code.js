const fs = require('fs');
const Color = require('./js/color');
const colorFile = fs.createWriteStream('_color.scss');
const extButtonData = require('./js/extract-button-data');

try {
  const data = fs.readFileSync('./json/tokens.json', 'utf8');
  const customColor = JSON.parse(data)['custom-color'];

  const result = Object.entries(customColor).map(([key, data]) => {
    return new Color(key, data.value).scssVariables;
  });

  colorFile.on('error', (err) => {
    console.error('error', err);
  });

  let colorTxt = result.reduce((acc, r) => {
    return (acc += `${r};\n`);
  }, '');
  console.log({colorTxt})

  colorTxt =
    extButtonData().reduce((acc, b) => {
      return (acc += `${b.name.toLowerCase()}: $${b.alias},\n`);
    }, colorTxt + '\n $btn: (') + ');';

  colorFile.write(colorTxt);

  colorFile.end();
} catch (err) {
  console.error(err);
}
