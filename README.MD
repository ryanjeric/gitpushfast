# Welcome to git-push-fast!
## Speed Up Your Development Workflow

#### Are you a solo developer tired of spending time crafting commit messages? With git-push-fast, you can push your changes to your repository in seconds without the hassle of thinking about commit messages. This tool automatically generates commit messages based on your file changes, letting you focus on what you do best—coding.

### Installation:
To install git-push-fast, use npm:
```sh
npm install -g git-push-fast
```

## Usage

### Once installed, you can use the default commands or configure your own

Default Commands:
- Pull Changes

```sh
gitpull
```
- Pull Changes to specific branch:
```sh
gitpull --bn feature-branch
```

- Add + Commit + Push Changes:
```sh
gitpush
```
- Add + Commit + Push Changes to specific branch:
```sh
gitpush --bn feature-branch
```

### Custom Commands
```sh
gitpushfast config --push=your_push_command --pull=your_pull_command
```

```
SAMPLE Commit meesage:

Changes made! - Files updated: index.js,config.js

```



## Configuration:
The configuration is stored in a config.json file in the installation directory. You can update this file manually if needed.

## Contributing:
We welcome contributions! Please submit a pull request or open an issue to get started.

# License:
This project is open source and licensed under the ISC License.