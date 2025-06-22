# server.py
from mcp.server.fastmcp import FastMCP
import requests

mcp = FastMCP(host="0.0.0.0", port=8080)


@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


@mcp.tool()
def get_top_hackernews_stories(limit: int = 10) -> list:
    """Gets top HackerNews stories"""
    try:
        response = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json")
        response.raise_for_status()
        story_ids = response.json()[:limit]
        stories = []
        for story_id in story_ids:
            story_response = requests.get(
                f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json"
            )
            story_response.raise_for_status()
            stories.append(story_response.json())
        return stories
    except requests.RequestException as e:
        return []


@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!"


if __name__ == "__main__":
    print("Starting mcp server...")
    mcp.run(transport="sse")
