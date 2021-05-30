import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return `This will return one movie with the id: ${id}`;
  }

  @Post()
  create() {
    return 'Create movie';
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return `Delete movie ${id}`;
  }

  @Put('/:id')
  update(@Param('id') id: number) {
    return `Update ${id}`;
  }
}
