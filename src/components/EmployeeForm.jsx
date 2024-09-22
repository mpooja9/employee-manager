import React, { useState, useEffect } from 'react';
import { Grid2, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../features/employeeSlice';

const EmployeeForm = ({ editingEmployee, setEditingEmployee }) => {
  const [formData, setFormData] = useState({ name: '', location: '', payGrade: '', email: '' });
  const [emailError, setEmailError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    }
  }, [editingEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail(formData.email)) {
      if (editingEmployee) {
        dispatch(updateEmployee(formData));
        setEditingEmployee(null);
      } else {
        dispatch(addEmployee({ ...formData, id: Date.now() }));
      }
      setFormData({ name: '', location: '', payGrade: '', email: '' });
      setEmailError(false);
    } else {
      setEmailError(true); // Show error if email is invalid
    }
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
    setEmailError(!validateEmail(e.target.value)); // Set email error based on validation
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            label="Pay Grade"
            value={formData.payGrade}
            onChange={(e) => setFormData({ ...formData, payGrade: e.target.value })}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            required
            label="Email"
            value={formData.email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
            inputProps={{
              type: "email",
            }}
            fullWidth
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" type="submit" fullWidth>
            {editingEmployee ? 'Update' : 'Add'} Employee
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default EmployeeForm;
