import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HkStudentForm = (props) => {

    const [student, setStudent] = useState({});
    const [mark, setMark] = useState([]);
    const [heads, setHeads] = useState([]);
    const [error, setError] = useState("");
    const [grades, setGrades] = useState([]);
    const [totall, setTotall] = useState(null);
    const { regno } = props

    useEffect(() => {
        axios.get(`/api/students/${regno}`).then(res => {
            setStudent(res.data[0]);
        });

        axios.get(`/api/marks/${regno}`).then(res => {
            setMark(res.data);
        })

        axios.get("/api/heads").then((res) => {
            setHeads(res.data);
        });

        axios.get("/api/grades").then((res) => {
            setGrades(res.data);
        });

    }, [regno]);

    var totalmarks = 0;
    var headname = "", headid;

    const handleChange = (e) => {
        const { name, value } = e.target;

        let mylist = mark.map((m) => { return { ...m } })
        mylist.find((m) => m._id == name).marks = value

        headid = mylist.find((m) => m._id == name).hid

        heads.map((head) => (head.hid === headid ? totalmarks = head.total : 0));
        heads.map((head) => (head.hid === headid ? headname = head.headname : 0));
        
        if (value <= totalmarks) {
            setMark(mylist);
            setTotall({ name, value });
            setError("");
        }
        else {
            setError(`${headname} marks should be between 0 to ${totalmarks}`);
        }
    };

    const handleSave = (e) => {
        if (e.keyCode === 9) {
            axios.patch(`/api/marks/update`, totall).then(mark => {
                if (mark.status === 200) {
                    props.showUpdated(mark.data);
                    setError("");
                }
            });
        }
    }

    var total = 0;
    var letter = '';

    return (
        <div>
            <div><label style={{ color: "red", height: "22px" }}>{error}</label></div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Reg #:</th>
                            <td style={{ width: 250 }}>{student.regno}</td>
                        </tr>
                        <tr>
                            <th>Name :</th>
                            <td style={{ width: 250 }}>{student.name}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: 100 }}>Head</th>
                            <th>Total</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heads.map((head, i) => (
                            <tr key={head.hid}>
                                <th>
                                    {head.headname}
                                </th>
                                <td>{head.total}</td>
                                <td>
                                    <input type="text" name={mark[i]._id}
                                        value={mark[i].marks}
                                        onChange={handleChange}
                                        onKeyDown={handleSave}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <th colSpan="2">Total</th>
                            {/* {mark.forEach(function (m, mindex) {
                                total = total + m.marks
                            })} */}
                            <td>
                                {total = mark.reduce((a, m) => a + parseFloat(m.marks), 0)}
                            </td>
                        </tr>
                        <tr>
                            <th colSpan="2">100%</th>
                            <td>{Math.round(total, 0)}</td>
                        </tr>
                        <tr>
                            <th colSpan="2">Grade</th>
                            {grades.forEach(function (grade, gindex) {
                                if (total <= grade.end) {
                                    letter = grade.grade;
                                }
                            })}
                            <td>{letter}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HkStudentForm
