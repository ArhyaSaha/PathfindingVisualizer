class stack {
    constructor() {
        this.items = [];
        this.top = -1;
    }
    push(elem) {
        this.top++;
        this.items[this.top] = elem;
    }
    pop() {
        const elem = this.items[this.top];
        if (this.top >= 0) {
            this.top--;
            return elem;
        } else {
            return null;
        }
    }

}
export var visInOrderD = [];

export function dfs(s, e, visited, prev) {
    visInOrderD = []
    applyDFS(s, e, visited, prev);
    return path(s, e, prev)
}
function neighbours(i, j) {
    const nbs = [];
    const r = [-1, 0, +1, 0];
    const c = [0, +1, 0, -1];
    let n = 0;
    for (let a = 0; a < r.length; a++) {
        const rr = i + r[a];
        const cc = j + c[a];
        if (rr < 0 || cc < 0) { continue; }
        if (rr > 16 || cc > 48) { continue; }
        nbs[n] = [rr, cc];
        n++;
    }
    return nbs;
}

function applyDFS(s, e, visited, prev) {
    visited[s[0]][s[1]] = true;
    const nbs = neighbours(s[0], s[1]);
    for (let nb of nbs) {
        if (!visited[nb[0]][nb[1]]) {
            prev[nb[0]][nb[1]] = s;
            if (isEqual(nb, e)) {
                return true;
            }
            visInOrderD.push(nb);

            if (applyDFS(nb, e, visited, prev)) {
                return true;
            }
        }
    }
}

function path(s, e, prev) {
    var Path = []
    if (prev[e[0]][e[1]] == null) {
        return Path;
    } else {
        let curr = e
        while (!isEqual(curr, s)) {
            const prevNode = prev[curr[0]][[curr[1]]]
            Path.push(prevNode)
            curr = prevNode;
        }
        return Path.reverse()
    }
}

function isEqual(a, b) {
    if (a[0] == b[0] && a[1] == b[1]) {
        return true;
    }
    return false;
}
