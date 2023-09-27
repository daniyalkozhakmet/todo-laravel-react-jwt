import React, { useEffect, useState } from "react";
import { TaskCreateType } from "../shared/interfaces/task";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { createTask } from "../features/task/taskSlice";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

const CreateTaskPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error ,success} = useAppSelector((state) => state.task);
  const [task, setTask] = useState<TaskCreateType>({
    title: "",
    description: "",
  });
  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createTask(task));
  };
  useEffect(() => {
    if (success == true) {
      navigate("/");
    }
  }, [success]);
  return (
    <div className="container ">
      <h1 className="my-3">Create TASK</h1>
      {error != null && error.title && (
        <Alert className="danger" message={error.title[0]} />
      )}
      {error != null && error.description && (
        <Alert className="danger" message={error.description[0]} />
      )}
      <form className="" onSubmit={(e) => handleSumbit(e)}>
        <div className="form-group my-2">
          <label htmlFor="exampleFormControlInput1">Title</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Task title"
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
