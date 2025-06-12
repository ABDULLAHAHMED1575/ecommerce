from src.components.carts.controller import *
from src.core.router import base_router

base_router.add_api_route('/cart/{user_id}',add_to_cart,response_model=dict,methods=['POST'])
base_router.add_api_route('/cart/{user_id}',get_cart,response_model=dict,methods=['GET'])
base_router.add_api_route('/cart/{user_id}/{product_id}',remove_from_cart,methods=['DELETE'])