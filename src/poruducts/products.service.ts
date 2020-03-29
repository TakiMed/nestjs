import {Product} from './product.models'
import {Injectable, NotFoundException} from '@nestjs/common'

@Injectable()
export class ProductsService{
    //odje ce lista proizvoda
    private products: Product[]=[];
    insertProduct(title:string,desc:string,price:number,quantity:number){
        const prodId= Math.random().toString();
        const newProduct= new Product(prodId,title,desc,price,quantity)
        this.products.push(newProduct);
        return prodId;
    }
    getProducts(){
        return [...this.products]; //dodajes kao nove ekemente, novi niz -pravis kopiju
    }
    getSingleProduct(prodId:string){
        const product=this.findProduct(prodId)[0];
        return {...product}; //return as new obj
    }
    updateProduct(prodId:string,title:string,desc:string,price:number,quantity:number){
        const [product, index]=this.findProduct(prodId);
        const updatedProduct={...product};
        if(title){updatedProduct.title=title}
        if(desc){updatedProduct.description=desc}
        if(price){updatedProduct.price=price}
        if(quantity){updatedProduct.quantity=quantity}
        this.products[index]=updatedProduct;
    }
    private findProduct(id:string):[Product,number]{
        const productIndex=this.products.findIndex((prod)=>prod.id==id)
        const product=this.products.find((prod)=>prod.id==id)
        if(!product){
            throw new NotFoundException('No such product here');
        }
        return [product,productIndex];
    }
    deleteProduct(prodId:string){
        const [product, index]=this.findProduct(prodId);
        this.products.splice(index,1);
    }
}