# import aiohttp
# import asyncio

# async def get(url):
#     async with aiohttp.ClientSession(trust_env=True) as session:
#         async with session.get(url) as response:
#             res = await response.json()
#     return res

# nodes = asyncio.run(get('http://localhost:8000/graph_nodes'))
# edges = asyncio.run(get('http://localhost:8000/graph_edges'))
# print(nodes, edges)


import requests
nodes = requests.get('http://localhost:8000/graph_nodes').json()
edges = requests.get('http://localhost:8000/graph_edges').json()
print(nodes, edges)