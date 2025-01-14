class Queue {
    constructor() {
        this.items = [];
        this.frontIndex = 0;
        this.backIndex = 0;
    }
    enqueue(item) {
        this.items[this.backIndex] = item;
        this.backIndex++;
        return item + ' inserted';
    }
    dequeue() {
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return item;
    }
    peek() {
        return this.items[this.frontIndex]
    }
    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }
    get printQueue() {
        return this.items;
    }
}

export var visInOrder = [];

export function bfs(s, e, visited, prev) {
    visInOrder = [];
    console.log("IN BFS");
    prev = solve(s, e, visited, prev);
    return path(s, e, prev);
}

function neighbours(i, j) {
    const nbs = [];
    const r = [-1, 0, +1, 0];
    const c = [0, +1, 0, -1];
    let n = 0;
    for (let a = 0; a < 4; a++) {
        const rr = i + r[a];
        const cc = j + c[a];
        if (rr < 0 || cc < 0) { continue; }
        if (rr > 16 || cc > 48) { continue; }
        nbs[n] = [rr, cc];
        n++;
    }
    return nbs;
}


function solve(s, e, visited, prev) {
    console.log("IN SOLVE");
    const q = new Queue;
    q.enqueue([s[0], s[1]]);

    visited[s[0]][s[1]] = true;
    let z = 0;
    while (!q.isEmpty()) {
        let node = q.dequeue();
        if (node === undefined) {
            break;
        }
        let nbs = neighbours(node[0], node[1]);
        for (var a in nbs) {
            let nodes = nbs[a];
            if (!(visited[nodes[0]][nodes[1]])) {
                q.enqueue(nodes);
                visited[nodes[0]][nodes[1]] = true;
                prev[nodes[0]][nodes[1]] = node;

                visInOrder[z] = nodes;
                z++;
            }
            if (isEqual(nodes, e)) {
                console.log(visited);
                console.log(prev);
                return prev;
            }
        }
    }
    console.log(visInOrder);
    return prev;
}

function path(s, e, prev) {
    console.log("IN PATH");
    let path = [];
    let at = e;
    let n = 0;
    while (at != null && !(isEqual(at, s))) {
        path[n] = at;
        n++;
        at = prev[at[0]][at[1]];
    }
    path[n] = s;
    path.reverse();
    if (isEqual(path[0], s)) {
        return path;
    }
    return [];
}

function isEqual(a, b) {
    if (a[0] == b[0] && a[1] == b[1]) {
        return true;
    }
    return false;
}
