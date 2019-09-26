from twitterscraper import query_tweets
import datetime as dt
import pandas as pd
from datetime import date, timedelta


def LastCommentScraper(input_result):

    print("-------------------------------------")
    print("Hello! Welcome to the Twitter Scraper")
    print("-------------------------------------")

    # input_result = input('What would you like to find?: ')

    today = date.today()
    tommorow = today + timedelta(days = 1)
    aftertommorow = tommorow + timedelta(days = 1)

    begin_date = tommorow
    end_date = aftertommorow
    limit = 980
    lang = "en"

    print("")

    tweets = query_tweets(input_result, begindate = begin_date, enddate = end_date, limit = limit, lang = lang)

    df = pd.DataFrame(tweet.__dict__ for tweet in tweets)
    updated_df = df[["text"]]

    data = {"comments" : updated_df.text}
    print(data)

    return data
    

