"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("./player.service");
const create_player_dto_1 = require("./dto/create-player.dto");
const update_player_dto_1 = require("./dto/update-player.dto");
let PlayersController = class PlayersController {
    constructor(playersService) {
        this.playersService = playersService;
    }
    async createPlayer(createPlayerDto) {
        try {
            const player = await this.playersService.create(createPlayerDto);
            return player;
        }
        catch (error) {
            if (error.message === 'Player already exists') {
                throw new common_1.ConflictException({
                    code: 409,
                    message: 'Le joueur existe déjà',
                });
            }
            else if (error.message === 'Invalid player ID') {
                throw new common_1.BadRequestException({
                    code: 400,
                    message: "L'identifiant du joueur n'est pas valide",
                });
            }
        }
    }
    findAll() {
        return this.playersService.findAll();
    }
    findOne(id) {
        return this.playersService.findOne(+id);
    }
    update(id, updatePlayerDto) {
        return this.playersService.update(+id, updatePlayerDto);
    }
    remove(id) {
        return this.playersService.remove(+id);
    }
};
exports.PlayersController = PlayersController;
__decorate([
    (0, common_1.Post)('player'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_player_dto_1.CreatePlayerDto]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "createPlayer", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_player_dto_1.UpdatePlayerDto]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "remove", null);
exports.PlayersController = PlayersController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [player_service_1.PlayersService])
], PlayersController);
//# sourceMappingURL=player.controller.js.map