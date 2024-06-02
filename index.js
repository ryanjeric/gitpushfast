#!/usr/bin/env node

const { program } = require('commander');
const simpleGit = require('simple-git');
const git = simpleGit();
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

// Function to load configuration
function loadConfig() {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } else {
    return { push: 'gitpush', pull: 'gitpull' }; // Default values
  }
}

// Load configuration
const config = loadConfig();

program
  .command(config.pull)
  .description('Pull changes from the repository')
  .option('--bn <branch>', 'Branch name', 'master')
  .action((options) => {
    const branch = options.bn || 'master';
    git.pull('origin', options.bn, (err, update) => {
      if (err) {
        console.error('Error pulling changes:', err);
      } else {
        console.log('Pulled changes successfully:', update);
      }
    });
  });

program
  .command(config.push)
  .description('Commit and push changes to the repository')
  .option('--bn <branch>', 'Branch name', 'master')
  .action((options) => {
    const branch = options.bn || 'master';
    git.status()
      .then((status) => {
        const filesChanged = status.files.map(file => file.path).join(', ');
        // TODO: commit msg can be replace with AI, Check diff and auto generate commit using AI.
        const commitMessage = `Changes made! - Files updated: ${filesChanged}`;
        return git.add('.')
          .then(() => git.commit(commitMessage))
          .then(() => git.push('origin', options.bn))
          .then(() => console.log('Changes pushed successfully'))
          .catch((err) => console.error('Error pushing changes:', err));
      })
      .catch((err) => console.error('Error getting status:', err));
  });

program
  .command('config')
  .description('Set custom commands for push and pull')
  .option('--push <push>', 'Custom push command')
  .option('--pull <pull>', 'Custom pull command')
  .action((options) => {
    if (options.push) config.push = options.push;
    if (options.pull) config.pull = options.pull;

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    console.log('Configuration updated:', config);
  });

program.parse(process.argv);
