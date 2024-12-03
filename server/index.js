import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import authRoute from './route/user.route.js';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined')); // Specify the format for Morgan
app.use(helmet({
    crossOriginResourcePolicy: false
}));

const PORT = process.env.PORT || 8080;

app.use('/', authRoute);

app.use(bodyParser.json());

// Swagger options
// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'API Updes-Migration Project Swagger Documentation',
//       version: '1.0.0',
//       description: 'API documentation for the Node.js API',
//       termsOfService: 'https://mysite.com/terms',
//       contact: {
//         name: 'Developer Name',
//         email: 'mailto:dev@example.com',
//         url: 'https://devwebsite.com',
//       },
//       license: {
//         name: 'Apache 2.0',
//         url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
//       },
//     },
//     servers: [
//       {
//         url: 'http://localhost:8080',
//         description: 'Local Server',
//       },
//     ],
//   },
//   apis: [
//     './index.js','./route/user.route.js'
//   ],
// };

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Updes-Migration Project Swagger Documentation',
        version: '1.0.0',
        description: 'API documentation for the Node.js API',
        termsOfService: 'https://mysite.com/terms',
        contact: {
          name: 'Developer Name',
          email: 'mailto:dev@example.com',
          url: 'https://devwebsite.com',
        },
        license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        },
      },
      servers: [
        {
          url: 'http://localhost:8080',
          description: 'Local Server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [
      './index.js', './route/user.route.js'
    ],
  };

// Initialize Swagger specs
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI at /api-docs
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});