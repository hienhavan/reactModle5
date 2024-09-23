import React, { useEffect, useState } from "react";

function UpdateStudent({ updateStudent, student }) {
    const [formStudent, setFormStudent] = useState({
        name: "",
        phone: "",
        gmail: "",
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (student) {
            setFormStudent({
                name: student.name,
                phone: student.phone,
                gmail: student.gmail,
            });
        }
    }, [student]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStudent(student.id, formStudent);
            setFormStudent({ name: "", phone: "", gmail: "" });
        } catch (error) {
            setError(error);
        }
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <form className='forms-sample' style={{ width: '30%' }} onSubmit={handleSubmit}>
                <label className='form-label'>Update Student</label>
                <input
                    className='form-control fs-5'
                    type="text"
                    placeholder="Name"
                    value={formStudent.name}
                    onChange={(e) => setFormStudent({ ...formStudent, name: e.target.value })}
                    required
                />
                <input
                    className='form-control fs-5'
                    type="text"
                    placeholder="Phone"
                    value={formStudent.phone}
                    onChange={(e) => setFormStudent({ ...formStudent, phone: e.target.value })}
                    required
                />
                <input
                    className='form-control fs-5'
                    type="email"
                    placeholder="Gmail"
                    value={formStudent.gmail}
                    onChange={(e) => setFormStudent({ ...formStudent, gmail: e.target.value })}
                    required
                />
                <button type="submit">Update Student</button>
            </form>
        </div>
    );
}

export default UpdateStudent;
