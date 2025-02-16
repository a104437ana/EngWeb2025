import json

def open_json(filename):
    with open(filename,'r',encoding='utf-8') as file:
        data = json.load(file)
    return data

def rename_keys(obj, old_keys, new_key):
    if isinstance(obj, dict):
        return {
            (new_key if key in old_keys else key): rename_keys(value, old_keys, new_key)
            for key, value in obj.items()
        }
    elif isinstance(obj, list):
        return [rename_keys(item, old_keys, new_key) for item in obj]
    return obj

json_obj = open_json('dataset_reparacoes.json')
old_keys = ["codigo", "matricula","nif"]
json_obj = rename_keys(json_obj,old_keys,"id")

map_intervencoes = {}
map_veiculos = {}
for reparacao in json_obj['reparacoes']:
    m = reparacao['viatura']['id']
    if not (m in map_veiculos.keys()):
        map_veiculos[m] = reparacao['viatura']
    for intervencao in reparacao['intervencoes']:
        c = intervencao['id']
        if not (c in map_intervencoes.keys()):
            map_intervencoes[c] = intervencao

veiculos = list(map_veiculos.values())
intervencoes = list(map_intervencoes.values())

json_obj["intervencoes"] = intervencoes
json_obj['veiculos'] = veiculos

with open("new_dataset.json", "w", encoding="utf-8") as arquivo:
    json.dump(json_obj, arquivo, indent=4, ensure_ascii=False)