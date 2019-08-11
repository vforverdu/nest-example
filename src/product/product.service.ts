import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interface/product.interface';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly model: Model<Product>) { }

    async getProduct(id: string): Promise<Product> {
        return await this.model.findById(id);
    }

    async getProducts(): Promise<Product[]> {
        return await this.model.find();
    }

    async createProduct(productDTO: ProductDTO): Promise<Product> {
        return await new this.model(productDTO).save();
    }

    async deleteProduct(id: string): Promise<Product> {
        return await this.model.findByIdAndDelete(id);
    }

    async updateProduct(id: string, productDTO: ProductDTO): Promise<Product> {
        return await this.model.findByIdAndUpdate(id, productDTO, { new: true });
    }
}
