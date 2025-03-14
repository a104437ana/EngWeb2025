import json

with open("cinema.json",'r',encoding='utf-8') as file:
    data = json.load(file)

objeto_json = {"filmes": data}

d = {}
for f in objeto_json["filmes"]:
    if f['title'] in d.keys():
        print("O dataset tem títulos repetidos! :(")
        break
    else:
        d[f['title']] = 1

id = 1
for f in objeto_json["filmes"]:
    f['id'] = id
    id+=1

with open("db.json",'w',encoding='utf-8') as file:
    json.dump(objeto_json, file, indent=4, ensure_ascii=False)
