import React, { useEffect,  useState, useRef } from 'react';

const tableStyle = {
  'border': '1px solid black', 
  'border-collapse': 'collapse'
}

const EmployeeList = ()=> {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [unassignedEmployees, setUnassignedEmployees] = useState([]);
  const handleSelectDepartment = (event) => {
    setSelectedDepartment(event.target.value)
  }
  useEffect(() => {
    const getDepartments = async() => {
      const response = await fetch(`http://localhost:8098/departments`);
      const departmentList = await response.json();
      setDepartments(departmentList)
    }
    const getUnassignedEmployees = async () => {
      const response = await fetch(`http://localhost:8098/employees/unassigned`);
      const unassignedEmployeeList = await response.json();
      setUnassignedEmployees(unassignedEmployeeList.results)
    }
    getDepartments();
    getUnassignedEmployees();
  }, [])


  useEffect(() => {
    const getEmployeeList = async() => {
      const response = await fetch(`http://localhost:8098/departments/${selectedDepartment}/employees`);
      const employeeList = await response.json();
      setEmployees(employeeList.results)
    }
    if(selectedDepartment && selectedDepartment !== 0){
      getEmployeeList();
    }
  }, [selectedDepartment]);

  const handleAssignDepartment =  (employeeId) => async(event) => {
    const department = event.target.value;
    await fetch(`http://localhost:8098/employees/${employeeId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ department })
    });
  }
  return (
    <>
      <hr style={{'margin-top': '2rem', 'margin-bottom': '2rem'}} />
      <div style={{display: 'flex', 'margin': '2rem', 'justify-content': 'space-between'}}>
        <div>
          <div style={{ display: 'flex', 'align-items': 'center'}}>
            <h4 style={{ 'margin-right': '1rem'}}>{`Employees assigned to department`}</h4>
            <select
              value={selectedDepartment}
              onChange={handleSelectDepartment}
              style={{ width: '6rem', height: '2rem', 'font-size': '14px'}}
            >
              <option value="0">-</option>
              {
                departments.map(({id, name}) => (
                  <option key={id} value={`${id}`} name={name}>{name}</option>
                ))
              }
            </select>
          </div>
          <table style={{...tableStyle}}>
            <tr style={tableStyle}>
              <th style={{...tableStyle, padding: '1rem', width: '10rem',}}>Employee Id</th>
              <th style={{...tableStyle, padding: '1rem', width: '10rem',}}>Name</th>
            </tr>
            {employees.map(({id, employeeName}) => (
              <tr key={id} style={tableStyle}>
                <td style={{...tableStyle, width: '10rem', padding: '1rem'}}>{id}</td>
                <td style={{...tableStyle, width: '10rem', padding: '1rem'}}>{employeeName}</td>
              </tr>
            ))}
          </table>
        </div>
        <div>
          <h4>Assign department to the employees</h4>
          <table style={{...tableStyle}}>
            <tr style={tableStyle}>
              <th style={{...tableStyle, padding: '1rem', width: '10rem',}}>Employee Id</th>
              <th style={{...tableStyle, padding: '1rem', width: '10rem',}}>Name</th>
              <th style={{...tableStyle, padding: '1rem', width: '10rem',}}>Department</th>
            </tr>
            {unassignedEmployees.map(({id, employeeName}) => (
              <tr key={id} style={tableStyle}>
                <td style={{...tableStyle, width: '10rem', padding: '1rem'}}>{id}</td>
                <td style={{...tableStyle, width: '10rem', padding: '1rem'}}>{employeeName}</td>
                <td style={{...tableStyle, width: '10rem', padding: '1rem'}}>
                  <select
                    onChange={handleAssignDepartment(id)}
                    style={{ width: '6rem', height: '2rem', 'font-size': '14px'}}
                  >
                    <option value="0">-</option>
                    {
                      departments.map(({id, name}) => (
                        <option key={id} value={`${id}`} name={name}>{name}</option>
                      ))
                    }
                  </select>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  )
}

export default EmployeeList;
