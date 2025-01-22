import express from 'express';
import { onboardEmployee, associateDepartment, offboardingEmployee, getUnassignedEmployees } from './controller.ts';

const router = express.Router();

router.post('/', onboardEmployee);

router.get('/unassigned', getUnassignedEmployees);

router.patch('/:employeeId', associateDepartment);

router.delete('/:employeeId', offboardingEmployee);

export default router;
