import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        console.log('DEBUG: La URL detectada es:', process.env.DATABASE_URL ? '✅ Cargada' : '❌ NULA');
        const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
}

