from mongoengine import connect
from src.core.config import MONGO_URI,MONGO_DB

connect(host=MONGO_URI,db=MONGO_DB)
CONNECTION_STRING = 'Database connected'