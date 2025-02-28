import csv
import json

csv_file = "alunos.csv"
json_file = "alunos.json"

with open(csv_file, encoding="utf-8") as file:
    reader = csv.DictReader(file, delimiter=";")
    alunos = list(reader)

dados = {"alunos": alunos}

with open(json_file, "w", encoding="utf-8") as file:
    json.dump(dados, file, indent=4, ensure_ascii=False)