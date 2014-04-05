#!/usr/bin/env node

var githubhook = require('githubhook');
var console = require('console');
var github = githubhook({port: 8000});
var exec = require('child_process').exec;
var fs = require('fs');

var config = fs.readFileSync('/etc/updater.conf', { encoding : 'utf8' });
console.log('Config file loaded');
console.log(config);

config = JSON.parse(config);
var repos = config.repos;

var repos = {
  'Selveskii.me': '/root/git_test/Selveskii.me'
}

function pullGenerator (reponame) {
  var repopath = repos[reponame].path,
      repouser = repos[reponame].user;
      
  return function (event, ref) {
    var cmd = [__dirname + '/git-pull', repopath, repouser].join(' ');
    exec(cmd, function (err, out, err) {
      if (err) console.error('exec error:\n' + err);
      console.log(reponame, event, ref);
      console.log(out);
    });
  }
}

github.listen();

for (var reponame in repos)
  github.on(reponame, pullGenerator(reponame));
