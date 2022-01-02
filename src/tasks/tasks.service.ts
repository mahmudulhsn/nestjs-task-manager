import { Injectable } from '@nestjs/common';
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
        return this.tasks.find(task => task.id == id);
    }

    // update task
    updateTask(id: string, status: TaskStatus): Task {
        const task: Task = this.tasks.find(task => task.id == id);
        task.status = status;
        return task;
    }

    // delete task by id
    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id != id);
    }
}
