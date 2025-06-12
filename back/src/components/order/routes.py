from src.components.order.controller import *
from src.core.router import base_router
from typing import List

base_router.add_api_route('/orders',create_order,response_model=dict,methods=["POST"])
base_router.add_api_route('/orders/{user_id}',get_user_order,response_model=List[dict],methods=["GET"])