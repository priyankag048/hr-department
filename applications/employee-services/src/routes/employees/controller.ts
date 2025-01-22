import { createEmployee, updateEmployeeDepartment, removeEmployees, getEmployeesWithNoDepartment } from './service.ts';

export const onboardEmployee = async (req, res) => {
  try{
    const newEmployee = await createEmployee(req.body);
    res.status(200).json({message: 'created', employeeId: newEmployee })
  }catch(err) {
    res.status(500).json({message: 'error', error: err})
  }
};

export const associateDepartment = async (req, res) => {
  try{
    const {employeeId} = req.params;
    const {department} = req.body;
    await updateEmployeeDepartment(employeeId, department)
    res.status(200).json({message: 'updated'})
  } catch(err) {
    res.status(500).json({message: 'error', error: err})
  }
};

export const offboardingEmployee = async (req, res) => {
  try{
    const {employeeId} = req.params;
    await removeEmployees(employeeId);
    res.status(200).json({message: 'deleted'});
  } catch(err) {
    res.status(500).json({message: 'error', error: err})
  }
}

export const getUnassignedEmployees = async (req, res) => {
  try{
    const rows = await getEmployeesWithNoDepartment();
    const employees = rows.map(({employee_id, firstname, lastname}) => ({
      id: employee_id,
      employeeName: `${firstname} ${lastname}`
    }));
    res.status(200).json({ results: employees});
  } catch(err) {
    res.status(500).json({message: 'error', error: err})
  }
}