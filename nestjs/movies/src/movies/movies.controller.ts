import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies.';
  }

  @Get('search')
  search(@Query('year') year: number) {
    return `We are searching for a movie made after: ${year}.`;
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return `This will return one movie with the id: ${id}.`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `Delete movie ${id}.`;
  }

  @Patch(':id')
  update(@Param('id') movieId: number, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
