import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FlowService } from './flow.service';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('flows')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@GetUser('id') userId: string, @Body() dto: CreateFlowDto) {
    return this.flowService.create(userId, dto);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.flowService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.flowService.findOne(id, userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() updateFlowDto: UpdateFlowDto,
  ) {
    return this.flowService.update(id, userId, updateFlowDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.flowService.remove(id, userId);
  }
}
