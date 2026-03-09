import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { CircularProgress, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import styles from './DisplayTasks.module.css';
const base_url = process.env.REACT_APP_BASE_URL || 'http://localhost:5500/api/item';


const DisplayTasks = () => {

    const [taskList, setTaskList] = useState([]);
    const [fetch, setFetch] = useState(false);
    const [search, setSearch] = useState('');

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`${base_url}/${id}`);
            const newTaskList = taskList.filter(curr => curr._id !== id);
            setTaskList(newTaskList);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getallTasks = async () => {
            try {
                const res = await axios.get(`${base_url}`);
                setTaskList(res.data);
                setFetch(true);
            } catch (err) {
                console.log(err);
            }
        }
        getallTasks();
    }, [taskList.values]);

    const Loading = () => {
        return(
            <CircularProgress />
        )
    }

    const NoTasks = () => {
        return(
            <Card>
                <CardContent>
                    <Typography>No Tasks To Do 🎆</Typography>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className={styles.container}>
            <Typography variant='h4'>Task List</Typography>
            <Link to='/add'> Add Task</Link>
            <input type='text' placeholder='Search task' name='search' className='form-control' value={search} onChange={(e) => setSearch(e.target.value)} />
            {fetch === false ? (Loading()) : taskList && taskList.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskList.filter(curr => curr.item.toLowerCase().includes(search)).map((curr) => (
                            <tr key={curr._id}>
                                <td>{curr.item}</td>
                                <td><Link to={`/update/${curr._id}`}>Update</Link></td>
                                <td><button onClick={() => { deleteTask(curr._id) }}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (NoTasks())}
        </div>
    )
}

export default DisplayTasks;
