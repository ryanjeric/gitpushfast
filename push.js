#!/usr/bin/env node

const simpleGit = require('simple-git');
const git = simpleGit();
const { program } = require('commander');

program
  .option('--bn <branch>', 'Branch name', 'master')
  .parse(process.argv);

const options = program.opts();
const branch = options.bn || 'master';  // Default branch if --bn is not provided

git.status()
  .then((status) => {
    const filesChanged = status.files.map(file => file.path).join(', ');
    // TODO: commit msg can be replace with AI, Check diff and auto generate commit using AI.
    const commitMessage = `Changes made! - Files updated: ${filesChanged}`;
    return git.add('.')
      .then(() => git.commit(commitMessage))
      .then(() => git.push('origin', branch))
      .then(() => console.log(`Changes pushed successfully to ${branch}`))
      .catch((err) => console.error('Error pushing changes:', err));
  })
  .catch((err) => console.error('Error getting status:', err));
