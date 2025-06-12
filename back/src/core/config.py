from dotenv import load_dotenv
import os

load_dotenv()

PORT = os.getenv("PORT",5000)
HOST = os.getenv('HOST',"127.0.0.1")
DEBUG = os.getenv('DEBUG',True)
MONGO_URI = os.getenv('MONGO_URI')
MONGO_DB = os.getenv('MONGO_DB')