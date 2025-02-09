"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const player_module_1 = require("./player/player.module");
const match_module_1 = require("./match/match.module");
const ranking_module_1 = require("./ranking/ranking.module");
const player_entity_1 = require("./player/entities/player.entity");
const test_config_1 = require("./config/test.config");
const event_emitter_module_1 = require("@nestjs/event-emitter/dist/event-emitter.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            player_module_1.PlayerModule,
            match_module_1.MatchModule,
            ranking_module_1.RankingModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => {
                    if (process.env.NODE_ENV === 'test') {
                        return test_config_1.testConfig;
                    }
                    return {
                        type: 'sqlite',
                        database: 'eloranker.sqlite',
                        entities: [player_entity_1.Player],
                        synchronize: true,
                    };
                },
            }),
            event_emitter_module_1.EventEmitterModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map