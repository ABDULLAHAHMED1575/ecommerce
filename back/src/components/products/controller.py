from fastapi import HTTPException
from mongoengine import DoesNotExist
from bson import ObjectId
from datetime import datetime
from src.models.user import Product
from src.models.model import ProductCreate,ProductUpdate


async def create_product(product:ProductCreate):
    try:
        new_product = Product(
            name = product.name,
            description = product.description,
            price=product.price,
            image_url = product.image_url,
            stock=product.stock
        ).save()
        return new_product.dict()
    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))

async def get_products():
    try:
        products=Product.objects()
        return [product.dict() for product in products]
    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))

async def get_product(product_id:str):
    try:
        product = Product.objects(id=ObjectId(product_id)).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not Found")
        return product.dict()
    except DoesNotExist:
        raise HTTPException(status_code=404,detail="Product not found")
    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))
    
async def update_product(product_id:str,product_update:ProductUpdate):
    try:
        product = Product.objects(id=ObjectId(product_id)).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not Found")
        update_data = product_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            if value is not None:
                setattr(product,key,value)
        product.updated_at = datetime.now()
        product.save()

        return product.dict()
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Product Not Found")
    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))

async def delete_product(product_id:str):
    try:
        product = Product.objects(id=ObjectId(product_id)).first()
        if not product:
            raise HTTPException(status_code=404,detail="Product Not Found")
        product.delete()
        return {"message":"Product deleted successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404,detail="Product Not Found")
    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))
