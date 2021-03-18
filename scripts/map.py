from PIL import Image
from os import listdir, system
from sys import argv
from random import randint as rd

system('cls')

scene = argv[1]
path = './beta/scenes/' + scene + '/map.png'
print(path, '\n')

base = Image.open(path)
W, H = base.size
print('image:', W, H)

pines = len(listdir('./beta/img/vegetation/pines'))
herbs = len([e for e in listdir('./beta/img/vegetation/herbs') if not 'shadow' in e])
print('pines:', pines)
print('herbs:', herbs)

data = 'const map_entities = [\n'

for y in range(H):
    for x in range(W):
        p = base.getpixel((x, y))
        if p == (255, 0, 0, 255):
            data += f"\t\'pine {x} {y} {rd(0, pines - 1)}\',\n"
            
        elif p == (0, 255, 0, 255):
            data += f"\t\'herb {x} {y} {rd(0, herbs - 1)}\',\n"

data += "];"

with open('./beta/scenes/' + scene + '/map.js', 'w') as f:
    f.write(data)