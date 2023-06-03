import react, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import FileSaver from 'file-saver';
import MultiSelect from "react-multi-select-component";
import './Posts.css';

const Post = () => {
    const options = [
        { label: "Data Stuctures", value: "data_stuctures" },
        { label: "Computer Network", value: "computer_network" },
        { label: "Operating Systems", value: "operating_systems", disabled: true },
        { label: "Automata Theory", value: "automata_theory" },
        { label: "Artificial Intelligence", value: "artificial intelligence" },
    ];

    const [selected, setSelected] = useState([]);

    const [posts, setPosts] = useState([]);
    const [sortedposts, setSortedposts] = useState([]);

    react.useEffect(() => {
        fetch("http://localhost:3001/list_1")
            .then((res) => res.json())
            .then((res) => {
                setPosts(res.posts);
                setSortedposts(res.posts);
            });


    }, []);

    react.useEffect(() => {
        console.log(selected);

        /* abstract particular field i.e lable. from array selected: */
        let field_array = [];
        selected.map((item) => {
            field_array.push(item.value);
        });

        var data = [{ id: 1, name: 'data_stuctures' }, { id: 2, name: 'computer_network' }, { id: 3, name: 'artificial' }];
        let filter_data = data.filter((item) => field_array.includes(item.name)).map(({ id, name }) => ({ id, name }));
        console.log("filter_data", filter_data);

    }, [selected]);

    const download_file = async (filename) => {

        var url = "http://localhost:3001/download/" + filename
        console.log("url:", url);
        let downloadFilename = filename;

        axios({
            method: "GET",
            url: "http://localhost:3001/download/" + filename,
            responseType: "blob",
            params: {
                'file': filename
            }
        }).then(response => {
            FileSaver.saveAs(response.data, downloadFilename);
            console.log(response);

        }).then(() => {
            console.log("File Downloading Completed");
        });

    }

    const listposts = sortedposts.map((post) =>
        <div key={post.ObjectID}>

            <Card className="mt-4">

                <Card.Body>
                    <Card.Title>{post.filename}</Card.Title>
                    <Card.Text>
                        <div> Year       : {post.year} </div>
                        <div> Subject    : {post.subject} </div>
                        <div> Description: {post.description} </div>
                    </Card.Text>
                    <Button variant="primary" onClick={() => download_file(post.file)}>Download</Button>
                </Card.Body>
                {/* Todo : add Author <Card.Footer>Post by : </Card.Footer> */}
            </Card>
        </div>
    );

    const handleSearch = (event) => {
        const newpost = [];
        if (event.target.value != "") {
            posts.map((post) => {
                if (post.description != null && post.description.toLowerCase().includes(event.target.value.toLowerCase())) {
                    newpost.push(post);
                } else if (post.subject != null && post.subject.toLowerCase().includes(event.target.value.toLowerCase())) {
                    newpost.push(post);
                }

            });
            setSortedposts(newpost);
        } else {
            setSortedposts(posts);
        }

    }
    const handleOnchange = (event) => {
        setSelected(event);
    }

    return (
        <div>
            {/* <div>
                <h1>Select Fruits</h1>
                <pre>{JSON.stringify(selected)}</pre>
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={handleOnchange}
                    labelledBy="Select"
                />
            </div> */}
            <input className="field" type="text" onChange={handleSearch} placeholder="search" />
            {listposts}
        </div>
    )
}

export default Post;