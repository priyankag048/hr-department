import React, {useRef} from 'react';
import EmployeeForm from './components/employee-form.tsx';
import EmployeeList from './components/employee-list.tsx';
import { EmployeeContext } from './utils.ts';


function App() {
  const newEmployee = useRef(null)
  const handleEmployeeOnboard = (employeeDetails)=> {
    newEmployee.current = employeeDetails;
  }
  return (
    <div style={{
      "max-width": "102rem",
      margin: "auto"
    }}>
      <h1 style={{
        background: "cadetblue",
        color: "white",
        height: '2rem',
        "padding": '1rem',
      }}>
        HR Application
      </h1>
      <EmployeeContext.Provider value={{ onEmployeeOnboard: handleEmployeeOnboard, newEmployee: newEmployee.current }}>
        <EmployeeForm/>
        <EmployeeList/>
      </EmployeeContext.Provider>
    </div>
  );
}

export default App;
