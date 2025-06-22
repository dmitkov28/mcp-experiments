# MCP Experiments

This repo contains some of my early attempts to play around with the Model Context Protocol (MCP)

## Project Structure

```
/mcp-server
/mcp-client
```

## Getting Started

### Running the MCP Server

The server has a simple `get_top_hackernews_stories`

```
cd mcp-server
```

Install dependencies:
```
uv sync
```

Run the server:
```
uv run main.py
```

The server is now running on `localhost:8080`

### Running the MCP Client
```
cd mcp-client
```

Install dependencies
```
npm i
```

Add an `ANTHROPIC_API_KEY` env variable.

Run the nextjs app:
```
npm run dev
```

The app is now running on `http://localhost:3000`

