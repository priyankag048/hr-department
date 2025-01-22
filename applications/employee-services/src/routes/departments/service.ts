import Database from "../../utils/Database.ts";

export const getDepartmentList = async ()=> {
  const client = await Database.getInstance();
  const query = 'SELECT department_id, name FROM departments';
  const response = await client.query(query);
  return response.rows;
}

export const getEmployeesOfGivenDepartment = async (departmentId) => {
  const client = await Database.getInstance();
  const query = 'SELECT employee_id, firstname, lastname FROM employee_department_map WHERE department_id=$1';
  const response = await client.query(query, [departmentId]);
  return response.rows;
}