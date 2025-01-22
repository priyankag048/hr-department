CREATE MATERIALIZED VIEW employee_department_map AS
SELECT  e.employee_id, e.firstname, e.lastname, d.department_id as department_id,  d.name AS department
FROM  employees e JOIN departments d
ON e.department_id = d.department_id;



