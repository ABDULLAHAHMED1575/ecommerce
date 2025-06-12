from src.core.router import base_router
from src.components.payment.controller import process_payment

base_router.add_api_route('/payment',process_payment,methods=['POST'],response_model=dict)