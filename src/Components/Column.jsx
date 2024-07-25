import React from 'react';
import { motion } from 'framer-motion';
import Task from './Tasks';

const Column = ({column}) => {
    console.log(column)
  return (
    <div className="w-1/3 bg-gray-200 p-4 rounded">
      <h2 className="text-xl mb-4">{column.title}</h2>
      {column?.map(task => (
        <Task key={task.id} task={task} />
      ))}
      <motion.div
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        className="bg-white p-2 mt-2 rounded shadow"
      >
        Add a task
      </motion.div>
    </div>
  );
};

export default Column;
