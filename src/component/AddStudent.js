import React, { useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";

function AddStudent({ onAdd }) {
    const [student, setStudent] = useState({
        name: "",
        phone: "",
        gmail: "",
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            onAdd(student);
            setStudent({ name: "", phone: "", gmail: "" });
        } catch (error) {
            setError(error);
        }
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="mt-4">
            <form className="forms-sample" style={{ width: '30%' }} onSubmit={handleSubmit}>
                <h3 className="mb-4">Add Student</h3>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        className="form-control fs-5"
                        type="text"
                        placeholder="Name"
                        value={student.name}
                        onChange={(e) => setStudent({ ...student, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        className="form-control fs-5"
                        type="text"
                        placeholder="Phone"
                        value={student.phone}
                        onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Gmail</label>
                    <input
                        className="form-control fs-5"
                        type="email"
                        placeholder="Gmail"
                        value={student.gmail}
                        onChange={(e) => setStudent({ ...student, gmail: e.target.value })}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Add <BsPlusSquareFill /></button>
            </form>
        </div>
    );
}

export default AddStudent;
