# Syntax Highlighter

[![Current release version](https://shields.io/github/v/release/Chreggii/syntax-highlighter?display_name=tag&style=for-the-badge)](https://github.com/Chreggii/syntax-highlighter/releases) 

[![Github Issues](https://img.shields.io/github/issues/Chreggii/syntax-highlighter?style=for-the-badge)](https://github.com/Chreggii/syntax-highlighter/issues) ![GitHub closed issues](https://img.shields.io/github/issues-closed/Chreggii/syntax-highlighter?style=for-the-badge) 

![GitHub pull requests](https://img.shields.io/github/issues-pr/Chreggii/syntax-highlighter?style=for-the-badge) ![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/Chreggii/syntax-highlighter?style=for-the-badge) 

![GitHub milestones](https://img.shields.io/github/milestones/closed/Chreggii/syntax-highlighter?style=for-the-badge) 

[![GitHub Starts](https://img.shields.io/github/stars/Chreggii/syntax-highlighter?style=for-the-badge)](https://github.com/Chreggii/syntax-highlighter/stargazers) 

![GitHub contributors](https://img.shields.io/github/contributors/Chreggii/syntax-highlighter?style=for-the-badge)

## How to start

Use the magic of docker-compose

```bash
docker-compose up
```

The frontend will be available on `localhost` and the public API on `localhost:3000`.


## How to fix "Operation not permitted" Error during docker build and run
This problem has been observed for some mac users that are currently running OSX Catalina or newer. In order to fix this, one has to grant docker the permission to access "Files and Folders" in the "Security and Privacy" Settings. More information can be found here: https://stackoverflow.com/questions/58482352/operation-not-permitted-from-docker-container-logged-as-root

## How to fix windows line endings

Clone with the `--config core.autocrlf=false`:

```bash
git clone --config core.autocrlf=false git@github.com:Chreggii/syntax-highlighter.git
```
