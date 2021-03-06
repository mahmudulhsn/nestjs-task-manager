import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.module';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor (private taskService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks(); 
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Get(":id")
    getTaskById(@Param("id") id: string): Task {
        return this.taskService.getTaskById(id)
    }

    @Patch(":id/status")
    updateStatus(@Param("id") id: string, @Body("status", TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.taskService.updateTask(id, status);
    }

    @Delete(":id")
    deleteTaskById(@Param("id") id: string): void {
        this.taskService.deleteTaskById(id);
    }
}
