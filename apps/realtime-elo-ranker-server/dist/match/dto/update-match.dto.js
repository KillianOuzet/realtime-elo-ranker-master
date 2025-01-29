"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMatchDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const publish_match_dto_1 = require("./publish-match.dto");
class UpdateMatchDto extends (0, mapped_types_1.PartialType)(publish_match_dto_1.PublishMatchDto) {
}
exports.UpdateMatchDto = UpdateMatchDto;
//# sourceMappingURL=update-match.dto.js.map