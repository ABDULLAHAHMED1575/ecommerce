from fastapi import APIRouter

base_router = APIRouter(prefix="")

def health():
    return{"health":'Check'}

from src.components.auth.routes.route import *
from src.components.products.routes import *
from src.components.carts.routes import *
from src.components.order.routes import *
from src.components.payment.routes import *
base_router.add_api_route("/", health, methods=["GET"])
