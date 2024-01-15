from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
from pydantic import BaseModel


arr = [0] * 40
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return True

@app.get("/send/{data}/{t}")
def read_send(data: int, t: int):
    global arr
    arr[data] = t
    return True

@app.get("/get")
def read_item():
    return {
        "L0" : arr[0],
        "L1" : arr[1],
        "L2" : arr[2],
        "L3" : arr[3],
        "L4" : arr[4],
        "L5" : arr[5],
        "L6" : arr[6],
        "L7" : arr[7],
        "L8" : arr[8],
        "L9" : arr[9],
        "L10" : arr[10],
        "L11" : arr[11],
        "L12" : arr[12],
        "L13" : arr[13],
        "D0" : random.randint(0,999) / 10,
        "D1" : random.randint(0,999) / 10,
        "D2" : random.randint(0,999) / 10,
        "D3" : random.randint(0,999) / 10,
        "D4" : random.randint(0,999) / 10,
        "D5" : random.randint(0,999) / 10,
        "L_len" : 14,
        "D_len" : 6,
        "ar" : arr}