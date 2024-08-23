# Stage 1: Build the JAR file
FROM openjdk:17-jdk-slim as builder
WORKDIR /app
COPY . .
RUN ./gradlew clean build -x test

# Stage 2: Run the application
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
