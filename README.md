# Overview
Teabag is the ultimate "tea" (story) summarizer. With Teabag, you can record your (or your friend's 😉) voice, type thoughts, and instantly see the summarized up, more chronological tea.

#Tech Stack
**Frontend**: Next.js, TailwindCSS
**Backend**: Python, LangChain, Flask, Cohere API, Firebase.

#Key Features
Record Your Voice 🎤: You can record audio directly in the app or type out your thoughts. Your entries are then analyzed and re-ordered to make the most chronological sense for your listener! 

Speech-to-Text Analysis 🧠: Using the Cohere API, Teabag processes your audio or text entries and re-organizes the piping hot tea for maximum enjoyment for the listeners.

Track the Tea 📈: Save all your past stories and add to them when needed. With Firebase storage, all your past yaps (that's what we call speech entries!) are stored and accessible.

See the Yap Rating 🔍: Want to see how much you (or your friend) yaps? Check out the yap score after every submission.

#How It Works
The app uses LangChain for data processing and the Cohere API to run language models. Once you submit your audio or text, Teabag gets to work, providing an instant summary of what you said/wrote. 
