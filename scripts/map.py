from PIL import Image
from os import listdir, system
from sys import argv
from time import sleep
from random import randint as rd

def anim(pine):
    n = 10
    angle = 0.5
    path = f'../beta/img/vegetation/pines/pine_{pine}/'

    print(path + f'pine_{pine}_base.png')
    base = Image.open(path + f'pine_{pine}_base.png')
    result = Image.new('RGBA', (192 * n * 2, 192), (0, 0, 0, 0))

    for i, v in enumerate(range(-n, n + 1)):
        result.paste(base.rotate(angle * v), (192*i, -24))

    result.save(path + f'pine_{pine}.png')

system('cls')

path = '../beta/img/maps/' + argv[1]
print(path, '\n')

base = Image.open(path)
W, H = base.size
print('image:', W, H)

pines = len(listdir('../beta/img/vegetation/pines'))
herbs = len([e for e in listdir('../beta/img/vegetation/herbs') if not 'shadow' in e])
print('pines:', pines)
print('herbs:', herbs)

data = 'const vegetation_imgs = [\n'

for i in range(pines):
    anim(i)
    system(f'python shadow.py vegetation/pines/pine_{i}/pine_{i}.png 168')
    data += f"\t'./img/vegetation/pines/pine_{i}/pine_{i}.png',\n"
    data += f"\t'./img/vegetation/pines/pine_{i}/pine_{i}_shadow.png',\n"

for i in range(herbs):
    system(f'python shadow.py vegetation/herbs/herb_{i}.png 8')
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