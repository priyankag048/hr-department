import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employees/index.ts';
import departmentRoutes from './routes/departments/index.ts';

const app = express();

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.get('/health-check', (req, res) => {
  res.status(200).json({message: 'Server up and running'})
})
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);

export default app;
