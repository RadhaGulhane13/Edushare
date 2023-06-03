import { Button } from 'bootstrap';
import react, { useState, useEffetct } from 'react';
import { Link } from 'react-router-dom';

// import { useHistory } from "react-router-dom";

import './Section.css';

function Section() {
    const [sections, setSections] = useState([]);
    // const history = useHistory();

    react.useEffect(() => {
        fetch("http://localhost:3001/sections")
            .then((res) => res.json())
            .then((res) => setSections(res.section))
            .then(console.log(sections));
    }, []);


    // const handleSubject = (event) => {
    //   //  console.log("here");
    //     // <Link
    //     //     to={{
    //     //     pathname: "/subjects",

    //     // }}
    //     // ></Link>
    //     history.push("/subjects");

    // }

    return (
        <div>
            <Link to="/subjects" className="btn btn-primary">Subjects</Link>
            {/* <button onClick = { handleSubject }>subjects</button> */}
            <h1>Sections</h1>
            {/* {sections.map((section,i) => <h2>{section}</h2>)} */}
            {sections.map((section, i) => <div><Link to={{ pathname: "/subjects", data: section }} >{section}</Link></div>)}


        </div>
    )

}

export default Section;