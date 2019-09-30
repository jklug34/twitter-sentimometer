# twitter-sentimometer

* Twitter is the main soical media that people give their opinions on the social, polictical, and cultural events. To rapidly capture the sentiment of current evevnts on twitter, we used machine learning algorithm to predict the sentiment of each tweets of the most recent tweets. 

* Modeling
  * sources of training data: 1,600,000 tweets from http://help.sentiment140.com/for-students/
  * The methods we tried including: naive bayes, random forest(RF), long short-term memory(LSTM), gated recurrent unit(GRU) and convolutional neural network(CNN). While naive bayes and RF achived around 70% accuracy, all the deep learning model(LSTM, GRU and CNN) achieved accuary of over 80%. We chose CNN as the model for our prediction. 
  * all the trials of machine learning model are stored in the folder model


* Visualization:
  * Search topics:
  ![](images/webpage-1.png)
  enter the search topic in the bracket and then hit "Tweexplore!" button. It returns the most recent tweets about the topic up to 900 tweets, The results are saved in json file in the folder data. 

  * Most common words:
  ![](images/10_common_words.png)

    
