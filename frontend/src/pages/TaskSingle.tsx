import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getTaskById } from "../features/task/taskSlice";
const TaskSingle = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.task);
  useEffect(() => {
    if (id) dispatch(getTaskById(id));
  }, [id]);
  return (
    <div className="container">
      <form className="">
        <div className="form-group my-2">
          <label htmlFor="exampleFormControlInput1">Title</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Task title"
            disabled
            value={task ? task.title : ""}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            disabled
            value={task ? task.description : ""}
          >
            {task ? task.description : ""}
          </textarea>
        </div>
      </form>
    </div>
  );
};

export default TaskSingle;
