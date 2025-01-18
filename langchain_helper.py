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

    #1104 words
    sarah = """
    Guys I woke up from a very scary dream. 
    
    Elaine you were in it but like essentially it was set in a very dark English town where like I went on as a trip or something and Elaine’s family discovered a secret government document in the cabin they rented but they knew if anyone especially the police if the police knew or if they made any big moves the aliens would catch a signal and both government and aliens would come for this location to get the map. 
    
    So Elaine family put the map back where they found it but Elaine and Timmy do not know why the map needs to be hidden only her parents and I know. 
    
    And then we explored the English town I. The evening it was a very abandoned seaside town it was very ominous very lonely but somehow a lot of people in the town but it wasn’t lively despite the crowded streets. 
    
    It felt like the people around us were almost like ghosts yk.Elaine kept on going on about some fish biting and I went with her to find fish on a very tall bridge.

    Us two ended up in a very remote area far from town on a cliffside by the sea it was very dark and late In the evening the wind was like super big and the waves were like scary scary as well.

    Elaine wasn’t scared for some reason and was like Sarah hurry up we have to find the fish that can bite off fingers I want to see it.

    We ended up wandering into the woods next a very dark misty woods where we found a cabin.

    We went in it was an old fisherman small single room cabin in the middle of a very ominous dark forest and Elaine freaking went right in when I was super scared.

    in there there was a lot of equipment for fishing and a desk with a chest on there and Elaine opened the chest and found a map while I was distracted by the fishing equipment and a journal that I didn’t even open but somehow just looking at the journal it told me everything about why I can’t let anyone know we have “THE map” and that the aliens are always watching to we can’t have our emotions change too drastically otherwise they would catch on and locate us which by then we would not be able to escape.

    The journal gave me insights to the future the thing is whenever I wanted to tell someone about it to prevent the future from happening I couldn’t and I physically couldn’t change the future either my body wouldn’t move.

    Elaine then found THE map while I was like frozen in the same spot terrified at the future I caught a glimpse of and she naively said omg this map is so cool it looks like the one the police were looking for when we went into the police station the other day! Let’s return it to them!

    Elaine also said she needed to send a note on this ominous website about a cool thing that happened recently because everyone is doing it it is a global trend and the note will be uploaded at the same time as everyone else’s which is at  exactly 12:00 am.

    What everyone didn’t know is I knew the website was just the scheme of I shouldn’t even call them aliens but they were powerful shapeless you sense their presence and it’s very suffocating but entities.

    The entities created that site to track who found that map and once notified you have 10 minutes before they arrive.

    I wanted to stop Elaine but I couldn’t and my body physically prevented me as my body or my dream self encouraged Elaine enthusiastically I was really panicking in like a dark trapped space trying to break out and tell Elaine to stop.

    we went to the police station afterwards I was still resisting but like how do I explain it but I was so stressed the entire time because i couldn’t control myself like that was the most terrifying thing.

    Elaine casually gave the map to the police the police was like what a weird girl giving us a piece of paper it was rolled up btw so the police didn’t realize immediately what it was at first.

    After Elaine left I saw the police realize it was the map and they all started panicking and calling up their chain of command the fbi and the people behind the fbi and all of the police were in action I watched all of this in third person.

    All of a sudden I regained control of my body but by then we had only 10 minutes and our cabins with our families were on the other side of town and I didn’t even have a chance to explain I just grabbed Elaine and started running because I knew if I didn’t they would take her I was actually so scared I would lose my pookie Elaine xia 🥹🥹🥹🥹.

    And the entire time I could feel everything I could feel the pressure I can sense the entities coming closer it was the very suffocating feeling that was so terrifying but all I could do was run and try to hide Elaine as fast as I can.

    I brought her back to the cabin in the woods whichbdsomehow appeared on our way back to the cabin with our families and my instinct told me we have to hide here instead.

    I tucked Elaine away and I hid in the closet myself but then I heard Elaine repeatedly saying numbers numbers like it was terrifying because what was Elaine saying I couldn’t tell was it coordinated was it code was it what was it I was so panicked and I realized I was too scared to tell her to be quiet.

    At the last moment I realized she was counting down it wasn’t Morse it wasn’t coordinated it was a countdown.

    And I felt the pressure heighten as I realized it was a countdown, the countdown for when the entities would arrive and I couldn’t do anything to break the timer.

    And then my alarm went off.

    whoever I was so scared of they were at the door of the cabin when my alarm went off.

    This was actually and probably one of my scariest dreams yet 😭😭😭.

    It just felt so tense because everything felt like it was timed in the first place and the countdown really like it was so stressful.


"""
