const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const highlight = require('highlight.js');

// highlight markdown code blocks
// https://github.com/chjj/marked#highlight
marked.setOptions({
  highlight: (code, language) => {
    // do not highlight `sh` and unspecified languages
    if (!/sh|^undefined$/.test(language)) {
      return highlight.highlightAuto(code).value;
    }
  },
});

// convert README from markdown to HTML
const readmeMarkdown = fs.readFileSync(
  path.resolve(__dirname, '../README.md'),
  'utf8'
);
const readmeHTML = marked(readmeMarkdown);

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
