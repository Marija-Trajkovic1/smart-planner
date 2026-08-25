import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from '../dtos/user/register-user.dto';
import { UserResponseDto } from '../dtos/user/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findUserByEmail(email: string): Promise<User | null>{
        return await this.userRepository.findOneBy({email:email});
    }

    async createUser(registerUserDto: RegisterUserDto): Promise<UserResponseDto>{
        const user = this.userRepository.create(registerUserDto);
        const createdUser = await this.userRepository.save(user);
        return plainToInstance(UserResponseDto, createdUser);
    }
}
