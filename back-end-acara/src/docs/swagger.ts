import swaggerAutogen from "swagger-autogen";

// Use absolute paths to avoid relative path issues
const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Acara",
    description: "Dokumentasi API Acara",
  },
  servers: [
    { url: "http://localhost:3000/api", description: "Local server" },
    {
      url: "https://belajarmern-acara.vercel.app/api",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "jawa jawa",
        password: "Hidupjokowi322",
      },
      RegisterRequest: {
        fullName: "Bagas Hytam",
        username: "jawa jawa",
        email: "jawahytam@yopmail.com",
        password: "Hidupjokowi322",
        confirmPassword: "Hidupjokowi322",
      },
      ActivationRequest: {
        code: "abcdefghijklmnop",
      }
    },
  },
};

swaggerAutogen({
  openapi: "3.0.0",
})(outputFile, endpointsFiles, doc);
