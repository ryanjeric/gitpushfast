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
    const addedFiles = status.created.map(file => file.path).join(', ');
    const modifiedFiles = status.modified.map(file => file.path).join(', ');
    const deletedFiles = status.deleted.map(file => file.path).join(', '); 

    let commitMessage = 'Changes made!';
    if (addedFiles) commitMessage += `\nAdded: ${addedFiles}`;
    if (modifiedFiles) commitMessage += `\nModified: ${modifiedFiles}`;
    if (deletedFiles) commitMessage += `\nDeleted: ${deletedFiles}`;

    return git.add('.')
      .then(() => git.commit(commitMessage))
      .then(() => git.push('origin', branch))
      .then(() => console.log(`Commit Message: ${commitMessage}`))
      .then(() => console.log(`Changes pushed successfully to ${branch}`))
      .catch((err) => console.error('Error pushing changes:', err));
  })
  .catch((err) => console.error('Error getting status:', err));
