import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseMigration1654117138321 implements MigrationInterface {
  name = 'BaseMigration1654117138321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`
    );
    await queryRunner.query(
      `CREATE TABLE "register" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "deadline" datetime NOT NULL, "type" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "equipmentId" varchar, "userId" varchar)`
    );
    await queryRunner.query(
      `CREATE TABLE "equipment" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_b44a87bec78c8cf13f5bb838577" UNIQUE ("name"))`
    );
    await queryRunner.query(
      `CREATE TABLE "token" ("token" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_register" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "deadline" datetime NOT NULL, "type" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "equipmentId" varchar, "userId" varchar, CONSTRAINT "FK_5a64186d502678cfa3e2e6ecfd3" FOREIGN KEY ("equipmentId") REFERENCES "equipment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a26b5f096b5de384c63e80de30e" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_register"("id", "description", "deadline", "type", "created_at", "updated_at", "equipmentId", "userId") SELECT "id", "description", "deadline", "type", "created_at", "updated_at", "equipmentId", "userId" FROM "register"`
    );
    await queryRunner.query(`DROP TABLE "register"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_register" RENAME TO "register"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "register" RENAME TO "temporary_register"`
    );
    await queryRunner.query(
      `CREATE TABLE "register" ("id" varchar PRIMARY KEY NOT NULL, "description" varchar NOT NULL, "deadline" datetime NOT NULL, "type" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "equipmentId" varchar, "userId" varchar)`
    );
    await queryRunner.query(
      `INSERT INTO "register"("id", "description", "deadline", "type", "created_at", "updated_at", "equipmentId", "userId") SELECT "id", "description", "deadline", "type", "created_at", "updated_at", "equipmentId", "userId" FROM "temporary_register"`
    );
    await queryRunner.query(`DROP TABLE "temporary_register"`);
    await queryRunner.query(`DROP TABLE "token"`);
    await queryRunner.query(`DROP TABLE "equipment"`);
    await queryRunner.query(`DROP TABLE "register"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
