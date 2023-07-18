const fs = require('fs');

const extButtonData = () => {
  try {
    const data = fs.readFileSync('./json/button-50:314.json', 'utf8');
    const nodes = JSON.parse(data).nodes['50:314'];
    const components = nodes.components;
    const { BTN } = nodes.document.componentPropertyDefinitions;
    const btns = nodes.document.children;
    const styles = nodes.styles;

    const filterData = [];

    BTN.variantOptions.forEach((name) => {
      Object.entries(components).forEach(([key, data]) => {
        if (data.name.includes(name) && data.name.includes('Enabled') && data.name.includes('Off')) {
          filterData.push({ key, name });
        }
      });
    });

    filterData.forEach((variant) => {
      btns.forEach((btn) => {
        if (btn.id === variant.key) {
          variant['id'] = btn.styles?.fills || '';
        }
      });
    });

    filterData.forEach((variant) => {
      variant.alias = styles[variant.id]?.name.replace(/\s/gi, '-').toLowerCase();
    });

    return filterData.filter((f) => f.alias);
  } catch (error) {
    console.error(error);
  }
};

extButtonData();

module.exports = extButtonData;
