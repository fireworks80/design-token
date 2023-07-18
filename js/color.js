const fs = require('fs');

class Color {
  constructor(name, color) {
    this.color = color;
    this.name = name.replace(/\s/gi, '-').toLowerCase();
  }
  get scssVariables() {
    return `$${this.name}: ${this.color}`;
  }
}
module.exports = Color;
