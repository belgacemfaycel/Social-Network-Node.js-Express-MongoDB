const express = require('express');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const bodyParser = require('body-parser')
const path = require('path');

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



const app = express();
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Social network API with Swagger",
        version: "0.1.0",
        description:
          "Social network application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/post",
        },
      ],
    },
    apis: ["./routes/post.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));
 app.use(bodyParser.json());
 app.use('/api/post',postRoutes);
 app.use('/api/auth',userRoutes);
module.exports = app;