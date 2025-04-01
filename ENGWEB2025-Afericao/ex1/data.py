import json
import ast

with open('dataset.json','r',encoding='utf-8') as file:
    data = json.load(file)

dic = {}

for aluno in data:
    aluno['_id'] = aluno.pop('bookId')
    if aluno['_id'] in dic.keys():
        print("repetidos!")
    else:
        dic[aluno['_id']] = aluno['_id']
    aluno['genres'] = ast.literal_eval(aluno['genres'])
    aluno['characters'] = ast.literal_eval(aluno['characters'])
    aluno['awards'] = ast.literal_eval(aluno['awards'])
    aluno['setting'] = ast.literal_eval(aluno['setting'])
    aluno['author'] = aluno['author'].split(', ')

with open("db_book.json",'w',encoding='utf-8') as file:
    json.dump(data, file, indent=4, ensure_ascii=False)