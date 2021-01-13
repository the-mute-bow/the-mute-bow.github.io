from PIL import Image
from os import listdir, system

system('cls')

pine = 0
n = 10
angle = 0.5
offset = 0, -24
path = f'../beta/img/pines/pine_{pine}/'

print(path + f'pine_{pine}_base.png')
base = Image.open(path + f'pine_{pine}_base.png')

for i, v in enumerate(range(-n, n + 1)):
    result = Image.new('RGBA', (192, 192), (0, 0, 0, 0))
    result.paste(base.rotate(angle * v), offset)
    result.save(path + f'anim/pine_{pine}_{i}.png')

