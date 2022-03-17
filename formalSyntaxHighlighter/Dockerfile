FROM gradle:7-jdk17 as builder

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src

RUN gradle build --no-daemon

FROM --platform=linux/amd64 openjdk:17 as runner

RUN mkdir /app
COPY --from=builder /home/gradle/src/build/libs/formalSyntaxHighlighter-0.0.1-SNAPSHOT.jar /app/formalSyntaxHighlighter.jar

ENTRYPOINT ["java", "-jar", "/app/formalSyntaxHighlighter.jar"]