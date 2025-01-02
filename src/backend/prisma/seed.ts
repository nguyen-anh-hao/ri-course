// prisma/seed.ts

import { PrismaClient, Role } from "@prisma/client";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    const users = [
        {
            username: "user1",
            password:
                "$2b$11$iF.vIFWlXJdkhQCnDIrgxuC/VeD4CvI4qH9B5puZrr83My2NiKF2S",
            email: "user1@ricourse.com",
            roles: [Role.Learner],
            dob: new Date("2004-09-20"),
        },
        {
            username: "user2",
            password:
                "$2b$11$hlcxykhjO.YlVstp.z2zAOgj90mGK1Q3ejieZCnliOwlIsZ6mSwxu",
            email: "user2@ricourse.com",
            roles: [Role.Learner],
            dob: new Date("2005-09-20"),
        },
        {
            username: "user3",
            password:
                "$2b$11$fWN8U2inFKp9bxiXzLK7N.ZW7pKr2G/X1kA3ZWBJBFpN2nRtgluYC",
            email: "user3@ricourse.com",
            roles: [Role.Learner],
            dob: new Date("2006-09-20"),
        },
        {
            username: "user4",
            password:
                "$2b$11$x33wC4RG7xiWWNDix8HABO4NK67XpOei9hIX/ZrAdrjdDCZnvasri",
            email: "user4@ricourse.com",
            roles: [Role.Learner],
            dob: new Date("2007-09-20"),
        },
        {
            username: "user5",
            password:
                "$2b$11$ezrTdQZaPAxN6jacU9lhPefzcVfbRWUIZaxN01kSDS/gY2Nj..tDu",
            email: "user5@ricourse.com",
            roles: [Role.Admin],
            dob: new Date("2008-09-20"),
        },
    ];

    for (let user of users) {
        // const { username, password, email, roles, dob } = user;
        const newUser = await prisma.user.upsert({
            where: { username: user.username }, // only create if the info does not match this condition
            update: {},
            create: user,
        });
    }

    const courses = [
        {
            title: "course1",
            description: "course1 description",
        },
        {
            title: "course2",
            description: "course2 description",
        },
        {
            title: "course3",
            description: "course3 description",
        },
        {
            title: "course4",
            description: "course4 description",
        },
    ];

    for (let course of courses) {
        const newCourse = await prisma.course.upsert({
            where: { id: -1 }, // hong hieu
            update: {},
            create: course,
        });
    }

    const enrollments = [
        {
            learnerId: 1,
            courseId: 1,
        },
        {
            learnerId: 1,
            courseId: 2,
        },
        {
            learnerId: 2,
            courseId: 2,
        },
        {
            learnerId: 2,
            courseId: 3,
        },
        {
            learnerId: 4,
            courseId: 3,
        },
        {
            learnerId: 5,
            courseId: 1,
        },
    ];

    for (let enrollment of enrollments) {
        const newEnrollment = await prisma.enrollment.upsert({
            where: {
                learnerId_courseId: {
                    learnerId: enrollment.learnerId,
                    courseId: enrollment.courseId,
                },
            },
            update: {},
            create: enrollment,
        });
    }

    const auditLogs = [
        {
            actionType: "Update",
            userId: 1,
            adminId: 5,
            before: {
                username: "user1",
                password:
                    "$2b$11$iF.vIFWlXJdkhQCnDIrgxuC/VeD4CvI4qH9B5puZrr83My2NiKF2S",
                email: "user1@ricourse.com",
                roles: [Role.Learner],
                dob: new Date("2004-09-20"),
            },
            after: {
                username: "user1",
                password:
                    "$2b$11$iF.vIFWlXJdkhQCnDIrgxuC/VeD4CvI4qH9B5puZrr83My2NiKF2S",
                email: "user1new@ricourse.com",
                roles: [Role.Learner],
                dob: new Date("2004-09-20"),
            }
        },
        {
            actionType: "Update",
            userId: 3,
            adminId: 5,
            before: {
                username: "user3",
                password:
                    "$2b$11$fWN8U2inFKp9bxiXzLK7N.ZW7pKr2G/X1kA3ZWBJBFpN2nRtgluYC",
                email: "user3@ricourse.com",
                roles: [Role.Learner],
                dob: new Date("2006-09-20"),
            },
            after: {
                username: "user3",
                password:
                    "$2b$11$fWN8U2inFKp9bxiXzLK7N.ZW7pKr2G/X1kA3ZWBJBFpN2nRtgluYC",
                email: "user3@ricourse.com",
                roles: [Role.Learner],
                dob: new Date("2008-09-20"),
            }
        }
    ];

    for (let auditLog of auditLogs) {
        const newAuditLog = await prisma.auditLog.create({
            data: auditLog
        })
    }
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });
