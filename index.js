var githubhook = require('githubhook');
var console = require('console');
var github = githubhook({port: 8000});
var exec = require('child_process').exec

var repos = {
  'Selveskii.me': '/root/git_test/Selveskii.me'
}

var log = fs.createWriteStream('log', { flags: 'a', encoding: 'utf8' });

function pullGenerator (reponame) {
  var repopath = repos[reponame];
  return function (event, ref) {
    exec(__dirname + '/git-pull ' + repopath, function (err, out, err) {
      if (err) fs.write('exec error:\n' + err);
      fs.write(reponame, event, ref);
      fs.write(out);
    });
  }
}

github.listen();

for (var reponame in repos)
  github.on(reponame, pullGenerator(reponame));
