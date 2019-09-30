# import necessary libraries

from sqlalchemy import func

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    url_for,
    json
)

import os

from flask_sqlalchemy import SQLAlchemy

# import scraper_function

import get_tweet_and_score_function

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

# my_data = []

# @app.route("/api/data")
# def data():
#     print(my_data)
#  return jsonify(my_data)


@app.route("/dashboard", methods=["POST"])
def dashboard():

    if request.method == "POST":
        query = request.form["tag"]
        print(query)
        # my_data.append(query)
        get_tweet_and_score_function.LastCommentScraper(query)
        # data = scraper_function.data
        # return redirect(request.url)
        # data.update({})

        SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
        json_url = os.path.join(SITE_ROOT, "data", 'query.json')
        data = json.load(open(json_url))
        # return render_template('showjson.jade', data=data)

    return render_template("dashboard.html", data=data)

# @app.route("/dashboard")
# def jsonfile();
    
    # username = request.json['username']
    # tweets = request.json['tweets']
    # clean_tweets = request.json['clean_tweets']
    # retweets = request.json['retweets']
    # likes = request.json['likes']
    # score = request.json['score']

    # SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    # json_url = os.path.join(SITE_ROOT, "data", "{query}.json")
    # data = json.load(open(json_url))
    # return render_template('showjson.jade', data=data)


if __name__ == "__main__":
    app.run(debug=True)
