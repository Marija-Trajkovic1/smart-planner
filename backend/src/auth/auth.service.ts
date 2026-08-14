import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService) 
        {}

    async register(registerDto:RegisterUserDto){
        const existingUser = await this.userService.findUserByEmail(registerDto.email);
        if(existingUser){
        throw new ConflictException('Korisnik sa datim email-om vec postoji!');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 11);
        const userToRegister = {...registerDto, password: hashedPassword};
        try{
            await this.userService.createUser(userToRegister);
            return {message: 'Korisnik je uspesno registrovan!'};
        }
        catch(error){
            throw new InternalServerErrorException('Greska prilikom registracije korisnika!');
        }
    }

    async login(loginRequestDto: LoginRequestDto){
        const user = await  this.userService.findUserByEmail(loginRequestDto.email);
        if(!user){
            throw new UnauthorizedException('User with this email not found!');
        }
        const passwordMatch = await bcrypt.compare(loginRequestDto.password, user.password);
        if(!passwordMatch){
            throw new UnauthorizedException('Please enter valid credentials!');
        }

        const payload = {email: user.email, sub: user.id};
        return{
            access_token: await this.jwtService.signAsync(payload),
        };

    }

}
