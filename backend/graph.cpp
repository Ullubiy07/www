#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <algorithm>
#include <queue>
#include <tuple>

using namespace std;
string from, to;
const int inf = 1e9;


int main() {
    int m, w;
    cin >> m;

    string a, b;
    vector<string> nodes;
    vector<tuple<string, string, int>> edges;
    map<int, string> dict;
    map<string, int> rev;


    for (int i = 0; i < m; i++) {
        cin >> a >> b >> w;
        edges.emplace_back(a, b, w);
        nodes.push_back(a);
        nodes.push_back(b);
    }
    cin >> from >> to;

    sort(nodes.begin(), nodes.end());
    nodes.erase(unique(nodes.begin(), nodes.end()), nodes.end());

    int n = (int) nodes.size();
    for (int i = 0; i < n; i++) {
        dict[i + 1] = nodes[i];
        rev[nodes[i]] = i + 1;
    }
    vector<vector<pair<int, int>>> g(n + 1);

    for (auto [a, b, w] : edges) {
        int u = rev[a], v = rev[b];
        g[u].emplace_back(v, w);
        g[v].emplace_back(u, w);
    }

    int start = rev[from], end = rev[to];
    priority_queue<pair<int, int>> q;
    vector<int> dist(n + 1, inf);
    dist[start] = 0;
    q.emplace(0, start);
    while (!q.empty()) {
        auto [d, v] = q.top();
        q.pop();
        if (dist[v] < d) continue;
        for (auto [u, weight] : g[v]) {
            if (d + weight < dist[u]) {
                dist[u] = d + weight;
                q.emplace(dist[u], u);
            }
        }
    }
    cout << dist[end];
}