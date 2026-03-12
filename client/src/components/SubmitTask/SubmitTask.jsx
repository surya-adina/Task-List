import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
    try {
      if (id) {
        await axios.put(base_url + '/' + id, newTask);
      } else {
        await axios.post(base_url, newTask);
      }
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      const getTask = async () => {
        try {
          const res = await axios.get(base_url + '/' + id);
          setItem(res.data.item);
          setFetch(true);
        } catch (err) {
          console.log(err);
          setFetch(true);
        }
      };
      getTask();
    } else {
      setFetch(true);
    }
  }, [id]);

  if (fetch === false) return <CircularProgress style={{ display: 'block', margin: '80px auto' }} />;

  return (
    <div className={styles.content}>
      <h2 className={styles.heading}>{id ? 'Update Task' : 'Add New Task'}</h2>
      <form onSubmit={addTask}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="taskInput">Task name</label>
          <input
            id="taskInput"
            type="text"
            placeholder="What do you need to do?"
            className={styles.input}
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          {id ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <Link to="/" className={styles.backLink}>← Back to Task List</Link>
    </div>
  );
};

export default SubmitTask;
