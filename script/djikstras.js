class priorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.items.push(element);
        } else {
            let added = false;
            for (let i = 0; i < this.items.length; i++) {
                if (element.distance < this.items[i].distance) {
                    this.items.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.items.push(element);
            }
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

}

export var visInOrderDj = [];

export function djikstras(s, e, visited, prev) {
    visInOrderDj = []
    refreshDistances()
    applyDjikstras(s, e, visited, prev)
    return path(s, e, prev)
}
const distances = new Array(17);
function refreshDistances() {
    for (let i = 0; i < distances.length; i++) {
        distances[i] = [];
    }
    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 49; j++) {
            distances[i][j] = Math.pow(10, 1000);
        }
    }
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

function applyDjikstras(s, e, visited, prev) {
    const pq = new priorityQueue();
    distances[s[0]][s[1]] = 0;
    pq.enqueue({ position: s, distance: 0 });

    while (!pq.isEmpty()) {
        const { position, distance } = pq.dequeue();
        const [x, y] = position;

        if (visited[x][y]) continue;
        visited[x][y] = true;
        visInOrderDj.push(position);

        if (isEqual(position, e)) {
            return true;
        }

        const nbs = neighbours(x, y);
        for (let [nx, ny] of nbs) {
            if (!visited[nx][ny]) {
                const newDist = distance + 1; // Assuming uniform cost
                if (newDist < distances[nx][ny]) {
                    distances[nx][ny] = newDist;
                    pq.enqueue({ position: [nx, ny], distance: newDist });
                    prev[nx][ny] = position
                }
            }
        }
    }
    return false;
}

function path(s, e, prev) {
    var path = []
    if (prev[e[0]][e[1]] == null) {
        return path;
    } else {
        let curr = e
        while (!isEqual(curr, s)) {
            const prevNode = prev[curr[0]][[curr[1]]]
            path.push(prevNode)
            curr = prevNode;
        }
        return path.reverse()
    }
}

function isEqual(a, b) {
    if (a[0] == b[0] && a[1] == b[1]) {
        return true;
    }
    return false;
}

