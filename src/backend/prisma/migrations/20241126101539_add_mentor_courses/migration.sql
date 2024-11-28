-- CreateTable
CREATE TABLE "CourseMentor" (
    "mentorId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CourseMentor_pkey" PRIMARY KEY ("mentorId","courseId")
);

-- AddForeignKey
ALTER TABLE "CourseMentor" ADD CONSTRAINT "CourseMentor_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseMentor" ADD CONSTRAINT "CourseMentor_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
