import { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

const App = () => {
  const [editingEmployee, setEditingEmployee] = useState(null);

  return (
    <div className="app">
      <h1>Employee Management</h1>
      <EmployeeForm editingEmployee={editingEmployee} setEditingEmployee={setEditingEmployee} />
      <EmployeeList setEditingEmployee={setEditingEmployee} />
    </div>
  );
};

export default App;
