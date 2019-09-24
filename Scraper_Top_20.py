from bs4 import BeautifulSoup
import requests
import pandas as pd
import csv
import json

print("-------------------------------------")
print("Hello! Welcome to the Twitter Scraper")
print("-------------------------------------")
search_input = input('What would you like to find?: ')
print("")
url = 'https://twitter.com/search?q=%23%27%20%20%20' + search_input + '&src=typd&lang=en'
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}

req = requests.get(url, headers=headers)

data = req.text
soup = BeautifulSoup(data, "html.parser")

print(f"There are TOP 20 POSTS based on your request: {search_input} ")
print("")
print("==================================================================================================================================")
tweets = [p.text for p in soup.findAll('p', class_='tweet-text')]
for tweet in tweets:
    print(tweet)
    print("==================================================================================================================================")

df = pd.DataFrame()
df['Tweets'] = tweets
df = df.replace('\n',' ', regex=True)

df.to_csv(f"{search_input}_top_20_posts.csv", encoding='Windows-1252', index=False)
# df.to_json(f"{search_input}_top_20_posts.json", orient='index')

print("")
print("Thank You very much!")
print(f"You can check TOP 20 POSTS based on your request: '{search_input}' in {search_input}_top_20_posts.csv") #and {search_input}_top_20_posts.json")
print("")


