import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import UpdateStudent from './UpdateStudent';
import { BsFillTrash3Fill, BsWrenchAdjustable } from "react-icons/bs";
import '../App.css';

const DataList = ({ students = [], deleteStudent, updateStudent, searchStudents }) => {
    const [display, setDisplay] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [params, setParams] = useState({
        name: "",
        phone: "",
        gmail: ""
    });

    const itemsPerPage = 3;

    const finStudent = async (e) => {
        e.preventDefault();
        console.log("gmail: " + params.gmail);
        await searchStudents(params.name, params.phone, params.gmail);
        setParams({ name: "", phone: "", gmail: "" });
    };

    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setDisplay(true);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = students.slice(offset, offset + itemsPerPage);

    return (
        <>
            {students.length === 0 ? (
                <div>No students found.</div>
            ) : (
                <>
                    <form onSubmit={finStudent}>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <td>
                                        <input
                                            value={params.name}
                                            onChange={(e) => setParams({ ...params, name: e.target.value })}
                                            type='text'
                                            placeholder='name'
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={params.phone}
                                            type='number'
                                            onChange={(e) => setParams({ ...params, phone: e.target.value })}
                                            placeholder='phone'
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={params.gmail}
                                            onChange={(e) => setParams({ ...params, gmail: e.target.value })}
                                            type='email'
                                            placeholder='gmail'
                                        />
                                    </td>
                                    <td>
                                        <button type="submit">Search</button>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Gmail</th>
                                    <th style={{ width: '15rem' }}>Options</th>
                                </tr>
                                {currentItems.map(item => (
                                    <tr className='table-info' key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.gmail}</td>
                                        <td className='d-flex justify-content-center'>
                                            <button className='btn btn-danger' style={{ marginRight: '11px' }} onClick={() => handleEditClick(item)}>
                                                Edit <BsWrenchAdjustable />
                                            </button>
                                            <button className='btn btn-danger' onClick={(e) => deleteStudent(item.id, e)}>
                                                Delete <BsFillTrash3Fill />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </form>
                    <ReactPaginate
                        breakLabel={'...'}
                        nextLabel={'next >'}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        pageCount={Math.ceil(students.length / itemsPerPage)}
                        previousLabel={'< previous'}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                    {display && <UpdateStudent updateStudent={updateStudent} student={selectedStudent} />}
                </>
            )}
        </>
    );
};

export default DataList;
