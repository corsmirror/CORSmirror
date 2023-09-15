const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { Marked } = require('marked');
const { markedHighlight } = require('marked-highlight');
const hljs = require('highlight.js');

// https://www.npmjs.com/package/marked-highlight
const marked = new Marked(
  markedHighlight({
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  }),
);

// convert README from markdown to HTML
const readmeMarkdown = fs.readFileSync(
  path.resolve(__dirname, '../README.md'),
  'utf8',
);
const readmeHTML = marked.parse(readmeMarkdown);

/**
 * GET /
 *
 * Returns homepage.
 */
module.exports = router.get('/', (request, response) => {
  response.render('index', {
    title: 'CORSmirror',
    readme: readmeHTML,
    gaId: process.env.GOOGLE_ANALYTICS_ID,
  });
});
