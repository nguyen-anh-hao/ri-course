// import { Body, Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";
// import { MentorCoursesService } from "./mentor-courses.service";
// import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
// import { CreateMentorCourseDto } from "./dtos/create-mentor-course.dto";
// import { DeleteMentorCourseDto } from "./dtos/delete-mentor-course.dto";
// import { JwtAuthGuard, RolesGuard } from "src/auth/guards";
// import { Role, Roles } from "src/auth/role";

// @UseGuards(JwtAuthGuard)
// @UseGuards(RolesGuard)
// @Controller("mentor-courses")
// export class MentorCoursesController {
//     constructor(private mentorCoursesService : MentorCoursesService) {}

//     @ApiBearerAuth()
//     @ApiOperation({
//         summary: "Assign a mentor to a course (Admin only)"
//     })
//     @ApiBody({
//         type: CreateMentorCourseDto
//     })
//     @ApiCreatedResponse({
//         description: "Created: Assign a mentor to a course successfully"
//     })
//     @ApiUnauthorizedResponse({
//         description: "Missing JWT"
//     })
//     @ApiForbiddenResponse({
//         description: "The user with JWT must be an Admin"
//     })
//     @Roles(Role.Admin)
//     @Post()
//     async createMentorCourseAssignment(@Body() createMentorCourseDto : CreateMentorCourseDto) {
//         const { mentorId, courseId } = createMentorCourseDto;
//         await this.mentorCoursesService.assign(mentorId, courseId);
//     }
    
//     // -----------------------------------------------

//     @ApiBearerAuth()
//     @ApiOperation({
//         summary: "Get all mentor courses' assignments (Admin only)"
//     })
//     @ApiOkResponse({
//         description: "Ok: Fetch all mentor courses' assignments successfully"
//     })
//     @ApiUnauthorizedResponse({
//         description: "Missing JWT"
//     })
//     @ApiForbiddenResponse({
//         description: "The user with JWT must be an Admin"
//     })
//     @Roles(Role.Admin)
//     @Get()
//     async getAllAssignments() {
//         return await this.mentorCoursesService.findAll();
//     }
    
//     // -----------------------------------------------

//     @ApiBearerAuth()
//     @ApiOperation({
//         summary: "Delete a mentor-course (Admin only)"
//     })
//     @ApiBody({
//         type: DeleteMentorCourseDto
//     })
//     @ApiOkResponse({
//         description: "Deleted: Delete a mentor-course successfully"
//     })
//     @ApiUnauthorizedResponse({
//         description: "Missing JWT"
//     })
//     @ApiForbiddenResponse({
//         description: "The user with JWT must be an Admin"
//     })
//     @Roles(Role.Admin)
//     @Delete()
//     async deleteMentorCourseAssignment(@Body() deleteMentorCourseDto : DeleteMentorCourseDto) {
//         const { mentorId, courseId } = deleteMentorCourseDto;
//         return await this.mentorCoursesService.unassign(mentorId, courseId);
//     }
// }