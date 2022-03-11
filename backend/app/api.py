from typing import Dict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import base64
from io import BytesIO
from fastapi import UploadFile, File, Form
from PIL import Image

from PIL import Image
import tensorflow as tf
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import keras
from tensorflow.keras.models import load_model
import sys
import os

model_load = load_model('app/1_model.h5')

def make_pred(im) :
    im = im.resize((64,64))

    # convert to numpy array
    img = np.asarray(im) / 255
    #model_load = load_model('app/1_model.h5')
    pred = model_load.predict(np.array( [img,] ) )[0]

    #0 : Chat / 1 : Chien
    if np.argmax(pred) == 0 : return 'Prédiction : Chat / Fiabilité : ' + str(round(pred[np.argmax(pred)]*100,2)) + '%'
    else : return 'Prédiction : Chien / Fiabilité : ' + str(round(pred[np.argmax(pred)]*100,2)) + '%'

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/upload_image")
async def upload_image(image: UploadFile = File(...), ):
    image_bytes = image.file.read()
    image_bytes = BytesIO(image_bytes)
    pg_image = Image.open(image_bytes)
    pred = make_pred(pg_image)
    #decoded = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), -1)
    #pred = make_pred(decoded)
    #pg_image = cv2.resize(decoded, (220, 220))

    return pred
    #return 'coucou'

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}