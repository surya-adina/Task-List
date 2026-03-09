import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import styles from './SubmitTask.module.css';

const base_url = process.env.REACT_APP_BASE_URL || 'http://localhost:5500/api/item';

const SubmitTask = () => {
    const [item, setItem] = useState('');
    const [fetch, setFetch] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const addTask = async (e) => {
        e.preventDefault();
        const newTask = { item };
        if (id) {
            try {
                await axios.put(base_url + '/' + id, newTask);
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await axios.post(base_url, newTask);
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        const getTask = async () => {
            try {
                const res = await axios.get(base_url + '/' + id);
                setItem(res.data.item);
                setFetch(true);
            } catch (err) {
                console.log(err);
            }
        };
        if (id) {
            getTask();
        } else {
            setFetch(true);
        }
    }, [id]);

    if (fetch === false) return <CircularProgress />;

    return (
        <div className={styles.content}>
            {id ? <h2>Update Task</h2> : <h2>Add Task</h2>}
            <form onSubmit={addTask}>
                <label>
                    Task:
                    <input
                        type="text"
                        placeholder="Enter task"
                        className="form-control"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SubmitTask;
