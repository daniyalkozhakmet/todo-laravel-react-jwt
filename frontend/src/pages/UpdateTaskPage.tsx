import React, { useEffect, useState } from "react";
import { TaskCreateType } from "../shared/interfaces/task";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById, updateTask } from "../features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Alert from "../components/Alert";

const UpdateTaskPage = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    task: taskState,
    error,
    success,
  } = useAppSelector((state) => state.task);
  const [task, setTask] = useState<TaskCreateType>({
    title: "",
    description: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) dispatch(updateTask({ ...task, id: Number(id) }));
  };
  useEffect(() => {
    if (id) {
      dispatch(getTaskById(id));
    }
  }, [id]);
  useEffect(() => {
    if (taskState) {
      setTask({ title: taskState.title, description: taskState.description });
    }
  }, [taskState]);
  useEffect(() => {
    if (success) {
      navigate("/home");
    }
  }, [success]);
  return (
    <div className="container">
      <h1 className="my-2">Update</h1>
      {error != null && error.title && (
        <Alert className="danger" message={error.title[0]} />
      )}
      {error != null && error.description && (
        <Alert className="danger" message={error.description[0]} />
      )}
      <form className="" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group my-2">
          <label htmlFor="exampleFormControlInput1">Title</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateTaskPage;
