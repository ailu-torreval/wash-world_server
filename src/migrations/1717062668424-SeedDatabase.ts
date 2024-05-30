import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDatabase1717062668424 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "wash_type" (name, description, price, points_reward, icon)
    VALUES 
    ('Basic', 'Shampoo,Rinse,AirDry', 49, 5, 'm,car-wash'),
    ('Gold', 'Basic +,Brush Washing,Rinse Wax', 79, 7, 'm,gold'),
    ('Premium', 'Gold +,Undercarriage Wash,Wheel Wash', 99, 9, 'f,gem'),
    ('All Inclusive', 'Premium +,Insect Repellent,Polishing', 109, 13, 'f,crown')`,
    );
    await queryRunner.query(
      `INSERT INTO "extra" (name, price, points_price, icon)
        VALUES 
        ('Vacuum - 5 min.', 20, 30, 'm,vacuum'),
        ('Polishing', 30, 50, 'f,hand-sparkles'),
        ('Wheel Wash', 30, 50, 'm,tire'),
        ('Undercarriage Wash', 35, 55, 'm,car-settings')`,
    );
    await queryRunner.query(
        `INSERT INTO "venue" (name, address, zip, city, lat, lng)
        VALUES 
        ('Herlev', '123 Venue Street', 12345, 'Venue City', 12.345678, 98.765432),
        ('Søborg', 'Tårnvej 33', 2600, 'Copenhagen', 12.345678, 98.765432),
        ('Hellerup', 'Onsgårdsvej 18', 2900, 'Copenhagen', 12.345678, 98.765432),
        ('Glostrup', 'Naverland 4', 2600, 'Copenhagen', 12.345678, 98.765432)`,
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "wash_type" WHERE name IN ('Basic', 'Gold', 'Premium', 'All Inclusive')`);
    await queryRunner.query(`DELETE FROM "extra" WHERE name IN ('Vacuum - 5 min.', 'Polishing', 'Wheel Wash', 'Undercarriage Wash')`);
    await queryRunner.query(`DELETE FROM "venue" WHERE name IN ('Herlev', 'Søborg', 'Hellerup', 'Glostrup')`);
  }
}


