import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, HttpCode, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
import { Product } from './interface/product.interface';

@Controller('product')
export class ProductController {
    constructor(private service: ProductService) { }

    @Get()
    async getProducts(): Promise<Product[]> {
        const products = await this.service.getProducts();

        if (!products) {
            throw new NotFoundException('Product table is empty');
        }

        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        const product = await this.service.getProduct(id);

        if (!product) {
            throw new NotFoundException('Product does not exist')
        }

        return product;
    }

    @Post()
    async createProduct(@Body() productDTO: ProductDTO): Promise<any> {
        const product = await this.service.createProduct(productDTO);

        return {
            message: 'Product succesfully created',
            product,
        };
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<any> {
        const product = await this.service.deleteProduct(id);

        if (!product) {
            throw new NotFoundException('Product does not exist')
        }

        return {
            message: 'Product succesfully created',
            product,
        };
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() productDTO: ProductDTO): Promise<any> {
        const product = await this.service.updateProduct(id, productDTO);

        if (!product) {
            throw new NotFoundException('Product does not exist')
        }

        return {
            message: 'Product updated succesfully',
            product,
        }
    }
}
