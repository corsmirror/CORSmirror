var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var marked = require('marked');
var highlight = require('highlight.js');

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
var readmeMD = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');
var readmeHTML = marked(readmeMD);

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
