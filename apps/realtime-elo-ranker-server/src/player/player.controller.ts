import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    try {
      const player = await this.playerService.create(createPlayerDto);
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
    return this.playerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerService.remove(+id);
  }
}
