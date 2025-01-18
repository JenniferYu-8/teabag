from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain

from dotenv import load_dotenv

load_dotenv()

# Step 1: Define the LLM model
llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0.7, max_tokens=1500)

# Step 2: Create a prompt template for reorganizing the story
prompt_template = PromptTemplate(
    input_variables=["story"],
    template=(
        "You are an expert at reorganizing confusing stories. The following story is very long and unorganized: \n"
        "{story}\n"
        "Reorganize the story into a coherent, chronological sequence without changing the original wording and tone. Keep the same manner of speech, just reassemble the story in a way that makes sense."
    )
)

# Step 3: Create an LLM chain
story_reorganizer = LLMChain(llm=llm, prompt=prompt_template)

# Step 4: Function to reorganize the story
def reorganize_story(unorganized_story):
    """
    Takes an unorganized story and returns a reorganized version.
    
    Args:
        unorganized_story (str): The unorganized story as a string.

    Returns:
        str: A reorganized version of the story.
    """
    result = story_reorganizer.run(story=unorganized_story)
    return result

# Example usage
if __name__ == "__main__":
    unorganized_story = (
        "Ok, idek if it's a big deal, and idk where to begin, but, ok, I'm so sorry Jen, I'm really bad at communicating, but that's not what she said. I can confirm that. I had to debrief because I'm acoustic. So basically what happened was that I went into Jen's lecture and I said I to Liz; people don't hate her in software whatver whatever yada yada yada right? and then, whatveer, I walk out, and she says, \"You're not gonna stay for proofs?\" or whatever the course is she's taking and I said no and i vomited and I was just trying to joke around with it because yo I'm not staying for proofs like the fuck. And then... yeah and then Jen told me how I'm a social, what was it? fuck bro. That, uh, that, yeah, that I fed into it and now she might perceive me as yeah but I really did not intend to be perceived in a rude way."
    )

    organized_story = reorganize_story(unorganized_story)
    print("Reorganized Story:\n")
    print(organized_story)
