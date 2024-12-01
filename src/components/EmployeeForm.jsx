import { useState, useEffect } from 'react';
import { Grid2, TextField, Box, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../features/employeeSlice';
import PropTypes from 'prop-types';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const EmployeeForm = ({ editingEmployee, setEditingEmployee }) => {
  const [formData, setFormData] = useState({
    name: '', location: '', payGrade: '', email: '', gender: '', contactNumber: '', image: null, // Added image here
  });
  const [emailError, setEmailError] = useState(false);
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
      setImageSrc(editingEmployee.image || ''); // Set image if editing
    }
  }, [editingEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail(formData.email)) {
      const updatedFormData = { ...formData, image: imageSrc }; // Include image in form data

      if (editingEmployee) {
        dispatch(updateEmployee(updatedFormData));
        setEditingEmployee(null);
      } else {
        dispatch(addEmployee({ ...updatedFormData, id: Date.now() }));
      }
      setFormData({ name: '', location: '', payGrade: '', email: '', gender: '', contactNumber: '', image: null });
      setImageSrc(''); // Reset the image source
      setEmailError(false);
    } else {
      setEmailError(true); // Show error if email is invalid
    }
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
    setEmailError(!validateEmail(e.target.value));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const readURL = (input) => {
    const reader = new FileReader();
    let files = input.target.files;

    if (files.length) {
      let file = files[0];

      reader.onload = (e) => {
        setImageSrc(e.target.result); // Save the image as Base64 to display and store in the form data
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  const handleGenderChange = (event) => {
    setFormData({ ...formData, gender: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              required
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
          </Grid2>

          <Grid2 size={6}>
            <TextField
              required
              label="Pay Grade"
              value={formData.payGrade}
              onChange={(e) => setFormData({ ...formData, payGrade: e.target.value })}
              fullWidth
            />
          </Grid2>

          <Grid2 size={6}>
            <TextField
              required
              label="Email"
              value={formData.email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? 'Please enter a valid email' : ''}
              fullWidth
            />
          </Grid2>

          <Grid2 size={6}>
            <TextField
              required
              label="Contact Number"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              fullWidth
            />
          </Grid2>

          <Grid2 size={6}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                value={formData.gender}
                onChange={handleGenderChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={12}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Enter your address"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ width: '100%' }}
            />
          </Grid2>

          <Grid2 size={12}>
            <input type="file" accept="image/*" onChange={readURL} />
            {imageSrc && (
              <img src={imageSrc} alt="Employee" style={{ width: '150px', height: '200px', marginTop: '10px' }} />
            )}
          </Grid2>

          <Grid2 size={12}>
            <Button type="submit" variant="contained" color="primary">
              {editingEmployee ? 'Update' : 'Add'} Employee
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </form>
  );
};

EmployeeForm.propTypes = {
  editingEmployee: PropTypes.object,
  setEditingEmployee: PropTypes.func.isRequired,
};

export default EmployeeForm;
