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
import { PlayersService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('api')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('player')
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    try {
      const player = await this.playersService.create(createPlayerDto);
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
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
