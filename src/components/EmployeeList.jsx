import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee } from '../features/employeeSlice';
import { Button, Grid2 } from '@mui/material';

const EmployeeList = ({ setEditingEmployee }) => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  return (
    <Grid2 container spacing={2}>
      {employees.map((employee) => (
        <Grid2 item xs={12} sm={6} key={employee.id}>
          <div>
            <h3>{employee.name}</h3>
            <p>Location: {employee.location}</p>
            <p>Pay Grade: {employee.payGrade}</p>
            <p>Email: {employee.email}</p>
            <Button variant="contained" onClick={() => setEditingEmployee(employee)}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={() => dispatch(deleteEmployee(employee.id))}>
              Delete
            </Button>
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default EmployeeList;
