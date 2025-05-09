// import axios from 'axios';
// import './AddTaskForm.css';
// import { useEffect, useState } from 'react';

// const AddTaskForm = () => {
//   const [task, setTask] = useState({
//     title: '',
//     description: '',
//     priority: 'Medium',
//     category: 'Feature',
//   });

//   const [file, setFile] = useState(null);
//   const [uploadedFileURL, setUploadedFileURL] = useState(null);
//   const [taskAdded, setTaskAdded] = useState(false);

//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTaskAdded(true);
//   };

//   const getTask = async () => {
//     const newTask = {
//       ...task,
//       status: 'todo',
//     };

//     try {
//       const response = await axios.post(`https://kanban-backend-2.onrender.com/api/tasks`, newTask);

//       console.log('Task created successfully:', response.status, response.data);

//       if (response.status === 200) {
//         if (file) {
//           const formData = new FormData();
//           formData.append('file', file);

//           const uploadResponse = await axios.post(
//             `https://kanban-backend-2.onrender.com/api/tasks/upload/${response.data.id}`,
//             formData
//           );

//           console.log('File uploaded successfully:', uploadResponse.data);
//           setUploadedFileURL(uploadResponse.data.task.attachment);
//         }

//         setTask({ title: '', description: '', priority: 'Medium', category: 'Feature' });
//         setFile(null);
//       }
//     } catch (error) {
//       console.error('Error creating task:', error);
//     }
//   };

//   useEffect(() => {
//     if (taskAdded) {
//       console.log('Task is being created...');
//       getTask();
//       setTaskAdded(false);
//     }
//   }, [taskAdded]);

//   return (
//     <form onSubmit={handleSubmit} className="task-form">
//       <h3 className="form-title">📝 Add New Task</h3>
//       <div className="form-fields">
//         <input
//           name="title"
//           value={task.title}
//           onChange={handleChange}
//           required
//           placeholder="Task Title"
//           className="input-field"
//         />
//         <div className="select-group">
//           <select
//             id="priority"
//             name="priority"
//             value={task.priority}
//             onChange={handleChange}
//             className="input-field select-field"
//           >
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//           <select
//             name="category"
//             value={task.category}
//             onChange={handleChange}
//             className="input-field select-field"
//           >
//             <option value="Feature">Feature</option>
//             <option value="Bug">Bug</option>
//             <option value="Enhancement">Enhancement</option>
//           </select>
//         </div>
//         <textarea
//           name="description"
//           value={task.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="input-field textarea"
//         />
//         <div className="file-upload">
//           <label htmlFor="file-upload" className="file-label">Upload Attachment</label>
//           <input
//             type="file"
//             id="file-upload"
//             onChange={handleFileChange}
//             className="input-field"
//           />
//         </div>
//         <button type="submit" className="submit-btn">➕ Add Task</button>


//       </div>
//     </form>
//   );
// };

// export default AddTaskForm;
import axios from 'axios';
import './AddTaskForm.css';
import { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Feature',
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Step 1: Create the task
      const createRes = await axios.post(
        `https://kanban-backend-2.onrender.com/api/tasks`,
        { ...task, status: 'todo' }
      );

      let createdTask = createRes.data;

      // Step 2: Upload file if present
      if (file && createdTask.id) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await axios.post(
          `https://kanban-backend-2.onrender.com/api/tasks/upload/${createdTask.id}`,
          formData
        );

        createdTask = uploadRes.data.task;
      }

      // Step 3: Inform parent to re-render
      onAddTask(createdTask);

      // Step 4: Reset form
      setTask({
        title: '',
        description: '',
        priority: 'Medium',
        category: 'Feature',
      });
      setFile(null);
    } catch (err) {
      console.error('❌ Error adding task:', err);
      alert('Failed to add task');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Add New Task</h3>

      <input
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        required
        className="input-field"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
        className="input-field"
      />

      <div className="select-group">
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select name="category" value={task.category} onChange={handleChange}>
          <option value="Feature">Feature</option>
          <option value="Bug">Bug</option>
          <option value="Enhancement">Enhancement</option>
        </select>
      </div>

      <input type="file" onChange={handleFileChange} />

      <button type="submit" disabled={uploading}>
        {uploading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default AddTaskForm;
