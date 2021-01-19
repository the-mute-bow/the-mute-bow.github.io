from PIL import Image
from os import listdir, system
from sys import argv
from time import sleep
from random import randint as rd

system('cls')

path = '../beta/img/' + argv[1]
print(path)

base = Image.open(path)
W, H = base.size
print(W, H)


for y in range(H):
    for x in range(W):
        p = base.getpixel((x, y))
        if p == (255, 0, 0, 255):
            print("\'pine", x, y, rd(0, 1), end = "\',\n")
            
        elif p == (0, 255, 0, 255):
            print("\'herb", x, y, rd(0, 3), end = "\',\n")
