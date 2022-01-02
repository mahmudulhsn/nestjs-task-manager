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

}
