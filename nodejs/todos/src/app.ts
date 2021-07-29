import path from 'path'
import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todos';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'

const app = express();
const fileName = path.join(__dirname, '..', 'src/playdapp.yaml')

const swaggerDocument = YAML.load(fileName)

app.use(express.json());

app.use('/todos', todoRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);