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
        "Reorganize the story into a coherent, chronological sequence while preserving the original wording and tone."
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


# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_community.llms import OpenAI
# from langchain_community.embeddings import OpenAIEmbeddings
# from langchain import PromptTemplate
# from langchain.chains import LLMChain
# from langchain_community.vectorstores import FAISS

# from dotenv import load_dotenv

# load_dotenv()

# load_dotenv()
# embeddings = OpenAIEmbeddings()

# def create_vector_db_from_story(transcript) -> FAISS:
#     text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
#     # docs = text_splitter.split_documents(transcript)

#     db = FAISS.from_documents(transcript, embeddings)
#     return db

# def get_response_from_query(db, query, k=4):
#     docs = db.similarity_search(query, k=k)
#     docs_page_content = " ".join([d.page_content for d in docs])
#     llm = OpenAI(model_name="gpt-3.5-turbo-instruct")

#     prompt = PromptTemplate(
#         input_variables=["question", "docs"],
#         template="""
#         You are given a story from my perspective, but it is slightly out of order. 
        
#         Don't change the wording too much, but order the sentences so that the listener can follow along.
#         """,
#     )

#     chain = LLMChain(llm=llm, prompt=prompt)

#     response = chain.run(question=query, docs=docs_page_content)
#     response = response.replace("\n", "")
#     return response

# transcript = """
# Oh my gosh, the other day, I saw this guy on campus and he was SO FINE. I couldn't get his name, and I was so sad, but yesterday, during the Vietnamese Student Association event, I saw him. I walked up to him and it was loud but I was able to get his name: Ferdinand! We met at orientation week briefly but it was very brief. Also, it took me 3 tries to hear his name because it was so loud. Also, I saw him in lecture once and he was sitting at the back eating a burrito and my god it was so hot. I also tripped over the curb last week while he was walking by me because I was staring at his gorgeous eyes. Also, my friend Ethan apparently knew of him since Grade 9. They were roommates but he's not gonna hook me up. Also, Ethan and I are beefing.
# """
# print(create_vector_db_from_story(transcript))


