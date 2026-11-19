import { useEffect } from 'react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ListEmployeeProps {
  fetchEmployee: () => Promise<void> | void;
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export default function ListEmployee({
  fetchEmployee,
  employees,
  loading,
  error,
}: ListEmployeeProps) {
  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  async function deleteEmp(id: string): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error(`Failed to delete employee. Status: ${response.status}`);
        return false;
      }

      return true;
    } catch (err) {
      console.error('[DELETE EMPLOYEE]: ', err);
      return false;
    }
  }

  const handleDelete = async (id: string) => {
    const isDeleted = await deleteEmp(id);
    if (isDeleted) {
      fetchEmployee();
    }
  };

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Failed to fetch</h2>
        <p>{error}</p>
        <button onClick={() => fetchEmployee()}>Retry</button>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return <div>No Data Found</div>;
  }

  return (
    <div className="emp-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
