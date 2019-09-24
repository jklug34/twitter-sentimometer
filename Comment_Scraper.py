from twitterscraper import query_tweets
import datetime as dt
import pandas as pd
from datetime import date, timedelta


print("-------------------------------------")
print("Hello! Welcome to the Twitter Scraper")
print("-------------------------------------")

input_result = input('What would you like to find?: ')

today = date.today()
yesterday = today - timedelta(days = 1)
tommorow = today + timedelta(days = 1)

begin_date = today
end_date = tommorow
limit = int(input("How many tweets would You like?: "))
lang = "en"


print("")

# print(f"You've got LAST {limit + 20} POSTS based on your request: {input_result} ")

tweets = query_tweets(input_result, begindate = begin_date, enddate = end_date, limit = limit-20, lang = lang)

df = pd.DataFrame(tweet.__dict__ for tweet in tweets)
updated_df = df[["timestamp", "text"]]
updated_df.to_csv(f"{input_result}_last_comments.csv", encoding='Windows-1252', index=False)
# updated_df.to_json(f"{input_result}_last_comments.json", orient='index')

print("")
print("Thank You very much!")
print(f"You can check LAST {limit} POSTS based on your request: '{input_result}' in {input_result}_last_comments.csv") #and {input_result}_last_comments.json")
print("")


