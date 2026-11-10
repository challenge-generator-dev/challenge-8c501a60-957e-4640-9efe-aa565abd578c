import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './utils/errorHandler';
import { OrderController } from './infrastructure/controllers/OrderController';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger documentation
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const orderController = new OrderController();
app.post('/orders', orderController.createOrder.bind(orderController));
app.get('/orders/:id', orderController.getOrder.bind(orderController));
app.put('/orders/:id', orderController.updateOrder.bind(orderController));
app.delete('/orders/:id', orderController.deleteOrder.bind(orderController));
app.get('/orders', orderController.listOrders.bind(orderController));

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});