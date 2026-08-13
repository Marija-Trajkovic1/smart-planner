import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

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

}
