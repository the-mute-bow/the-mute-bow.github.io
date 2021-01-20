from PIL import Image
from os import listdir, system
from sys import argv
from time import sleep
from random import randint as rd

system('cls')

path = '../beta/img/maps/' + argv[1]
print(path, '\n')

base = Image.open(path)
W, H = base.size
print('image:', W, H)

pines = len(listdir('../beta/img/vegetation/pines'))
herbs = len(listdir('../beta/img/vegetation/herbs')) // 2
print('pines:', pines)
print('herbs:', herbs)

data = 'const vegetation_imgs = [\n'

for i in range(pines):
    data += f"\t'./img/vegetation/pines/pine_{i}/pine_{i}.png',\n"
    data += f"\t'./img/vegetation/pines/pine_{i}/pine_{i}_shadow.png',\n"

for i in range(herbs):
    data += f"\t'./img/vegetation/herbs/herb_{i}.png',\n"
    data += f"\t'./img/vegetation/herbs/herb_{i}_shadow.png',\n"

data += '];\n\nconst vegetation_entities = [\n'

for y in range(H):
    for x in range(W):
        p = base.getpixel((x, y))
        if p == (255, 0, 0, 255):
            data += f"\t\'pine {x} {y} {rd(0, pines - 1)}\',\n"
            
        elif p == (0, 255, 0, 255):
            data += f"\t\'herb {x} {y} {rd(0, herbs - 1)}\',\n"

data += "];\n\naddScript(`./scenes/${urlParams.get('scene')}.js`);"

with open('../beta/vegetations/' + argv[2] + '_vegetation.js', 'w') as f:
    f.write(data)