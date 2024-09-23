import React, { useState, useEffect } from "react";
import DataList from "./component/ListStudent";
import AddStudent from "./component/AddStudent";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/minitest');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setStudents(result.tours);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const addStudent = async (newStudent) => {
    try {
      const response = await fetch('http://localhost:8080/minitest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      const addedStudent = await response.json();
      setStudents(students.concat(addedStudent.data));
    } catch (error) {
      setError(error);
    }
  };

  const updateStudent = async (id, updatedStudent) => {
    try {
      await axios.put(`http://localhost:8080/minitest/${id}`, updatedStudent);
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === id ? { ...student, ...updatedStudent } : student
        )
      );
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = (id, e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/minitest/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setStudents(students.filter(t => t.id !== id));
    }).catch(err => {
      console.log(err);
    });
  };
  const searchStudents = async (name, phone, gmail) => {
    try {
      const response = await axios.get('http://localhost:8080/minitest/search', {
        params: {
          name: name || undefined,
          phone: phone || undefined,
          gmail: gmail || undefined
        }
      });

      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <AddStudent onAdd={addStudent} />
      <DataList students={students} deleteStudent={deleteStudent} updateStudent={updateStudent} searchStudents={searchStudents} />
    </div>
  );
};

export default App;
