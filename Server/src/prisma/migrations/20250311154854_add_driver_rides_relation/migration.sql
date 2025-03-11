-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePic" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "vehiclePic" TEXT NOT NULL,
    "vehicleSeats" INTEGER NOT NULL DEFAULT 1,
    "rating" DECIMAL(3,2) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rides" (
    "ride_id" SERIAL NOT NULL,
    "originAddress" TEXT NOT NULL,
    "destinationAddress" TEXT NOT NULL,
    "originLatitude" DECIMAL(9,6) NOT NULL,
    "originLongitude" DECIMAL(9,6) NOT NULL,
    "destinationLatitude" DECIMAL(9,6) NOT NULL,
    "destinationLongitude" DECIMAL(9,6) NOT NULL,
    "rideTime" INTEGER NOT NULL,
    "farePrice" DECIMAL(10,2) NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "Rides_pkey" PRIMARY KEY ("ride_id")
);

-- AddForeignKey
ALTER TABLE "Rides" ADD CONSTRAINT "Rides_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;
