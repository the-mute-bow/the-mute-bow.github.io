from PIL import Image
from os import listdir, system, system
from sys import argv

system('cls')

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

anim(argv[1])
system(f'python shadow.py vegetation/pines/pine_{argv[1]}/pine_{argv[1]}.png 168')