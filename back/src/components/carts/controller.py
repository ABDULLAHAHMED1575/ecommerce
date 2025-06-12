from src.models.model import CartItemCreate
from src.models.user import User,Product,Cart,CartItem
from bson import ObjectId
from fastapi import HTTPException
from datetime import datetime

async def add_to_cart(user_id: str, cart_item: CartItemCreate):
    try:
        print(f"Adding to cart - User: {user_id}, Product: {cart_item.product_id}, Quantity: {cart_item.quantity}")
        if not user_id or len(user_id) != 24:
            raise HTTPException(status_code=400, detail="Invalid user ID format")
            
        if not cart_item.product_id or len(cart_item.product_id) != 24:
            raise HTTPException(status_code=400, detail="Invalid product ID format")
            
        if cart_item.quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0")
        user = User.objects(id=ObjectId(user_id)).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        product = Product.objects(id=ObjectId(cart_item.product_id)).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        if product.stock < cart_item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock available. Only {product.stock} items left")
        cart = Cart.objects(user=user).first()
        if not cart:
            cart = Cart(user=user, items=[]).save()
            print(f"Created new cart for user {user_id}")
        item_updated = False
        cleaned_items = []
        
        for item in cart.items:
            try:
                if item.product and str(item.product.id) == cart_item.product_id:
                    new_quantity = item.quantity + cart_item.quantity
                    if product.stock < new_quantity:
                        raise HTTPException(status_code=400, detail=f"Not enough stock. You have {item.quantity} in cart, only {product.stock} available")
                    
                    item.quantity = new_quantity
                    item_updated = True
                    print(f"Updated existing cart item quantity to {new_quantity}")
                
                cleaned_items.append(item)
                
            except Exception as ref_error:
                print(f"Found broken product reference, removing: {ref_error}")
                continue
        cart.items = cleaned_items
        if not item_updated:
            new_item = CartItem(product=product, quantity=cart_item.quantity)
            cart.items.append(new_item)
            print(f"Added new item to cart")
        cart.updated_at = datetime.now()
        cart.save()
        cart_dict = cart.dict()
        print(f"Cart updated successfully: {len(cart_dict.get('items', []))} items")
        return cart_dict
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error in add_to_cart: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

async def get_cart(user_id: str):
    try:
        print(f"Getting cart for user: {user_id}")
        if not user_id or len(user_id) != 24:
            raise HTTPException(status_code=400, detail="Invalid user ID format")
        user = User.objects(id=ObjectId(user_id)).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        cart = Cart.objects(user=user).first()
        if not cart:
            print(f"No cart found for user {user_id}, returning empty cart")
            return {
                "id": None,
                "user": user_id,
                "items": []
            }
        cleaned_items = []
        items_removed = 0
        
        for item in cart.items:
            try:
                if item.product and item.product.id:
                    test_dict = item.dict()
                    cleaned_items.append(item)
                else:
                    items_removed += 1
            except Exception as ref_error:
                print(f"Removing broken cart item reference: {ref_error}")
                items_removed += 1
                continue
        if items_removed > 0:
            cart.items = cleaned_items
            cart.save()
            print(f"Removed {items_removed} broken references from cart")
        
        cart_dict = cart.dict()
        print(f"Retrieved cart with {len(cart_dict.get('items', []))} items")
        return cart_dict
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error in get_cart: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

async def remove_from_cart(user_id: str, product_id: str):
    try:
        if not user_id or len(user_id) != 24:
            raise HTTPException(status_code=400, detail="Invalid user ID format")
        if not product_id or len(product_id) != 24:
            raise HTTPException(status_code=400, detail="Invalid product ID format")
        user = User.objects(id=ObjectId(user_id)).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        cart = Cart.objects(user=user).first()
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
        item_found = False
        cleaned_items = []
        
        for item in cart.items:
            try:
                if item.product and str(item.product.id) == product_id:
                    item_found = True
                    print(f"Found and removing item with product {product_id}")
                    continue
                else:
                    cleaned_items.append(item)
            except Exception as ref_error:
                print(f"Removing broken reference during cleanup: {ref_error}")
                continue
        
        if not item_found:
            raise HTTPException(status_code=404, detail='Product not found in cart')
        
        cart.items = cleaned_items
        cart.updated_at = datetime.now()
        cart.save()
        
        return {"message": "Item removed from cart"}
                
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error in remove_from_cart: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")