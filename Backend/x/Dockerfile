# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean install -DskipTests

# Stage 2: Create the final image
FROM eclipse-temurin:17-jre-alpine
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY --from=build /app/target/kaoba-backend-1.0.0.jar .
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "kaoba-backend-1.0.0.jar"]
