// import react , { useState } from 'react';
// import {useLocation} from "react-router-dom";



// function Subjects() {
//     let location = useLocation();

//     const [subjects, setSubjects] = useState([]);

//     react.useEffect(() => {
//         //fetch onlu=y if section is not undefined
//         //store the last persistent stage
//         let section =  location.data;
//         console.log("section", section);
//         let url = "http://localhost:3001/subject/" + location.data;
//         console.log(url);
//         fetch(url)
//           .then((res) => res.json())
//           .then((res) => setSubjects(res.subjects))
//           .then(console.log({subjects}));
//       }, []);

//     return(
//         <div>

//             <h1>Subjects</h1>
//             <h1>{ location.data} </h1>
//             {subjects.map((section,i) => <h1 >{section}</h1>)}



//         </div>
//     )

// }

// export default Subjects;


import react, { useState, useEffetct } from 'react';
import { useLocation } from "react-router-dom";

// import { useHistory } from "react-router-dom";


function Subjects() {
    let location = useLocation();
    const [subjects, setSubjects] = useState([]);

    // const history = useHistory();

    react.useEffect(() => {
        const url = "http://localhost:3001/subject/" + location.data;
        fetch(url)
            .then((res) => res.json())
            .then((res) => setSubjects(res.subjects))
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
            {/* <button onClick = { handleSubject }>subjects</button> */}
            <h1>Subjects</h1>
            {/* {sections.map((section,i) => <h2>{section}</h2>)} */}
            {subjects.map((subject, i) => <h2>{subject}</h2>)}


        </div>
    )

}

export default Subjects;