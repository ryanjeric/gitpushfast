#!/usr/bin/env node

const simpleGit = require('simple-git');
const git = simpleGit();
const { program } = require('commander');

program
  .option('--bn <branch>', 'Branch name', 'master')
  .parse(process.argv);

const options = program.opts();
const branch = options.bn || 'master';  // Default branch if --bn is not provided

git.pull('origin', branch, (err, update) => {
  if (err) {
    console.error('Error pulling changes:', err);
  } else {
    console.log(`Pulled changes successfully from ${branch}:`, update);
  }
});
