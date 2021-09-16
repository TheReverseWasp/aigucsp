import json
import pandas as pd

articles = pd.read_csv("csvs/articles.csv")
members = pd.read_csv("csvs/members.csv")
projects = pd.read_csv("csvs/projects.csv")

articles = articles.T.to_dict()
with open("jsons/articles.json", "w") as outfile:
    json.dump(articles, outfile, indent=4)

members = members.T.to_dict()
with open("jsons/members.json", "w") as outfile:
    json.dump(members, outfile, indent=4)

projects = projects.T.to_dict()
with open("jsons/projects.json", "w") as outfile:
    json.dump(projects, outfile, indent=4)
