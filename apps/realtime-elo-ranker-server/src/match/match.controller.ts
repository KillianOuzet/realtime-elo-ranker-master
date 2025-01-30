import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
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
      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException({
          code: 422,
          message: "Un des joueur n'existe pas",
        });
      }
    }
  }
}
