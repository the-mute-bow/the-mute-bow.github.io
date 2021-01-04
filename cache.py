from os import listdir

extentions = ['html', 'css', 'js', 'png', 'gif', 'mp3', 'woff', 'woff2']
black_list = ['.git', 'sw.js', 'old', 'ads.js', 'CNAME', 'CACHE']

data = ''

def search(IN: str) -> None:
	global data
	for file in listdir(IN if IN != '' else None):
		path = ('../' + file) if IN == '' else ('../' + IN + '/' + file)
		
		if any(file == elem for elem in black_list):
			print('[Ignored]', path)
		else:
			if '.' in file:
				if file.split('.')[-1] in extentions:
					data += f"\'{path}\',\n"
			else:
				search(file) if IN == '' else search(IN + '/' + file)

search('')
print('Finished\n')

with open('CACHE', 'w') as f:
	f.write(data)

