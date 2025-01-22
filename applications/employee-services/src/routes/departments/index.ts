import express, { Router } from 'express';
import {getEmployeesPerDepartment, getAllDepartments} from './controller.ts'

const router = Router();

router.get('/', getAllDepartments);
router.get('/:departmentId/employees', getEmployeesPerDepartment);

export default router;