
from dotenv import load_dotenv
import uvicorn
from src import app
from src.core.config import HOST,PORT,DEBUG
from src.core.db_config import CONNECTION_STRING

load_dotenv()
print('Mongo: ', CONNECTION_STRING)
if __name__ == "__main__":
    uvicorn.run('app:app',host=HOST,port=int(PORT),reload=DEBUG)