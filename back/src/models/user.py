from datetime import datetime
from mongoengine import (
    Document,
    StringField,
    DateField,
    ReferenceField,
    ListField,
    FloatField,
    IntField,
    DateTimeField,
    EmbeddedDocument,
    EmbeddedDocumentListField,
)
        
class Role(Document):
    roles = ListField(StringField(required=True))
    meta = {'collection':'roles'}

    def dict(self):
        try:
            return{
                'id':str(self.pk),
                'roles':self.roles
            }
        except:
            return{}

class User(Document):
    created_at = DateField(default=datetime.now())
    email = StringField(required=True)
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    password = StringField(required=True)
    gravatar=StringField(
        required=True,
        default="https://0.gravatar.com/userimage/225067096/87fad03c0e2ab249aaecad8ed8587725?size"
        "=1200",
    )
    role = ReferenceField(Role)
    updated_at = DateField(default=datetime.now())
    meta = {'collection':'users'}

    def dict(self):
        try:
            return{
                "id": str(self.pk),
                "email": self.email,
                "first_name": self.first_name,
                "last_name": self.last_name,
                "role": self.role,
                "password": self.password,
            }
        except:
            return{}

class Product(Document):
    name = StringField(required=True)
    description = StringField(required=True)
    price = FloatField(required=True)
    image_url = StringField(required=True)
    stock = IntField(required=True, default=0)
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)
    meta = {'collection':'products'}
    
    def dict(self):
        try:
            return{
                "id": str(self.pk),
                "name": self.name,
                "description": self.description,
                "price": self.price,
                "image_url": self.image_url,
                "stock": self.stock,
                "updated_at":self.updated_at
            }
        except:
            return{}

class CartItem(EmbeddedDocument):
    product = ReferenceField(Product, required=True)
    quantity = IntField(required=True, default=1)

    def dict(self):
        try:
            return{
                "product": self.product.dict() if self.product else None,
                "quantity": self.quantity
            }
        except:
            return{}

class Cart(Document):
    user = ReferenceField(User, required=True)
    items = EmbeddedDocumentListField(CartItem, default=[])
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)
    meta = {'collection': 'carts'}

    def dict(self):
        try:
            safe_items = []
            for item in self.items:
                try:
                    if item.product and hasattr(item.product, 'id'):
                        item_dict = item.dict()
                        safe_items.append(item_dict)
                    else:
                        print(f"Skipping cart item with invalid product reference")
                except Exception as item_error:
                    print(f"Error processing cart item: {item_error}")
                    continue
            
            return {
                "id": str(self.pk),
                "user": str(self.user.id),
                "items": safe_items,
            }
        except Exception as e:
            print(f"Error in Cart.dict(): {e}")
            return {
                "id": str(self.pk) if hasattr(self, 'pk') else None,
                "user": str(self.user.id) if self.user else None,
                "items": [],
            }

class OrderItem(EmbeddedDocument):
    product = ReferenceField(Product, required=True)
    quantity = IntField(required=True)
    price = FloatField(required=True)

    def dict(self):
        try:
            return{
                "product": self.product.dict() if self.product else None,
                "quantity": self.quantity,
                "price": self.price,
                "subtotal": self.price * self.quantity
            }
        except:
            return{}

class Order(Document):
    user = ReferenceField(User, required=True)
    items = EmbeddedDocumentListField(OrderItem, default=[])
    total_amount = FloatField(required=True)
    status = StringField(required=True, default="pending")
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)
    meta = {"collection": 'orders'}

    def dict(self):
        try:
            return{
                'id': str(self.pk),
                'user': str(self.user.id),
                "items": [item.dict() for item in self.items],
                'total_amount': self.total_amount,
                'status': self.status,
            }
        except:
            return{}

class Payment(Document):
    order = ReferenceField(Order, required=True)
    amount = FloatField(required=True)
    payment_method = StringField(required=True)
    status = StringField(required=True, default="completed")
    created_at = DateTimeField(default=datetime.now)
    meta = {'collection': 'payments'} 

    def dict(self):
        try:
            return{
                "id": str(self.pk),
                "order": str(self.order.id),
                'amount': self.amount,
                'payment_method': self.payment_method,
                'status': self.status,
            }
        except:
            return{}