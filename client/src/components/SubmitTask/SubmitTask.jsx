import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {CircularProgress} from '@mui/material';
import styles from './SubmitTask.module.css';
const base_url = process.env.REACT_APP_BASE_URL || 'http://localhost:5500/api/item';

const SubmitTask = () => {

    const[item, setItem] = useState('');
    const[fetch, setFetch] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const addTask = async (e) => {
        e.preventDefault();
        const newTask = {item};
        if(id) {
            try {
                const res = await axios.put(`${base_url}/${id}`, newTask);
                console.log(res.data);
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const res = await axios.post(`${base_url}`, newTask);
                console.log(res.data);
                navigate('/')
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        const getTask = async () => {
            try {
                const res = await axios.get(`${base_url}/${id}`);
                setItem(res.data.item);
                setFetch(true);
            } catch (err) {
                console.log(err);
            }
        }
        if(id) {
            getTask();
        } else {
            setFetch(true);
        }
    }, [id]);

    const renderTitle = () => {
        if (id) return <h2>Update Task</h2>
        return <h2>Add Task</h2>
    }

    const Loading = () => {
        return (
            <CircularProgress />
        )
    }

    return (
        <div className={styles.container}>
            {renderTitle()}
            {fetch === false ? (Loading()) : (
                <form onSubmit={(e) => addTask(e)}>
                    <label>Task : <input type='text' placeholder='Enter task' name='task' className='form-control' value={item} onChange={(e) => setItem(e.target.value)} /></label>
                    <button type='submit'> Submit</button>
                </form>
            )}
        </div>
    )
}

export default SubmitTask;
