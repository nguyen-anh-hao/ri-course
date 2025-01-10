// prisma/seed.ts

import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    const users = [
        {
            fullname: "User 1",
            username: "user1",
            password: await bcrypt.hash("user1", 1),
            email: "user1@ricourse.com",
            roles: [Role.Learner],
            dob: new Date("2004-09-20"),
        },
        {
            fullname: "User 2",
            username: "user2",
            password: await bcrypt.hash("user2", 1),
            email: "user2@ricourse.com",
            roles: [Role.Learner],
            dob: new Date("2005-09-20"),
        },
        {
            fullname: "User 3",
            username: "user3",
            password: await bcrypt.hash("user3", 1),
            email: "user3@ricourse.com",
            roles: [Role.Learner],
            dob: new Date("2006-09-20"),
        },
        {
            fullname: "User 4",
            username: "user4",
            password: await bcrypt.hash("user4", 1),
            email: "user4@ricourse.com",
            roles: [Role.Mentor],
            dob: new Date("2007-09-20"),
        },
        {
            fullname: "User 5",
            username: "user5",
            password: await bcrypt.hash("user5", 1),
            email: "user5@ricourse.com",
            roles: [Role.Admin],
            dob: new Date("2008-09-20"),
        },
        {
            fullname: "User 6",
            username: "user6",
            password: await bcrypt.hash("user6", 1),
            email: "user6@ricourse.com",
            roles: [Role.Admin],
            dob: new Date("2008-09-20"),
        },
        {
            fullname: "User 7",
            username: "user7",
            password: await bcrypt.hash("user7", 1),
            email: "user7@ricourse.com",
            roles: [Role.Mentor],
            dob: new Date("2007-09-20"),
        },
    ];

    for (let user of users) {
        const newUser = await prisma.user.upsert({
            where: { username: user.username }, // only create if the info does not match this condition
            update: {},
            create: user,
        });
    }

    const courses = [
        {
            title: "Lập trình C++ cơ bản",
            description: "Khóa học cung cấp các kiến thức cơ bản về lập trình C++, từ những khái niệm cơ bản như biến, kiểu dữ liệu, toán tử cho đến các cấu trúc điều khiển như vòng lặp, câu lệnh điều kiện. Khóa học cũng bao gồm các khái niệm về hàm, mảng, con trỏ, và quản lý bộ nhớ.",
        },
        {
            title: "Lập trình Web Full Stack",
            description: "Khóa học miễn phí về lập trình web full stack, bao gồm cả frontend và backend. Bạn sẽ học HTML, CSS, JavaScript, React (front-end), Node.js, Express, MongoDB (back-end). Khóa học còn đi kèm với các dự án thực tế để bạn có thể thực hành và xây dựng các ứng dụng web hoàn chỉnh.",
        },
        {
            title: "Lập trình ứng dụng di động với Flutter",
            description: "Flutter là một framework phát triển ứng dụng di động mạnh mẽ của Google, giúp bạn xây dựng ứng dụng cho cả Android và iOS từ một mã nguồn duy nhất. Khóa học này trên RiCourse cung cấp các kiến thức từ cơ bản đến nâng cao, bao gồm cách sử dụng Dart (ngôn ngữ lập trình của Flutter), xây dựng giao diện người dùng, và triển khai ứng dụng di động.",
        },
        {
            title: "Phát triển ứng dụng Windows với C# và .NET",
            description: "Khóa học này cung cấp cái nhìn tổng quan về WinUI 3, giúp người học hiểu các thành phần cơ bản của ứng dụng WinUI, từ các điều khiển UI đến cách tích hợp với các dịch vụ nền tảng của Windows. Các học viên sẽ học cách xây dựng ứng dụng Windows hiện đại với WinUI 3, sử dụng .NET 5/6 và C#. Khóa học còn bao gồm việc làm quen với các khái niệm như data binding, commands, và navigation.",
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
