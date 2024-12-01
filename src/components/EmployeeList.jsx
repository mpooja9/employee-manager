import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee } from '../features/employeeSlice';
import { Button } from '@mui/material';

const EmployeeList = ({ setEditingEmployee }) => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  return (
    <div>
      <h2>Employee List</h2>
      {employees.length ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {employees.map((employee) => (
            <div key={employee.id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px', textAlign: 'center', background: '#f9f9f9' }}>
              <h3>{employee.name}</h3>
              {employee.image && (
                <img src={employee.image} alt={`${employee.name}`} style={{ width: '100px', height: '120px', objectFit: 'cover', marginBottom: '10px' }} />
              )}
              <p>Email: {employee.email}</p>
              <p>Location: {employee.location}</p>
              <p>Pay Grade: {employee.payGrade}</p>
              <Button onClick={() => handleEdit(employee)} variant="outlined" color="primary" style={{ marginRight: '10px' }}>
                Edit
              </Button>
              <Button onClick={() => handleDelete(employee.id)} variant="outlined" color="secondary">
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeList;
