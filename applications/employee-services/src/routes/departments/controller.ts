import {getEmployeesOfGivenDepartment, getDepartmentList} from './service.ts';

export const getAllDepartments =async (req, res)=> {
  try{
    const rows = await getDepartmentList();
    const departments = rows.map(({ department_id:id, name}) => ({
      id,
      name
    }));
    res.status(200).json(departments);
  } catch(err) {
    res.status(500).json({message: 'error', error: err})
  }
}

export const getEmployeesPerDepartment = async (req, res) => {
  try{
    const {departmentId} = req.params;
    const rows = await getEmployeesOfGivenDepartment(departmentId);
    const employees = rows.map(({employee_id, firstname, lastname}) => ({
      id: employee_id,
      employeeName: `${firstname} ${lastname}`
    }));
    res.status(200).json({results: employees})
  }catch(err) {
    res.status(500).json({message: 'error', error: err})
  }
}