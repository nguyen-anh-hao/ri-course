import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiExcludeEndpoint } from "@nestjs/swagger";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiExcludeEndpoint()
    @Get("test")
    test() {
        return this.appService.test();
    }
}
