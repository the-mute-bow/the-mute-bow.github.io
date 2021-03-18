from PIL import Image
from os import listdir, system

def anim(pine):
    n = 10
    angle = 0.5
    path = f'./beta/img/vegetation/pines/pine_{pine}/'
    src = path + f'pine_{pine}_base.png'

    print(src)
    base = Image.open(src)
    result = Image.new('RGBA', (192 * n * 2, 192), (0, 0, 0, 0))

    for i, v in enumerate(range(-n, n + 1)):
        result.paste(base.rotate(angle * v), (192 * i, -24))

    result.save(path + f'pine_{pine}.png')

system('cls')

pines = len(listdir('./beta/img/vegetation/pines'))
herbs = len([e for e in listdir('./beta/img/vegetation/herbs') if not 'shadow' in e])
print('pines:', pines)
print('herbs:', herbs)

data = 'const vegetation_imgs = [\n'

for i in range(pines):
    anim(i)
    system(f'python scripts/shadow.py vegetation/pines/pine_{i}/pine_{i}.png 168')
    data += f"\t'./img/vegetation/pines/pine_{i}/pine_{i}.png',\n"
    data += f"\t'./img/vegetation/pines/pine_{i}/pine_{i}_shadow.png',\n"

for i in range(herbs):
    system(f'python scripts/shadow.py vegetation/herbs/herb_{i}.png 8')
    data += f"\t'./img/vegetation/herbs/herb_{i}.png',\n"
    data += f"\t'./img/vegetation/herbs/herb_{i}_shadow.png',\n"

data += '];'

with open('./beta/src/vegetation.js', 'w') as f:
    f.write(data)