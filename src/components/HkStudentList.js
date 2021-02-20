import React, { useState, useEffect } from "react";
import axios from 'axios';
import HkStudentForm from "./HkStudentForm";

function HkStudentList() {
    const [students, setStudents] = useState([]);
    const [heads, setHeads] = useState([]);
    const [marks, setMarks] = useState([]);
    const [total, setTotal] = useState([]);
    const [regno, setRegno] = useState(null);
    const [grades,setGrades] = useState([]);


    var Sno = 0, sum = 0;
    var letter = '';
    useEffect(() => {
        axios.get("/api/students").then((res) => {
            setStudents(res.data);
        });

        axios.get("/api/marks").then((res) => {
            setMarks(res.data);
        });

        axios.get("/api/heads").then((res) => {
            setHeads(res.data);
        });

        axios.get("/api/total").then((res) => {
            setTotal(res.data);
        });

        axios.get("/api/grades").then((res) => {
            setGrades(res.data);
        });

    }, [total]);

    const handleClick = (std) => {
        setRegno(std.regno);
    };

    const showUpdated = (res) => {
        let mylist = marks.map((m)=> {return {...m}})
        mylist.find((s) => s._id == res._id).marks = res.marks
        setMarks(mylist);
        setRegno(null);
    }

    return (
        <div>
            <div id="main">
                <table>
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Name</th>
                            <th>Reg #</th>
                            {heads.map((head) => (
                                <th key={head._id}>{head.headname}</th>
                            ))}
                            <th>Total</th>
                            <th>100%</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td>{++Sno}</td>
                                <td onClick={() => handleClick(student)}>
                                    <a href="#">{student.name}</a>
                                </td>
                                <td>{student.regno}</td>
                               {marks.map((mark) => (
                                    mark.regno === student.regno
                                        ?
                                        <td key={mark._id}>{mark.marks}</td>
                                        : []
                                ))} 
                                {total.map(function(t, tindex){
                                t.regno === student.regno
                                ? sum = t.total
                                : 0 
                                })}
                                <td>{sum}</td>
                                <td>{Math.round(sum,0)}</td>
                                { grades.forEach(function(grade, gindex){
                                      if(sum <= grade.end){
                                        letter= grade.grade;
                                    }
                                })}
                                <td>{letter}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col">
                {regno !== null && <HkStudentForm regno={regno} showUpdated={showUpdated} />}
            </div>
        </div>
    )
}

export default HkStudentList
