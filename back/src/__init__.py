from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.router import base_router

app:FastAPI = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(base_router)

