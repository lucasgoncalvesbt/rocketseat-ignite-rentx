import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCaImages1640297033341 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_image',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'image_name',
            type: 'varchar',
          },
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKCarImage',
            columnNames: ['car_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_image');
  }
}
