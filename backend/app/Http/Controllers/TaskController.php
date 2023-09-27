<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //
    public function getTasks(){
        $tasks=Task::all();
        return TaskResource::collection($tasks);
    }
    public function getTaskById(String $id){
        $task=Task::where('id',$id)->first();
        return new TaskResource($task);
    }
    public function createTask(TaskRequest $request){
        $request->validated($request->only(['title', 'description']));

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return new TaskResource($task);
    }
    public function updateTask(String $id,TaskRequest $request){
        $request->validated($request->only(['title', 'description']));
        $task=Task::find($id);
        $task->title=$request->title;
        $task->description=$request->description;
        $task->save();
        return new TaskResource($task);
    } 
    public function deleteTask(String $id){
        Task::find($id)->delete();
        return response()->json([
            'message'=>"Deleted successfully"
        ]);
    }
}
