from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS to handle cross-origin requests
import cohere
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Enable CORS for all routes and specify the allowed origins
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route("/", methods=["POST", "OPTIONS"])
def chatbot():
    if request.method == "OPTIONS":
        # Respond to preflight OPTIONS request with an OK status and proper CORS headers
        response = jsonify()
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Parse JSON data from the POST request
    data = request.json  # Assuming the front end sends JSON data
    yap = data.get('yap')

    # Initialize the Cohere client with your API key
    co = cohere.ClientV2(os.getenv("COHERE_API_KEY"))

    # Define the unorganized story you want to reorganize
    unorganized_story = """
    The entities created that site to track who found that map and once notified you have 10 minutes before they arrive.
    I wanted to stop Elaine but I couldn’t and my body physically prevented me as my body or my dream self encouraged Elaine enthusiastically I was really panicking in like a dark trapped space trying to break out and tell Elaine to stop.
    We went to the police station afterwards I was still resisting but like how do I explain it but I was so stressed the entire time because I couldn’t control myself like that was the most terrifying thing.
    Elaine casually gave the map to the police. The police was like what a weird girl giving us a piece of paper, it was rolled up by the way so the police didn’t realize immediately what it was at first.
    After Elaine left, I saw the police realize it was the map and they all started panicking and calling up their chain of command, the FBI, and the people behind the FBI and all of the police were in action. I watched all of this in third person.
    """
    
    # Call the Cohere API to process the conversation
    response = co.chat(
        model="command-r-plus",  # Adjust this model to one that's best for your needs
        messages=[
        {"role": "user", "content": "You are an expert at reorganizing confusing stories. The following story is very long and unorganized" + yap + "Reorganize the story into a coherent, chronological sequence without changing the original wording and tone. Keep the same manner of speech, just reassemble the story in a way that makes sense."}]
    )

    # Return the response from Cohere API as JSON
    return jsonify(response.message.content[0].text)
 

if __name__ == '__main__':
    app.run(debug=True)
