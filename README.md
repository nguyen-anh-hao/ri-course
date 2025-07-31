# RiCourse - Teaching and learning management application

A platform similar to Coursera, designed to provide users with the ability to create, enroll in, and track online courses. 
Instructors can create and upload course materials, such as videos, quizzes, and assignments, while students can register, access content, and track their learning progress. 
The project also involved implementing DevOps practices to ensure continuous integration and delivery for seamless user experiences.

## Live Demo
- API Document: https://ri-course.onrender.com/api/ _(API may take ~30s to respond if idle, please access once to wake before access below website)_
- Website: https://ri-course.vercel.app/
- Screenshots:

  - Sign In
    <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2b326539-ea3e-4419-bdec-21bdce97d1d4" />

   - User Profile
     <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/25ac9899-e72c-461c-9c2d-5ae96d58ddf8" />

  - Exams Management
    <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8d5d8571-a420-434f-ba17-d3be6e748b23" />

  _More details on Behance (coming soon)_


## Key Features
- Full CRUD functionality
- User authentication (login/register)
- File upload (images/docs)
- Responsive layout (Mobile & Desktop)
- Light/Dark Mode

## Techstack
| Category        | Tools / Frameworks                                          |
|-----------------|-------------------------------------------------------------|
| Frontend        | React, Next.js (App Router), TypeScript, Material UI        |
| Backend         | Node.js, NestJS, TypeScript, Prisma ORM                     |
| AI Module       | OpenCV, Face Detection                                      |
| Database        | PostgreSQL, Cloudinary                                      |
| Others          | Vercel, ESLint, Prettier, Cypress, Docker, GitHub Actions   |

## Project Structure
```bash
.
├── .github/               # CI/CD workflows (GitHub Actions)
│ └── workflows/           # Includes ci.yml, cd.yml
│
├── docs/                  # Documentation (Architecture, Requirements, UI)
│ ├── analysis and design/
│ ├── management/
│ └── requirements/
│
├── pa/                    # Project assessment reports (weekly & phase-wise)
│ ├── pa0/ → pa4/
│
├── src/
│ ├── ai/                  # AI modules (Object Detection, Frame Capturing, Flask app)
│ ├── backend/             # NestJS Backend: Auth, Courses, Users, Prisma, Cloudinary, etc.
│ └── frontend/            # Next.js App: Learner/Admin/Mentor portals, Storybook, Cypress
│
├── docker-compose.yml     # Docker services for full-stack
└── README.md              # Project overview
```

## Getting Started
See [README.md](https://github.com/nguyen-anh-hao/ri-course/blob/main/src/README.md) in /src

## Authors
- **Nguyễn Anh Hào** – Team Lead · Frontend Developer · UI/UX Designer - [GitHub](https://github.com/nguyen-anh-hao)
- **Lê Anh Khôi** – Backend Developer - [GitHub](https://github.com/theConnectorr)
- **Nguyễn Trung Kiên (1)** – Backend Developer - [GitHub](https://github.com/KienHCMUS)
- **Nguyễn Trung Kiên (2)** – Frontend Developer - [GitHub](https://github.com/kiyoneshin)
- **Lê Đình Hoàng Vũ** - AI & Computer Vision Developer - [GitHub](https://github.com/ldhv-04)
