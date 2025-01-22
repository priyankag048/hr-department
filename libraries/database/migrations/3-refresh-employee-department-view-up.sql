CREATE OR REPLACE FUNCTION refresh_employee_department_map() 
RETURNS trigger AS
$$
BEGIN
    -- Refresh the materialized view when any changes happen in the employees table
    REFRESH MATERIALIZED VIEW employee_department_map;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
