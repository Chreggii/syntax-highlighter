# syntax-highlighter

## How to start

Use the magic of docker-compose

```bash
docker-compose up
```


## Access PostgreSQL database

adminer runs on port `8080`

- Server is `database`
- username is `user`
- password is `password`


## How to fix "Operation not permitted" Error during docker build and run
This problem has been observed for some mac users that are currently running OSX Catalina or newer. In order to fix this, one has to grant docker the permission to access "Files and Folders" in the "Security and Privacy" Settings. More information can be found here: https://stackoverflow.com/questions/58482352/operation-not-permitted-from-docker-container-logged-as-root

## How to fix windows line endings

Clone with the `--config core.autocrlf=false`:

```bash
git clone --config core.autocrlf=false git@github.com:Chreggii/syntax-highlighter.git
```


## Coverage
[![codecov](https://codecov.io/gh/Chreggii/syntax-highlighter/branch/dev/graph/badge.svg)](https://codecov.io/gh/Chreggii/syntax-highlighter)