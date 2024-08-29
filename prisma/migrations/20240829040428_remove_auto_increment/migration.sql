-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "auction_date" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "reserve_price" DOUBLE PRECISION NOT NULL,
    "estimate_price" DOUBLE PRECISION,
    "property_size" DOUBLE PRECISION NOT NULL,
    "property_type" TEXT NOT NULL,
    "tenure" TEXT NOT NULL,
    "image_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);
