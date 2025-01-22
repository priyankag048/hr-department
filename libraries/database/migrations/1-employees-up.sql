CREATE TABLE employees(
  employee_id SERIAL PRIMARY KEY,
  firstname TEXT,
  lastname TEXT,
  department_id INTEGER REFERENCES departments
);
