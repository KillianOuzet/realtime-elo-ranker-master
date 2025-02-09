"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConfig = void 0;
const player_entity_1 = require("../player/entities/player.entity");
exports.testConfig = {
    type: 'sqlite',
    database: ':memory:',
    entities: [player_entity_1.Player],
    synchronize: true,
};
//# sourceMappingURL=test.config.js.map