import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    try {
      const player = this.playerService.create(createPlayerDto);
      return player;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException({
          code: 409,
          message: error.message,
        });
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException({
          code: 400,
          message: error.message,
        });
      }
    }
  }

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.getPlayerById(id);
  }
}
