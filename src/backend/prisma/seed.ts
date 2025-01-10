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
            description:
                "Khóa học cung cấp các kiến thức cơ bản về lập trình C++, từ những khái niệm cơ bản như biến, kiểu dữ liệu, toán tử cho đến các cấu trúc điều khiển như vòng lặp, câu lệnh điều kiện. Khóa học cũng bao gồm các khái niệm về hàm, mảng, con trỏ, và quản lý bộ nhớ.",
        },
        {
            title: "Lập trình Web Full Stack",
            description:
                "Khóa học miễn phí về lập trình web full stack, bao gồm cả frontend và backend. Bạn sẽ học HTML, CSS, JavaScript, React (front-end), Node.js, Express, MongoDB (back-end). Khóa học còn đi kèm với các dự án thực tế để bạn có thể thực hành và xây dựng các ứng dụng web hoàn chỉnh.",
        },
        {
            title: "Lập trình ứng dụng di động với Flutter",
            description:
                "Flutter là một framework phát triển ứng dụng di động mạnh mẽ của Google, giúp bạn xây dựng ứng dụng cho cả Android và iOS từ một mã nguồn duy nhất. Khóa học này trên RiCourse cung cấp các kiến thức từ cơ bản đến nâng cao, bao gồm cách sử dụng Dart (ngôn ngữ lập trình của Flutter), xây dựng giao diện người dùng, và triển khai ứng dụng di động.",
        },
        {
            title: "Phát triển ứng dụng Windows với C# và .NET",
            description:
                "Khóa học này cung cấp cái nhìn tổng quan về WinUI 3, giúp người học hiểu các thành phần cơ bản của ứng dụng WinUI, từ các điều khiển UI đến cách tích hợp với các dịch vụ nền tảng của Windows. Các học viên sẽ học cách xây dựng ứng dụng Windows hiện đại với WinUI 3, sử dụng .NET 5/6 và C#. Khóa học còn bao gồm việc làm quen với các khái niệm như data binding, commands, và navigation.",
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

    const mentorPermissions = [
        {
            mentorId: 4,
            courseId: 1,
        },
        {
            mentorId: 4,
            courseId: 2,
        },
        {
            mentorId: 4,
            courseId: 3,
        },
        {
            mentorId: 7,
            courseId: 2,
        },
        {
            mentorId: 7,
            courseId: 4,
        },
    ];

    for (const mentorPermission of mentorPermissions) {
        const newMentorPermission = await prisma.mentorPermission.create({
            data: mentorPermission,
        });
    }

    const chapters = [
        {
            courseId: 1,
            order: 1,
            title: "Giới thiệu về lập trình C++",
            description:
                "Tìm hiểu về ngôn ngữ C++, lịch sử phát triển và các ứng dụng của nó trong thực tế.",
        },
        {
            courseId: 1,
            order: 2,
            title: "Cấu trúc cơ bản của chương trình C++",
            description:
                "Học về cấu trúc cơ bản của một chương trình C++ bao gồm hàm main, câu lệnh và cách biên dịch chương trình.",
        },
        {
            courseId: 1,
            order: 3,
            title: "Biến, kiểu dữ liệu và toán tử",
            description:
                "Tìm hiểu cách khai báo biến, các kiểu dữ liệu cơ bản và cách sử dụng các toán tử trong C++.",
        },
        {
            courseId: 1,
            order: 4,
            title: "Câu lệnh điều kiện và vòng lặp",
            description:
                "Hướng dẫn sử dụng câu lệnh if-else, switch-case và các vòng lặp như for, while, do-while.",
        },
        {
            courseId: 1,
            order: 5,
            title: "Hàm và lập trình hướng đối tượng (OOP)",
            description:
                "Giới thiệu cách viết hàm trong C++ và các khái niệm cơ bản của lập trình hướng đối tượng như class, object, inheritance và polymorphism.",
        },
        {
            courseId: 2,
            order: 1,
            title: "Giới thiệu về lập trình web Fullstack",
            description:
                "Tìm hiểu khái niệm lập trình web Fullstack và vai trò của một lập trình viên Fullstack.",
        },
        {
            courseId: 2,
            order: 2,
            title: "HTML và CSS cơ bản",
            description:
                "Học cách xây dựng giao diện web cơ bản bằng HTML và CSS, bao gồm các thẻ HTML và styling cơ bản.",
        },
        {
            courseId: 2,
            order: 3,
            title: "JavaScript cơ bản",
            description:
                "Tìm hiểu cách sử dụng JavaScript để thêm tính năng động cho trang web.",
        },
        {
            courseId: 2,
            order: 4,
            title: "Xây dựng giao diện người dùng (UI) với thư viện",
            description:
                "Học cách sử dụng thư viện như React hoặc Vue để xây dựng giao diện người dùng hiện đại.",
        },
        {
            courseId: 2,
            order: 5,
            title: "Làm việc với server và API",
            description:
                "Tìm hiểu về server, API và cách giao tiếp giữa frontend và backend bằng HTTP và RESTful API.",
        },
        {
            courseId: 2,
            order: 6,
            title: "Xây dựng Backend với Node.js và Express",
            description:
                "Học cách sử dụng Node.js và Express để xây dựng server và xử lý logic phía backend.",
        },
        {
            courseId: 2,
            order: 7,
            title: "Tích hợp cơ sở dữ liệu",
            description:
                "Tìm hiểu cách sử dụng cơ sở dữ liệu như MongoDB hoặc MySQL để lưu trữ và quản lý dữ liệu.",
        },
        {
            courseId: 2,
            order: 8,
            title: "Authentication và Authorization",
            description:
                "Hướng dẫn cách triển khai xác thực và phân quyền người dùng trong ứng dụng web.",
        },
        {
            courseId: 2,
            order: 9,
            title: "Triển khai ứng dụng web",
            description:
                "Tìm hiểu cách triển khai ứng dụng web lên các nền tảng như Heroku, Vercel hoặc AWS.",
        },
        {
            courseId: 2,
            order: 10,
            title: "Tối ưu hóa và bảo mật ứng dụng web",
            description:
                "Học cách cải thiện hiệu năng và bảo mật cho ứng dụng web của bạn.",
        },
        {
            courseId: 3,
            order: 1,
            title: "Giới thiệu về Flutter và Dart",
            description:
                "Tìm hiểu về Flutter, framework phát triển ứng dụng đa nền tảng, và ngôn ngữ lập trình Dart.",
        },
        {
            courseId: 3,
            order: 2,
            title: "Cài đặt môi trường phát triển Flutter",
            description:
                "Hướng dẫn cài đặt Flutter SDK, Dart, và các công cụ như Android Studio hoặc VS Code.",
        },
        {
            courseId: 3,
            order: 3,
            title: "Kiến trúc ứng dụng Flutter cơ bản",
            description:
                "Học về widget trong Flutter, cách tổ chức cấu trúc ứng dụng, và cách xây dựng giao diện cơ bản.",
        },
        {
            courseId: 3,
            order: 4,
            title: "Quản lý trạng thái với Provider",
            description:
                "Tìm hiểu cách sử dụng Provider để quản lý trạng thái trong ứng dụng Flutter.",
        },
        {
            courseId: 3,
            order: 5,
            title: "Xây dựng giao diện tương tác và hiệu ứng",
            description:
                "Học cách tạo các giao diện tương tác và thêm hiệu ứng động vào ứng dụng Flutter của bạn.",
        },
        {
            courseId: 3,
            order: 6,
            title: "Kết nối với API và xử lý dữ liệu",
            description:
                "Hướng dẫn cách gọi API, xử lý dữ liệu JSON, và hiển thị dữ liệu từ server trong ứng dụng Flutter.",
        },
        {
            courseId: 3,
            order: 7,
            title: "Làm việc với Firebase",
            description:
                "Tìm hiểu cách tích hợp Firebase Authentication, Firestore, và các dịch vụ khác của Firebase vào ứng dụng Flutter.",
        },
        {
            courseId: 3,
            order: 8,
            title: "Triển khai ứng dụng Flutter lên App Store và Google Play",
            description:
                "Hướng dẫn đóng gói và triển khai ứng dụng Flutter của bạn lên App Store và Google Play.",
        },
        {
            courseId: 4,
            order: 1,
            title: "Giới thiệu về C# và .NET",
            description:
                "Tìm hiểu về ngôn ngữ C#, nền tảng .NET, và các ứng dụng phổ biến của chúng trong phát triển phần mềm Windows.",
        },
        {
            courseId: 4,
            order: 2,
            title: "Cài đặt môi trường phát triển",
            description:
                "Hướng dẫn cài đặt Visual Studio và cấu hình môi trường để phát triển ứng dụng Windows với C# và .NET.",
        },
        {
            courseId: 4,
            order: 3,
            title: "Tìm hiểu WinForms và WPF",
            description:
                "So sánh WinForms và WPF, và học cách xây dựng giao diện người dùng đơn giản với WinForms.",
        },
        {
            courseId: 4,
            order: 4,
            title: "Xây dựng ứng dụng Windows cơ bản",
            description:
                "Học cách tạo ứng dụng Windows đầu tiên với các chức năng cơ bản như nhập liệu và hiển thị dữ liệu.",
        },
        {
            courseId: 4,
            order: 5,
            title: "Làm việc với cơ sở dữ liệu",
            description:
                "Hướng dẫn kết nối ứng dụng Windows với cơ sở dữ liệu SQL Server và thực hiện các thao tác CRUD.",
        },
        {
            courseId: 4,
            order: 6,
            title: "Tích hợp API và dịch vụ web",
            description:
                "Học cách gọi và sử dụng API từ ứng dụng Windows để mở rộng chức năng.",
        },
        {
            courseId: 4,
            order: 7,
            title: "Xử lý sự kiện và đa luồng",
            description:
                "Tìm hiểu cách xử lý các sự kiện và sử dụng đa luồng để cải thiện hiệu năng của ứng dụng.",
        },
        {
            courseId: 4,
            order: 8,
            title: "Đóng gói và triển khai ứng dụng Windows",
            description:
                "Hướng dẫn đóng gói ứng dụng và triển khai trên hệ thống Windows hoặc mạng nội bộ.",
        },
    ];

    for (const chapter of chapters) {
        const newChapter = await prisma.chapter.create({
            data: chapter,
        });
    }

    const lessons = [
        {
            chapterId: 24,
            order: 1,
            title: "Giới thiệu về C# và .NET",
            description: "Tìm hiểu về lịch sử và kiến trúc của .NET.",
            type: "Lecture",
            contentUrl: "",
        },
        {
            chapterId: 24,
            order: 2,
            title: "Bài tập thực hành cơ bản với C#",
            description: "Tạo chương trình Hello World đầu tiên trong C#.",
            type: "Exercise",
            contentUrl: "",
        },
        {
            chapterId: 25,
            order: 1,
            title: "Cài đặt môi trường phát triển",
            description:
                "Hướng dẫn cài đặt Visual Studio và các công cụ cần thiết.",
            type: "Lecture",
            contentUrl: "",
        },
        {
            chapterId: 25,
            order: 2,
            title: "Bài tập cấu hình môi trường",
            description: "Tạo và chạy một dự án console C# đơn giản.",
            type: "Exercise",
            contentUrl: "",
        },
        {
            chapterId: 26,
            order: 1,
            title: "Tìm hiểu WinForms và WPF",
            description: "So sánh và lựa chọn giữa WinForms và WPF.",
            type: "Lecture",
            contentUrl: "",
        },
        {
            chapterId: 26,
            order: 2,
            title: "Bài tập xây dựng giao diện cơ bản",
            description: "Tạo một giao diện đơn giản với WinForms.",
            type: "Exercise",
            contentUrl: "",
        },
        {
            chapterId: 27,
            order: 1,
            title: "Xây dựng ứng dụng Windows cơ bản",
            description:
                "Tìm hiểu cách xây dựng ứng dụng Windows với các chức năng cơ bản.",
            type: "Lecture",
            contentUrl: "",
        },
        {
            chapterId: 27,
            order: 2,
            title: "Bài tập xây dựng ứng dụng",
            description: "Tạo ứng dụng quản lý danh bạ đơn giản.",
            type: "Exercise",
            contentUrl: "",
        },
        {
            chapterId: 28,
            order: 1,
            title: "Làm việc với cơ sở dữ liệu",
            description: "Hướng dẫn kết nối ứng dụng với SQL Server.",
            type: "Lecture",
            contentUrl: "",
        },
        {
            chapterId: 28,
            order: 2,
            title: "Bài tập thao tác với dữ liệu",
            description:
                "Thực hiện các thao tác thêm, sửa, xóa dữ liệu từ ứng dụng.",
            type: "Exercise",
            contentUrl: "",
        },
        {
            chapterId: 29,
            order: 1,
            title: "Tích hợp API và dịch vụ web",
            description: "Tìm hiểu cách tích hợp API vào ứng dụng.",
            type: "Lecture",
            contentUrl: "",
        },
        {
            chapterId: 29,
            order: 2,
            title: "Bài tập sử dụng API",
            description: "Tạo ứng dụng hiển thị dữ liệu từ API mở.",
            type: "Exercise",
            contentUrl: "",
        },
        {
            chapterId: 30,
            order: 1,
            title: "Xử lý sự kiện và đa luồng",
            description:
                "Học cách xử lý sự kiện và cải thiện hiệu năng bằng đa luồng.",
            type: "Lecture",
            contentUrl: "",
        },
        {
            chapterId: 30,
            order: 2,
            title: "Bài tập xử lý sự kiện",
            description: "Tạo ứng dụng phản hồi các thao tác người dùng.",
            type: "Exercise",
            contentUrl: "",
        },
        {
            chapterId: 31,
            order: 1,
            title: "Đóng gói và triển khai ứng dụng",
            description: "Hướng dẫn đóng gói ứng dụng Windows để triển khai.",
            type: "Lecture",
            contentUrl: "",
        },
        {
            chapterId: 31,
            order: 2,
            title: "Bài tập triển khai ứng dụng",
            description:
                "Triển khai ứng dụng trên hệ thống Windows và kiểm tra.",
            type: "Exercise",
            contentUrl: "",
        },
    ];

    for (const lesson of lessons) {
        const newLesson = await prisma.lesson.create({
            data: lesson
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
