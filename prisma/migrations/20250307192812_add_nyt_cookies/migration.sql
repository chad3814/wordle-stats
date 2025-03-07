/*
  Warnings:

  - Added the required column `nytCookies` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "nytCookies" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "refreshToken", "token") SELECT "id", "refreshToken", "token" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
