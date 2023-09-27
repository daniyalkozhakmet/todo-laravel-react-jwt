import { TaskCreateType, TaskType } from "../../shared/interfaces/task";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { RootState } from "../../store";
import { privateAxiosInstance } from "../../utils/privateAxiosInstance";
export interface TaskStateInterface {
  tasks: TaskType[] | null;
  task: TaskType | null;
  loading: boolean;
  success: boolean;
  error: any | null;
}
export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (place: null, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/tasks");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);
export const getTaskById = createAsyncThunk(
  "task/getTaskById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);
export const createTask = createAsyncThunk(
  "task/createTasks",
  async (task: TaskCreateType, { rejectWithValue }) => {
    try {
      const response = await privateAxiosInstance.post("/tasks", task);
      return response.data.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.errors);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await privateAxiosInstance.delete(`/tasks/${id}`);
      return id;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.errors);
    }
  }
);
export const updateTask = createAsyncThunk(
  "task/updateTasks",
  async (task: TaskType, { rejectWithValue }) => {
    try {
      const response = await privateAxiosInstance.put(
        `/tasks/${task.id}`,
        task
      );
      return response.data.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.errors);
    }
  }
);
const initialState: TaskStateInterface = {
  tasks: null,
  task: null,
  loading: false,
  error: null,
  success: false,
};

export const taskSlice = createSlice({
  name: "task",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.data;
        state.loading = false;
        state.task = null;
        state.error = null;
        state.success = false;
        // Add any fetched posts to the array
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
      })
      .addCase(createTask.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        let task: TaskType = action.payload;
        state.tasks = state.tasks && [...state.tasks, task];
        state.loading = false;
        state.success = true;
        state.task = null;
        state.error = null;
        // Add any fetched posts to the array
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
        state.success = false;
      })
      .addCase(getTaskById.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        let task: TaskType = action.payload;
        state.tasks = state.tasks;
        state.task = task;
        state.loading = false;
        state.success = false;
        state.error = null;
        // Add any fetched posts to the array
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
        state.success = false;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks =
          state.tasks &&
          state.tasks.filter((task) => task.id != action.payload);
        state.loading = false;
        state.task = null;
        state.error = null;
        state.success = false;
        // Add any fetched posts to the array
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks =
          state.tasks &&
          state.tasks.map((task) =>
            task.id == action.payload.id ? action.payload : task
          );
        state.loading = false;
        state.task = null;
        state.error = null;
        state.success = true;
        // Add any fetched posts to the array
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTask = (state: RootState) => state;

export default taskSlice.reducer;
