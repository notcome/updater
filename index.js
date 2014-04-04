var githubhook = require('githubhook');
var console = require('console');
var github = githubhook({port: 8000});
var exec = require('child_process').exec;

var repos = {
  'Selveskii.me': '/root/git_test/Selveskii.me'
}

function pullGenerator (reponame) {
  var repopath = repos[reponame];
  return function (event, ref) {
    exec(__dirname + '/git-pull ' + repopath, function (err, out, err) {
      if (err) console.error('exec error:\n' + err);
      console.log(reponame, event, ref);
      console.log(out);
    });
  }
}

github.listen();

for (var reponame in repos)
  github.on(reponame, pullGenerator(reponame));
