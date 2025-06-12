from src.core.router import base_router
from src.models.model import UserCreate
from src.components.auth.controller.login import login
from src.components.auth.controller.register import create_user

base_router.add_api_route("/login", login, methods=["POST"])
base_router.add_api_route("/register", create_user, methods=["POST"])