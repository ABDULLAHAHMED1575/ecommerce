from src.core.router import base_router
from src.components.products.controller import create_product,get_product,get_products,update_product,delete_product
from src.models.model import ProductOut

base_router.add_api_route('/products',create_product,methods=["POST"],response_model=dict)
base_router.add_api_route('/products',get_products,methods=['GET'],response_model=list[ProductOut])
base_router.add_api_route('/products/{product_id}',get_product,methods=['GET'],response_model=dict)
base_router.add_api_route('/products/{product_id}',update_product,methods=['PUT'],response_model=dict)
base_router.add_api_route('/products/{product_id}',delete_product,methods=['DELETE'])