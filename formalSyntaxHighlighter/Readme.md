# Formal Syntax Highlighter

A small *Spring Boot* application that exposes three endpoints tu use the funcitonality provided by the [*Annotation Formal Model*](https://github.com/MEPalma/UZH-ASE-AnnotationWS-FormalModel).

## Docs

The endpoints for this application are documented [here](../Docs/API%20Specs/Formal%20Syntax%20Highlighter%20API.md).

## Run *Formal Syntax Highlighter

This spring boot application is managed with *gradle*.

### Normal java way

1. Build project

```bash
./gradlew build
```

2. Run

```bash
 java -jar build/libs/formalSyntaxHighlighter-0.0.1-SNAPSHOT.jar
```

3. Access API at [localhost:8080](http://localhost:8080/).

### The docker way

If you'd like to not hazzle with a local java install, you can also use a Docker container and the corresponding [`Dockerfile`](./Dockerfile).

1. Build docker container
```bash
docker build -t formalSyntaxHighlighter .
```

2. Run docker container
```bash
docker run -p 8080:8080 formalSyntaxHighlighter
```

3. Access API at [localhost:8080](http://localhost:8080/).

## Code formatting

We use *spotless* to format the code.

### Check formatting

```bash
./gradlew spotlessCheck
```

### Apply auto-formatting

```bash
./gradlew spotlessApply
```