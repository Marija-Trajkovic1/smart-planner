import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../core/guards/jwt.guard';
import { CategoryResponseDto } from '../dtos/category/category-response.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @UseGuards(JwtAuthGuard)
    @Get('getListOfCategories')
    async getListOfCategories(): Promise<CategoryResponseDto[]>{
        return this.categoryService.getListOfCategories();
    }
}
