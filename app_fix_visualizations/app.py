import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/tweetsdb.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Impeachment = Base.classes.impeachment_tweets


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/id")
def id():
    """Return a list of all tweet id."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Impeachment).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(df["id"].tolist())  


@app.route("/tweets")
def names():
    """Return a list of all tweets."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Impeachment).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(df["clean_tweets"].tolist())  


# all tweets with score: json array, list of objects
@app.route("/tweet_model_score")
def tweet_model_score():
    """Return the tweet mode score for a given tweet."""
    sel = [
        Impeachment.id,
        Impeachment.clean_tweets,
        Impeachment.score,
    ]

    results = db.session.query(*sel).all()

    # Create a dictionary entry for each row of metadata information
    tweet_all = []
    for result in results:
        tweet_metadata = {}
        tweet_metadata["id"] = result[0]
        tweet_metadata["tweet"] = result[1]
        tweet_metadata["model_score"] = round(result[2], 3)
        tweet_all.append(tweet_metadata)

    #print(tweet_all)
    return jsonify(tweet_all)


# sort by tweet id
@app.route("/tweet_metadata/<id>")
def tweet_metadata(id):
    """Return the tweet metadata for a given id."""
    sel = [
        Impeachment.id,
        Impeachment.clean_tweets,
        Impeachment.score,
    ]

    results = db.session.query(*sel).filter(Impeachment.id == id).all()

    # Create a dictionary entry for each row of metadata information
    tweet_metadata = {}
    for result in results:
        tweet_metadata["id"] = result[0]
        tweet_metadata["tweet"] = result[1]
        tweet_metadata["model_score"] = round(result[2], 3)

    #print(origin_metadata)
    return jsonify(tweet_metadata)  


if __name__ == "__main__":
    app.run(debug=True)
