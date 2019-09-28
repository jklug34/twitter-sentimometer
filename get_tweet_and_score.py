# import library

import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import multiprocessing
import os
import sys
import io
import re
import json
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import Dense, Embedding
from tensorflow.python.keras.optimizers import Adam
from tensorflow.python.keras.preprocessing.text import Tokenizer
from tensorflow.python.keras.preprocessing.sequence import pad_sequences

# import twitterscarper
from twitterscraper import query_tweets
import datetime as dt
import pandas as pd
from datetime import date, timedelta

# import model
from keras_preprocessing.text import tokenizer_from_json
with open('tokenizer.json') as f:
    data = json.load(f)
    tokenizer = tokenizer_from_json(data)

from tensorflow.keras.models import load_model
new_model = load_model("cnn_model.h5")

# prepare timeline
today = date.today()
yesterday = today - timedelta(days = 1)
tommorow = today + timedelta(days = 1)
aftertommorow = tommorow + timedelta(days = 1)


begin_date = today
end_date = tommorow
lang = "en"   

# function for getting clean tweets
def getCleanTwit(str1):
    words= str1.split()
    clean_words = []
    for i in words:
        if re.findall(r'^http', i):
            continue
        else:
            clean_words.append(i)
    text = u' '.join(x for x in clean_words)
    text = re.sub("http*:\/\/[0-9a-zA-Z\-\_]+\.[\-\_0-9a-zA-Z]", u"", text)
    text = re.sub("\@[\_0-9a-zA-Z]+\:?", u"", text)
    text = re.sub("\&amp\;?", u"", text)
    text = re.sub("[\:\.]{1,}$", u"", text)
    text = re.sub("^RT\:?", u"", text)

    return text

# function for getting json file of tweets and scores

input_result = input('What would you like to find?: ')
limit = 900

tweets = query_tweets(input_result, begindate = begin_date, enddate = end_date, limit = limit-20, lang = lang)
df = pd.DataFrame(tweet.__dict__ for tweet in tweets)


# get info from the data frame
username = df["username"].to_list()
all_tweets = df["text"].to_list()
retweets = df['is_retweet'].to_list()
likes = df['likes'].to_list()
clean_tweets = []
for i in all_tweets:
    clean_tweets.append(getCleanTwit(i))

# model prediction
max_tokens = 280
pad = 'pre'
tweets_tokens = tokenizer.texts_to_sequences(clean_tweets)
tweets_pad = pad_sequences(tweets_tokens, maxlen=max_tokens,
                            padding=pad, truncating=pad)
y_pred = new_model.predict(x=tweets_pad)
y_pred = y_pred.T[0]

tweet_info = []

for i in range(len(y_pred)):
    tweet_result = {} 
    tweet_result['username'] = str(username[i])
    tweet_result['tweets'] = str(all_tweets[i])
    tweet_result['clean_tweets'] = str(clean_tweets[i])
    tweet_result['retweets'] = str(retweets[i])
    tweet_result['likes'] = str(likes[i])
    tweet_result['score'] = str(y_pred[i])
    tweet_info.append(tweet_result)

result = json.dumps(tweet_info)
to_write = open(f'data/{input_result}_tweets_score.json', 'w')
to_write.write(result)
to_write.close
    