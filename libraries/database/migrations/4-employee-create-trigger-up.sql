CREATE TRIGGER employees_insert_trigger
AFTER INSERT ON employees
FOR EACH ROW
EXECUTE FUNCTION refresh_employee_department_map();
