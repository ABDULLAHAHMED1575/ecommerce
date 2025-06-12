from fastapi import HTTPException
from src.models.model import UserCreate
from src.models.user import *
from src.core.authentication import hash_password
from bson import ObjectId
from mongoengine.errors import DoesNotExist, ValidationError

async def create_user(user: UserCreate):
    try:
        if User.objects(email=user.email).first():
            raise HTTPException(status_code=400, detail="Email already registered")

        role = None
        if user.role_id:
            try:
                role = Role.objects.get(id=ObjectId(user.role_id))
            except (DoesNotExist, ValidationError):
                raise HTTPException(status_code=404, detail="Specified role not found")
        else:
            role = Role(roles=['user']).save()

        try:
            new_user = User(
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name,
                password=hash_password(user.password),
                role=role
            ).save()
        except ValidationError as e:
            raise HTTPException(status_code=400, detail=str(e))

        return {
            "id": str(new_user.id),
            "email": new_user.email,
            "first_name": new_user.first_name,
            "last_name": new_user.last_name,
            "role": {
                "id": str(role.id),
                "roles": role.roles
            }
        }

    except HTTPException:
        raise 
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")