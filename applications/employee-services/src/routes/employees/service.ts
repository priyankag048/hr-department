import Database from "../../utils/Database.ts";

type Employee = {
  firstname: string;
  lastname: string;
  department?: string
}
export const createEmployee = async (employeeDetails: Employee) => {
  const {firstname, lastname } = employeeDetails;
  const client = await Database.getInstance()
  const query = 'INSERT INTO employees(firstname, lastname) VALUES($1, $2) RETURNING employee_id';
  const response = await client?.query(query, [firstname, lastname]);
  const { employee_id: employeeId } = response.rows[0];
  return employeeId;
}

export const updateEmployeeDepartment = async (employeeId, departmentId) => {
  const client = await Database.getInstance()
  const query = 'UPDATE employees SET department_id=$1 WHERE employee_id=$2';
  await client.query(query, [+departmentId, +employeeId]);
}

export const removeEmployees = async (employeeId) => {
  const client = await Database.getInstance();
  const query = 'DELETE FROM employees WHERE employee_id=$1';
  await client.query(query, [+employeeId]);
}


export const getEmployeesWithNoDepartment = async () => {
  const client = await Database.getInstance();
  const query = 'SELECT employee_id, firstname, lastname from employees WHERE department_id IS NULL';
  const response = await client.query(query);
  return response.rows;
}
