from src.models.model import OrderCreate
from src.models.user import Cart,OrderItem,Order,User
from bson import ObjectId
from fastapi import HTTPException

async def create_order(order_data:OrderCreate):
    try:
        cart = Cart.objects(id=ObjectId(order_data.cart_id)).first()
        if not cart or not cart.items:
            raise HTTPException(status_code=400, detail="Cart is empty or not found")
        total_amount = 0
        order_items = []

        for cart_item in cart.items:
            product = cart_item.product
            if product.stock < cart_item.quantity:
                raise HTTPException(status_code=400,detail=f"not enough stock for {product.name}")
            
            order_item = OrderItem(
                product = product,
                quantity = cart_item.quantity,
                price = product.price
            )
            order_items.append(order_item)
            product.stock -= cart_item.quantity
            product.save()
            total_amount += product.price*cart_item.quantity
        
        order = Order(
            user=cart.user,
            items=order_items,
            total_amount=total_amount
        ).save()
        cart.items = []
        cart.save()
        return order.dict()
    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))

async def get_user_order(user_id:str):
    try:
        if not user_id or len(user_id) != 24:
            raise HTTPException(status_code=400, detail="Invalid user ID format")
            
        user = User.objects(id=ObjectId(user_id)).first()
        if not user:
            raise HTTPException(status_code=404,detail="User not found")
            
        orders = Order.objects(user=user)
        orders_list = []
        for order in orders:
            try:
                orders_list.append(order.dict())
            except Exception as dict_error:
                print(f"Error converting order to dict: {dict_error}")
                continue
                
        return orders_list
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_user_order: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")