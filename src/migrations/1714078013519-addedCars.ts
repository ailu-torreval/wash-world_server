import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCars1714078013519 implements MigrationInterface {
    name = 'AddedCars1714078013519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "license_plate" character varying NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "car"`);
    }

}
