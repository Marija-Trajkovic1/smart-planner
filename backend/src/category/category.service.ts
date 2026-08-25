import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryResponseDto } from '../dtos/category/category-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ){}

    async getListOfCategories(): Promise<CategoryResponseDto[]>{
        const categories = await this.categoryRepository.find();

        return plainToInstance(CategoryResponseDto, categories);
    }
}
