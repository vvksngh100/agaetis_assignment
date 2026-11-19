import { useState } from 'react';
import './App.css'
import AddEmployee from './components/AddEmployee';
import ListEmployee from './components/ListEmployee';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/employees`);
      const data = await response.json();
      if (data.status) {
        console.log(data);
        setEmployees(data.data ?? []);
        return;
      }
      setError(data.message);
    } catch (err: any) {
      console.log('[FETCH EMPLOYEE]: ', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <AddEmployee />
      <ListEmployee fetchEmployee={fetchEmployee} employees={employees} loading={loading} error={error}/>
    </>
  )
}

export default App;
