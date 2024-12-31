import { Module } from "@nestjs/common";
import { ChaptersService } from "./chapters.service";

@Module({
    providers: [ChaptersService],
    exports: [ChaptersService]
})
export class ChaptersModule {}