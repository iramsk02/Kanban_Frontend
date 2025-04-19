// export default KanbanBoard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Kanban.css";
import AddTaskForm from './AddTaskForm';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// TaskCard component for individual tasks
const TaskCard = ({ task, onMove, onDelete }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'red';
            case 'Medium':
                return 'orange';
            case 'Low':
                return 'green';
            default:
                return 'gray';
        }
    };

    return (
        <div className="task-card">
            <h4>{task.title}</h4>
            <p>{task.description}</p>

            {task.attachment && (
                <div className="task-attachment">
                    <p><strong>Attachment:</strong></p>
                    {task.attachment.match(/\.(jpeg|jpg|png|gif|webp|png)$/i) ? (
                        <img src={task.attachment} alt="attachment" className="attachment-preview" />
                    ) : (
                        <a href={task.attachment} target="_blank" rel="noopener noreferrer">
                            View Attachment
                        </a>
                    )}
                </div>
            )}

            {task.priority && (
                <span
                    className="priority-badge"
                    style={{
                        backgroundColor: getPriorityColor(task.priority),
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        display: 'inline-block',
                        marginBottom: '6px',
                    }}
                >
                    {task.priority.toUpperCase()}
                </span>
            )}

            <div className="task-actions">
                <button onClick={() => onMove(task.id, 'in-progress')}>Move to In Progress</button>
                <button onClick={() => onMove(task.id, 'done')}>Move to Done</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
};

// Column component for managing tasks in different columns
const Column = ({ title, tasks, onMove, onDelete }) => {
    const sortedTasks = tasks.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return (
        <div className="column">
            <h3>{title}</h3>
            {sortedTasks.map((task) => (
                <TaskCard key={task.id} task={task} onMove={onMove} onDelete={onDelete} />
            ))}
        </div>
    );
};

// Main Kanban board component
const KanbanBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`https://kanban-backend-2.onrender.com/api/tasks`);
                setTasks(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        };
        fetchTasks();
    }, []);

    // Handle moving task between columns
    const handleMoveTask = async (taskId, status) => {
        try {
            const response = await axios.put(`https://kanban-backend-2.onrender.com/api/tasks/${taskId}`, { status });
            console.log('Task moved:', response.data);
            setTasks(tasks.map((task) => task.id === taskId ? { ...task, status } : task));
        } catch (err) {
            console.error('Error moving task:', err);
        }
    };

    // Handle deleting a task
    const handleDeleteTask = async (taskId) => {
        try {
            const response = await axios.delete(`https://kanban-backend-2.onrender.com/api/tasks/${taskId}`);
            console.log('Task deleted:', response.data);
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    // Handle adding a task
    const handleAddTask = async (newTask) => {
        try {
            const response = await axios.post(`https://kanban-backend-2.onrender.com/api/tasks`, newTask);
            const addedTask = response.data;
            setTasks((prevTasks) => [...prevTasks, addedTask]);
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    // Group tasks by their status
    const groupedTasks = tasks.reduce((acc, task) => {
        acc[task.status] = acc[task.status] || [];
        acc[task.status].push(task);
        return acc;
    }, {});

    // Prepare data for the task progress chart
    const taskProgressData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
            {
                label: 'Task Progress',
                data: [
                    groupedTasks.todo?.length || 0,
                    groupedTasks['in-progress']?.length || 0,
                    groupedTasks.done?.length || 0,
                ],
                backgroundColor: ['#FF0000', '#FFA500', '#008000'],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Task Progress Overview',
            },
            legend: {
                position: 'top',
            },
        },
    };

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div className='main'>
            <div className="add-task-and-board">
                <div className="add-task-form">
                    <AddTaskForm onAddTask={handleAddTask} />
                    <div className="task-progress-chart">
                        <h3>Task Progress</h3>
                        <Bar data={taskProgressData} options={chartOptions} />
                    </div>
                </div>

                <div className="kanban-board">
                    <Column title="To Do" tasks={groupedTasks.todo || []} onMove={handleMoveTask} onDelete={handleDeleteTask} />
                    <Column title="In Progress" tasks={groupedTasks['in-progress'] || []} onMove={handleMoveTask} onDelete={handleDeleteTask} />
                    <Column title="Done" tasks={groupedTasks.done || []} onMove={handleMoveTask} onDelete={handleDeleteTask} />
                </div>
            </div>
        </div>
    );
};

export default KanbanBoard;
