from fastapi import HTTPException
from src.models.model import UserLogin
from src.models.user import *
from src.core.authentication import verify_password


async def login(user_credentials:UserLogin):
    try:
        user = User.objects(email=user_credentials.email).first()
        if not user:
            raise HTTPException(status_code=404,detail="User not Found")
        if not verify_password(user_credentials.password,user.password):
            raise HTTPException(status_code=400, detail="Incorrect Password")
        
        print(user.role.roles)
        return {
            "id":str(user.id),
            "email":user.email,
            "first_name":user.first_name,
            'last_name':user.last_name,
            "role": {
                "id": str(user.role.id),
                "name": user.role.roles
            }
        }
    except Exception as e:
        if not isinstance(e,HTTPException):
            raise HTTPException(status_code=500,detail=str(e))
        raise e
    