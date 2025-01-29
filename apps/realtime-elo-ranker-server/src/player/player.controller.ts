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

@Controller('api')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('player')
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    try {
      const player = await this.playerService.create(createPlayerDto);
      return player;
    } catch (error) {
      if (error.message === 'Player already exists') {
        throw new ConflictException({
          code: 409,
          message: 'Le joueur existe déjà',
        });
      } else if (error.message === 'Invalid player ID') {
        throw new BadRequestException({
          code: 400,
          message: "L'identifiant du joueur n'est pas valide",
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
