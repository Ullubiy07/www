from dash import Dash, html, callback, Input, Output, dcc
import dash_cytoscape as cyto

import requests

app = Dash()



nodes_input = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'], ['10', '10']]
edges_input = [['1', '3'], ['7', '4'], ['5', '4'], ['9', '6'], ['4', '7'], ['6', '9'], ['10', '8'], ['4', '8'], ['8', '3'], ['3', '10'], ['2', '8'], ['9', '5'], ['10', '2'], ['9', '8'], ['10', '9'], ['1', '10'], ['3', '6'], ['4', '5'], ['8', '10'], ['3', '2']]


def get_nodes(nodes):
    return [
        {
            'data': {'id': Id, 'label': label}
        }
        for Id, label in nodes
    ]

def get_edges(edges):
    return [
        {
            'data': {'source': source, 'target': target}
        }
        for source, target in edges
    ]



nodes = get_nodes(nodes_input)
edges = get_edges(edges_input)

elements = nodes + edges

opt = {
    'grid': 'Сетка',
    'random': 'Рандом',
    'circle': 'Круг',
    'cose': 'Пружина',
    'concentric': 'Центр'
}



app.layout = html.Div([
    # html.Button('Submit', id='start-button'),
    # dcc.Interval(
    #     id='my-interval',
    #     interval=3*1000,
    #     n_intervals=0
    # ),
    dcc.Dropdown(
        id='dropdown-menu',
        value='grid',
        clearable=False,
        options = [
            {'label': opt[name], 'value': name}
            for name in ['grid', 'random', 'circle', 'cose', 'concentric']
        ],
        style={
            'background-color': 'black',
            'text-color': 'white',
            'border': 'none',
            'border-radius': '10px'
        }
    ),
    
    cyto.Cytoscape(
        
        id='graph',
        elements=elements,
        layout={'name': 'grid'},
        style={
            'width': '100%',
            'height': '484px',
        },
        userZoomingEnabled=False,
        stylesheet=[
            {
                'selector': 'node',
                'style': {
                    'content': 'data(label)',
                    'text-valign': 'center',

                }
            }
        ]
    )
])



# @callback(
#     Output('graph', 'elements'),
#     Input('start-button', 'n_clicks'))
# def update_graph(n):
#     nodes = requests.get('http://fastapi:8000/graph_nodes').json()
#     edges = requests.get('http://fastapi:8000/graph_edges').json()
#     return get_nodes(nodes) + get_edges(edges)


@callback(
    Output('graph', 'layout'),
    Input('dropdown-menu', 'value'))
def update_layout(value):
    return {
        'name': value,
        'animate': True 
    }


if __name__ == '__main__':
    app.run(debug=False)
