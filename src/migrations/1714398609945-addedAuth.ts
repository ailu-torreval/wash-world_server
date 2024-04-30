import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedAuth1714398609945 implements MigrationInterface {
    name = 'AddedAuth1714398609945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "reward_points_balance" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "reward_points_balance" DROP DEFAULT`);
    }

}
