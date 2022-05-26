# Syntax Highlighter

[![Current release version](https://shields.io/github/v/release/Chreggii/syntax-highlighter?display_name=tag&style=for-the-badge)](https://github.com/Chreggii/syntax-highlighter/releases)

## How to start

Use the magic of docker-compose

```bash
docker-compose up
```


## How to fix "Operation not permitted" Error during docker build and run
This problem has been observed for some mac users that are currently running OSX Catalina or newer. In order to fix this, one has to grant docker the permission to access "Files and Folders" in the "Security and Privacy" Settings. More information can be found here: https://stackoverflow.com/questions/58482352/operation-not-permitted-from-docker-container-logged-as-root

## How to fix windows line endings

Clone with the `--config core.autocrlf=false`:

```bash
git clone --config core.autocrlf=false git@github.com:Chreggii/syntax-highlighter.git
```
