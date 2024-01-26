import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  currentPage: number;
  @ApiProperty()
  itemsPerPage: number;
  @ApiProperty()
  totalItems: number;
  @ApiProperty()
  totalPages: number;

  constructor({ filterDto, totalItems }) {
    this.currentPage = filterDto.page;
    this.itemsPerPage = filterDto.limit;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
