const fs = require('fs');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');

const md = new markdownIt({
  html: true,
}).use(markdownItAttrs);

const markdownContent = fs.readFileSync('./src/readme.md', 'utf8');

const bodyContent = md.render(markdownContent);

let htmlTemplate = fs.readFileSync('./src/readme-template.html', 'utf8')

htmlTemplate = htmlTemplate.replace('{{body}}', bodyContent);

fs.writeFileSync('readme.html', htmlTemplate);
console.log('HTML file with meta tags generated: output.html');
