import json

with open('alunos.json','r',encoding='utf-8') as file:
    data = json.load(file)

for aluno in data['alunos']:
    aluno['_id'] = aluno.pop('id')

with open("db_alunos.json",'w',encoding='utf-8') as file:
    json.dump(data['alunos'], file, indent=4, ensure_ascii=False)