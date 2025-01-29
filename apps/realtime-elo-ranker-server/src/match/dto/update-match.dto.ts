import { PartialType } from '@nestjs/mapped-types';
import { PublishMatchDto } from './publish-match.dto';

export class UpdateMatchDto extends PartialType(PublishMatchDto) {}
