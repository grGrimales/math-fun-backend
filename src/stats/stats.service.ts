import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StatsService {
    constructor(private prisma: PrismaService) { }

    async createScore(userId: string, data: { gameType: string; score: number; difficulty: string }) {
        return this.prisma.gameScore.create({
            data: {
                gameType: data.gameType,
                score: data.score,
                difficulty: data.difficulty,
                userId: userId,
            },
        });
    }

    async getUserSummary(userId: string) {
        const scores = await this.prisma.gameScore.findMany({
            where: { userId },
        });

        const totalHits = scores.reduce((acc, curr) => acc + curr.score, 0);

        const uniqueDays = new Set(
            scores.map(s => s.createdAt.toISOString().split('T')[0])
        ).size;

        return {
            hits: totalHits,
            stars: totalHits * 10,
            streak: uniqueDays,
        };
    }

    async getRecentActivity(userId: string) {
        return this.prisma.gameScore.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
    }
}