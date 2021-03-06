import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.module';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    // get all tasks
    getAllTasks(): Task[] {
        return this.tasks;
    }

    // create new task
    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task
    }

    // get single task by id
    getTaskById(id: string): Task {
        const foundTask =  this.tasks.find(task => task.id == id);

        if (!foundTask) {
            throw new NotFoundException(`Task of ID "${id}" not found`);
        }

        return foundTask;
    }

    // update task
    updateTask(id: string, status: TaskStatus): Task {
        const task: Task = this.tasks.find(task => task.id == id);
        task.status = status;
        return task;
    }

    // delete task by id
    deleteTaskById(id: string): void {
        const foundTask = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id != foundTask.id);
    }
}
