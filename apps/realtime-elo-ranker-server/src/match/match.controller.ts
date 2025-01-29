import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { PublishMatchDto } from './dto/publish-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Controller('api')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('match')
  publish(@Body() publishMatchDto: PublishMatchDto) {
    try {
      const match = this.matchService.publishResults(publishMatchDto);
      return match;
    } catch (error) {
      if (error.message === 'One or both players not found') {
        throw new BadRequestException({
          code: 422,
          message: "Un des joueur n'existe pas",
        });
      }
    }
  }

  @Get()
  findAll() {
    return this.matchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.update(+id, updateMatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchService.remove(+id);
  }
}
