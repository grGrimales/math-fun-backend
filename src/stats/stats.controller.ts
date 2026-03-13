import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
    constructor(private readonly statsService: StatsService) { }

    @Post('save')
    async save(@Req() req, @Body() body: { gameType: string; score: number; difficulty: string }) {
        return this.statsService.createScore(req.user.id, body);
    }

    @Get('dashboard-summary')
    async getSummary(@Req() req) {
        return this.statsService.getUserSummary(req.user.id);
    }
}