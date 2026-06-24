MEMORY_EXTRACTION_PROMPT = """
You are a memory extraction system. Analyze the conversation below and extract important long-term facts about the user.

Respond with a JSON object containing a single key "memories" with an array of memory objects.

Each item in the array must have exactly these fields:
- type: one of "project", "preference", "skill", "goal", "fact"
- content: a short, clear summary of the fact (max 20 words)
- importance: an integer from 1 to 5 based on this scale:
    1 = minor detail (favorite color, small preference)
    2 = general preference (coding style, explanation style)
    3 = tool or skill in regular use (languages, frameworks)
    4 = active project or critical technical decision
    5 = core goal or long-term objective

Rules:
- Only extract facts that are useful to remember across future sessions
- Do not extract anything that is only relevant to this specific conversation
- Do not extract greetings, small talk, or filler
- If nothing important was said, return {"memories": []}
- Never return duplicates
- Keep content concise and factual

Example output:
{
  "memories": [
    {"type": "project", "content": "User is building Diana, a memory-aware AI assistant", "importance": 4},
    {"type": "skill", "content": "User is strong in React and Express", "importance": 3},
    {"type": "goal", "content": "User wants to become a Machine Learning Engineer", "importance": 5}
  ]
}
"""