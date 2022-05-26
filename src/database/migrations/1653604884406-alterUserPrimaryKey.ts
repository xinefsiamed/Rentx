import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterUserPrimaryKey1653604884406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users ADD PRIMARY KEY (id)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return null;
  }
}
