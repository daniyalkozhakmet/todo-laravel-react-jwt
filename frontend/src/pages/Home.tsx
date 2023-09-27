import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Task from "../components/Task";
export const Home = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);
  useEffect(() => {
    dispatch(getTasks(null));

  }, []);
  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between align-items-center">
      <h1 className="my-4">Tasks</h1>
      <Link className="btn btn-primary" role="button" to={"/tasks/create"}>
        Create
      </Link>
      </div>
     
      <div className="row g-3">
        { tasks && tasks.map(task => {
          return(
            <div className="col-3" key={task.id}>
              <Task task={task}/>
            </div>
          )
        })}
      </div>

    </div>
  );
};
