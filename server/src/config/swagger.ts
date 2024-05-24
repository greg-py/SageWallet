const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ProsperFund API",
      version: "1.0.0",
    },
  },
  apis: ["./dist/src/routes/*.js"],
};

export default swaggerOptions;
