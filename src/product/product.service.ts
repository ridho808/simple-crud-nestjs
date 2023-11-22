import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma:PrismaService){}
  async create(Dto: CreateProductDto) : Promise<Object> {
    try {
        const {name , price} = Dto
        await this.prisma.products.create({data:{name,price}})
        return {
          success: true,
          message : "Success Add Product"
        }
    } catch (error) {
      throw new HttpException('Error :'+error.name,HttpStatus.BAD_REQUEST)
    }
  }

 async findAll() : Promise<any> {
   try {
     const AllData = await this.prisma.products.findMany();
     return {success:true,data:AllData}
   } catch (error) {
     throw new HttpException('Error :'+error,HttpStatus.BAD_REQUEST)
   }
  }

async findOne(id: number) : Promise<any> {
    try {
      const FindOne = await this.prisma.products.findFirst({
        where:{
          id: id
        }
      });
      if(!FindOne) return {success:true,message:`product with ${id} not found`}
      return {success:true,data:FindOne}
    } catch (error) {
      throw new HttpException('Error :'+error,HttpStatus.BAD_REQUEST)
    }
  }

 async update(id: number, Update: UpdateProductDto) : Promise<any> {
    try {
      const {name,price} = Update;
      await this.prisma.products.update({
        where:{
          id: id
        },
        data:{
          name,price
        }
      })
      return {success:true,message:"success update Product id "+id}
    } catch (error) {
      throw new HttpException('Error :'+error,HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.products.delete({
        where:{
          id: id
        },  
      })
      return {success:true,message:"success delete Product id "+id}
    } catch (error) {
      throw new HttpException('Id undiefinded',HttpStatus.BAD_REQUEST)
    }
  }
}
