# twitter-sentimometer

* Twitter is one of the main social media platforms where people share their opinions on social, political, and cultural events. To rapidly capture the sentiment of current events on twitter, we used a machine learning algorithm to predict the sentiment of the most recent tweets. 

## Modeling
  * Sources of training data: 1,600,000 tweets from http://help.sentiment140.com/for-students/
  * The type of predictive models we tried included: single vector machine classifiers (SVM), XG Boost models, naive bayes, random forest (RF), long short-term memory (LSTM), gated recurrent unit (GRU) and convolutional neural network (CNN). While naive bayes and RF achieved around 70% accuracy, all the deep learning models (LSTM, GRU and CNN) achieved accuracy of over 80%. We chose the CNN model for tweet sentiment classification.
  * The tweets are preprocessed to remove non-alphabetic characters. The processed sentences are further processed by removing stop words, stemming and lemmatization. Each preprocessing step was tested and the models were compared. The results indicated that removing non-alphabetic characters already made the model perform over 80% accuracy. Further processing did not improve and sometimes even decreased accuracy. 
  * All the trials of machine learning model are stored in the folder labeled “model”


## Visualization:
  * Search topics:
  ![](images/webpage-1.png)
  Enter a search topic in the search box on the landing page and then hit "Tweexplore!" button. It returns the most recent tweets about the topic up to 900 tweets. The results are saved as a json file in the folder labeled “data”.

  ## Most common words:
  ![](images/10_common_words.png)
  The plot shows the most frequent words appearing in the tweets of the search topic.

  ## Sentiment analysis
  ![](images/sentiment_1.png)
  Our CNN model predicts the sentiment of each tweet and returns a value ranging from -1 to 1, with -1 as the most negative sentiment and 1 as the most positive sentiment. The tweet ID can be selected from the drop-down toolbar. The info of the tweet is shown in the info box and the sentiment score is shown in the gauge plot.
  ![](images/sentiment_2.png)
  •	The distribution of tweet sentiment scores from individual users are shown in the scatter plot. The gauge plot shows the average sentiment score from the 900 tweets we collected from the search.

  ## Comparing results from different search topics.
  ![](images/comparison_1.png)
  Results from different search are used for comparison. The histogram showed the distribution of tweets according to the sentiment scores.
 
  ![](images/comparison_2.png)
  The two bar charts showed the average score and the percentage of positive results from different search topics.

  ## Live tweets seniment analsysis
  ![](images/real_time.png)


    
