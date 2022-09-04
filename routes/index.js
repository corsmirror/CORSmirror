const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const highlight = require('highlight.js');

// highlight markdown code blocks
// https://github.com/chjj/marked#highlight
marked.setOptions({
  highlight: function (code, language) {
    // do not highlight `sh` and unspecified languages
    if (!/sh|^undefined$/.test(language)) {
      return highlight.highlightAuto(code).value;
    }
  },
});

// convert README from markdown to HTML
const readmeMD = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');
const readmeHTML = marked(readmeMD);

/**
 * GET home page.
 */
router.get('/', function onIndexRoute(req, res) {
  res.render('index', {
    title: 'CORSmirror',
    readme: readmeHTML,
    gaId: process.env.GOOGLE_ANALYTICS_ID,
  });
});

/**
 * Export router.
 */
module.exports = router;
