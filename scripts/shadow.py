from PIL import Image
from os import listdir, system
from sys import argv
from time import sleep

system('cls')

path = './beta/img/' + argv[1]
feet = int(argv[2])
ratio = 0.82, 0.57

print(path)
base = Image.open(path)
result = Image.new('RGBA', base.size, (0, 0, 0, 0))
W, H = base.size
print(W, H)


for y in range(H):
    z = feet - y
    offx = ratio[0] * z
    offy = ratio[1] * z

    if (y % 10 == 0):
        print(int(y / H * 100), '%', int(z), int(offx), int(offy), end='       \r')
    
    # sleep(.1)

    for x in range(W):
        if base.getpixel((x, y)) != (0, 0, 0, 0):
            sx = int(x - offx)
            sy = int(feet - offy)
            if (0 < sx < W and 0 < sy < H):
                color = (0, 0, 0, 255)
                result.putpixel((sx, sy), color)

result.save(path[:-4] + '_shadow.png')