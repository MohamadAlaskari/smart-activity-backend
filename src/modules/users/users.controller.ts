import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Patch,
    UseGuards,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from 'src/modules/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from './entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get()
    @ApiOperation({ summary: 'Get user information by token' })
    findOne(@CurrentUser() user: User) {
        return this.usersService.findOne(user.id);
    }

    @Patch()
    @ApiOperation({ summary: 'Update user information by token' })
    update(@CurrentUser() user: User, @Body() dto: UpdateUserDto) {
        return this.usersService.update(user.id, dto);
    }

    @Delete()
    @ApiOperation({ summary: 'Delete user account by token' })
    remove(@CurrentUser() user: User) {
        return this.usersService.remove(user.id);
    }
}
