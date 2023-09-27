import React, { useEffect } from "react";
import { TaskType } from "../shared/interfaces/task";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { deleteTask } from "../features/task/taskSlice";

const Task = ({ task }: { task: TaskType }) => {
  const { title, description, id } = task;
  const dispatch = useAppDispatch();
  const deleteHandler = (id: number) => {
    dispatch(deleteTask(id));
  };
  const user = localStorage.getItem("user");

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 10)}</h5>
        <p className="card-text">{description.slice(0, 35)}...</p>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/tasks/${id}`} className="btn btn-primary">
            View
          </Link>
          {user && (
            <>
              <button
                className="btn btn-danger"
                onClick={(e) => deleteHandler(task.id)}
              >
                Delete
              </button>
              <Link to={`/tasks/update/${id}`} className="btn btn-warning">
                Update
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
