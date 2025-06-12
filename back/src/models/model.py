from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class UserCreate(BaseModel):
    email: str
    first_name: str
    last_name: str
    password: str
    role_id: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    gravatar: str
    role: Dict[str, Any]

class ProductOut(BaseModel):
    id: str
    name: str
    description: str
    price: float
    image_url: str
    stock: int

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    image_url: str
    stock: int

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None

class CartItemCreate(BaseModel):
    product_id: str
    quantity: int

class OrderCreate(BaseModel):
    cart_id: str

class PaymentCreate(BaseModel):
    order_id: str
    payment_method: str