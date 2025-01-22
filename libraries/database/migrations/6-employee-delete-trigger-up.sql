CREATE TRIGGER employees_delete_trigger
AFTER DELETE ON employees
FOR EACH ROW
EXECUTE FUNCTION refresh_employee_department_map();