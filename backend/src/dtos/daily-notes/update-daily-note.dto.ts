import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDailyNoteDto{
    @IsOptional()
    @IsString()
    title?:string;

    @IsOptional()
    @IsString()
    time?: string;

    @IsOptional()
    @IsString()
    location?:string;

    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @IsString()
    textType?: string;

    @IsOptional()
    @IsNumber()
    textHeight?: number;
}