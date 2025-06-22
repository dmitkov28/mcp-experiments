.PHONY: client server both

run-client:
	cd mcp-client && npm run dev

run-server:
	cd mcp-server && uv run main.py

run: 
	make run-client & make run-server