import { IsString, IsNumber, IsIn } from 'class-validator';

export class CreateScoreDto {
    @IsString()
    @IsIn(['addition', 'subtraction', 'multiplication'])
    gameType: string;

    @IsNumber()
    score: number;

    @IsString()
    difficulty: string;
}