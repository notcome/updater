var githubhook = require('githubhook');
var console = require('console');
var github = githubhook({port: 8000});

github.listen();

github.on('Selveskii.me', function (event, ref, data) {
  console.log('Selveskii.me');
  console.log('[EVENT]');
  console.log(event);
  console.log('[REF]');
  console.log(ref);
  console.log('[DATA]');
  console.log(data);
});
