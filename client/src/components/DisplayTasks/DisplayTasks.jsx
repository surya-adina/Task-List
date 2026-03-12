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
      await axios.delete(base_url + '/' + id);
      setTaskList(taskList.filter(curr => curr._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const res = await axios.get(base_url);
        setTaskList(res.data);
        setFetch(true);
      } catch (err) {
        console.log(err);
        setFetch(true);
      }
    };
    getAllTasks();
  }, []);

  if (fetch === false) return <CircularProgress style={{ display: 'block', margin: '60px auto' }} />;

  return (
    <div className={styles.content}>
      <Typography variant="h4" className={styles.heading}>Task List</Typography>
      <div className={styles.addBtn}>
        <Link to="/addTask">+ Add Task</Link>
      </div>
      {taskList.length > 0 && (
        <input
          type="text"
          placeholder="Search tasks..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      {!taskList || taskList.length === 0 ? (
        <Card variant="outlined" style={{ borderRadius: 8, marginTop: 8 }}>
          <CardContent className={styles.tableCardContent}>
            <Typography className={styles.noTasks}>No tasks yet. Add one above!</Typography>
          </CardContent>
        </Card>
      ) : (
        <Card variant="outlined" style={{ borderRadius: 8 }}>
          <CardContent className={styles.tableCardContent}>
            <Table hover>
              <thead style={{ backgroundColor: '#e8eaf6' }}>
                <tr>
                  <th className={styles.col}>Task</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Update</th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {taskList
                  .filter(curr => curr.item.toLowerCase().includes(search.toLowerCase()))
                  .map((curr) => (
                    <tr key={curr._id}>
                      <td style={{ verticalAlign: 'middle' }}>{curr.item}</td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <Link to={'/updateTask/' + curr._id} className={styles.updateLink}>Edit</Link>
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <button className={styles.deleteBtn} onClick={() => deleteTask(curr._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DisplayTasks;
