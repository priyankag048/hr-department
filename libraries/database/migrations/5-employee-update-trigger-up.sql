CREATE TRIGGER employees_update_trigger
AFTER UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION refresh_employee_department_map();