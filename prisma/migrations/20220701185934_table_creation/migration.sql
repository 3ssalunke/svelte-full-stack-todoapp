-- CreateTable
CREATE TABLE "Todo" (
    "uid" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("uid")
);