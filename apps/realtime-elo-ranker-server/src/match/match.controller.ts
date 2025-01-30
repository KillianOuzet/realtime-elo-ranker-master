import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MatchService } from './match.service';
import { PublishMatchDto } from './dto/publish-match.dto';

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
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
}
