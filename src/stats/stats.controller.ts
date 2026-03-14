import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateScoreDto } from './dto/create-score.dto';


interface RequestWithUser extends Request {
    user: { id: string; email: string };
}

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
    constructor(private readonly statsService: StatsService) { }

    @Post('save')
    async save(@Req() req, @Body() body: CreateScoreDto) {
        return this.statsService.createScore(req.user.id, body);
    }

    @Get('dashboard-summary')
    async getSummary(@Req() req: RequestWithUser) {
        return this.statsService.getUserSummary(req.user.id);
    }

    @Get('recent')
    async getRecent(@Req() req: RequestWithUser) {
        return this.statsService.getRecentActivity(req.user.id);
    }
}