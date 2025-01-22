import React, { useActionState, useContext } from 'react';
import { EmployeeContext } from '../utils.ts';

const EmployeeForm = () => {
  const { onEmployeeOnboard } = useContext(EmployeeContext)
  const inputStyle = {
    height: '1rem',
    width: '10rem',
    'border-radius': '5px',
    'margin-right': '1rem',
    padding: '0.5rem',
    'font-size': '14px'
  }
  const submitEmployeeDetails = async (_currentState, formData)=>{
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const response = await fetch('http://localhost:8098/employees', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ firstname, lastname })
    });
    const { employeeId } = await response.json();
    onEmployeeOnboard({id:employeeId});
  }
  const [_, formAction, isPending] = useActionState(submitEmployeeDetails);
  return (
    <>
      <h2>Onboard an employee</h2>
      {isPending ? <>Loading...</> : (
        <form action={formAction}>
        <input name="firstname" placeholder="firstname" style={inputStyle} />
        <input name="lastname" placeholder="lastname" style={inputStyle} />
        <button type="submit" style={{ 'border-radius': '5px', 'font-size': '14px', width: '8rem', padding: '8px'}}>Submit</button>
        </form>
      )}
     
    </>
  )
}

export default EmployeeForm