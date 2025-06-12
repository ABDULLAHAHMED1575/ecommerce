from src.components.payment.interface import PaymentCreate
from src.models.user import Order,Payment
from bson import ObjectId
from fastapi import HTTPException

async def process_payment(payment_data:PaymentCreate):
    try:
        order = Order.objects(id=ObjectId(payment_data.order_id)).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        payment = Payment(
            order=order,
            amount=order.total_amount,
            payment_method=payment_data.payment_method
        ).save()

        order.status = "paid"
        order.save()
        return payment.dict()
    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))
    