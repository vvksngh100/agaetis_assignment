import { useState } from "react";

function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function addEmployee(name: string, email: string, role: string) {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch("http://localhost:3000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, role }),
      });

      if (!response.status) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Created employee:", data);

    
      setName("");
      setEmail("");
      setRole("");
      setStatusMessage("Employee added successfully!");
    } catch (err) {
      console.error("[ADD EMPLOYEE]:", err);
      setStatusMessage("Failed to add employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('asdf')
    addEmployee(name, email, role);
    setTimeout(() => {
        setStatusMessage('');
    },1000);

  };

  return (
    <form className="form" onSubmit={handleSubmit}>
        <div>
      <div className="form-group">
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter employee name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter employee email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role: </label>
        <input
          id="role"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter employee role"
          required
        />
      </div>


      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {statusMessage && <p>{statusMessage}</p>}
      </div>
    </form>
  );
}

export default AddEmployee;
