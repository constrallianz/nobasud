-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "education" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "salary" TEXT,
ADD COLUMN     "type" TEXT;
