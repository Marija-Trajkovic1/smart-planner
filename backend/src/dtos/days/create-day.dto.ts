import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateDayDto {
    @IsNotEmpty({message: 'Datum je obavezan.'})
    @IsDateString({}, {message: 'Format datuma mora biti ispravan'})
    date: string;
}