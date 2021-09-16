import json
import pandas as pd

articles = pd.read_csv("csvs/articles.csv")
articles = articles.fillna("");
members = pd.read_csv("csvs/members.csv")
members = members.fillna("");
projects = pd.read_csv("csvs/projects.csv")
projects = projects.fillna("");

articles = articles.T.to_dict()
with open("jsons/articles.json", "w") as outfile:
    json.dump(articles, outfile, indent=4)

members = members.T.to_dict()
with open("jsons/members.json", "w") as outfile:
    json.dump(members, outfile, indent=4)

projects = projects.T.to_dict()
with open("jsons/projects.json", "w") as outfile:
    json.dump(projects, outfile, indent=4)
