var connectedNodes = new Array(17);
var visited = new Array(17);
var prev = new Array(17);
var openPathNodesList = [];
var wallsList = [];

function create() {
    for (let i = 0; i < connectedNodes.length; i++) {
        connectedNodes[i] = [];
        visited[i] = [];
        prev[i] = [];
    }
    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 49; j++) {
            connectedNodes[i][j] = [];
            visited[i][j] = false;
            prev[i][j] = null;
        }
    }
}

const s = [0, 0]

function neighbours(i, j) {
    const nbs = [];
    const r = [-2, 0, +2, 0];
    const c = [0, +2, 0, -2];
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
function randomize(arr) {
    if (arr.length == 2) {
        var randList = [[arr[1], arr[0]], [arr[0], arr[1]]]
    }
    if (arr.length == 4) {
        var randList = [[arr[0], arr[1], arr[2], arr[3]], [arr[2], arr[3], arr[1], arr[0]], [arr[1], arr[0], arr[3], arr[2]], [arr[3], arr[2], arr[0], arr[1]]]
    }
    if (arr.length == 3) {
        var randList = [[arr[0], arr[1], arr[2]], [arr[1], arr[2], arr[0]], [arr[2], arr[0], arr[1]]]
    }
    const randN = Math.floor(Math.random() * randList.length)
    return randList[randN];
}
function allVisited() {
    for (let i = 0; i < 17; i += 2) {
        for (let j = 0; j < 49; j += 2) {
            if (visited[i][j] == false) {
                return false
            }
        }
    }
    return true
}

function applyDFS(s) {
    visited[s[0]][s[1]] = true;
    const nbs = neighbours(s[0], s[1]);
    const randomNbs = randomize(nbs)
    console.log('randomNBS', randomNbs)
    for (let nb of randomNbs) {
        if (!visited[nb[0]][nb[1]]) {
            connectedNodes[s[0]][s[1]].push(nb)
            prev[nb[0]][nb[1]] = s;
            // visInOrderD.push(nb);

            applyDFS(nb);
        }
    }
}
function getPathLoc(s, t) {
    // const rDiff = Math.abs(s[0] - t[0])
    // const cDiff = Math.abs(s[1] - t[1])
    // var r = s[0]
    // var c = s[1]

    // if (rDiff != 0) {
    //     if (s[0] > t[0]) {
    //         r = t[0] + rDiff
    //     } else {
    //         r = s[0] + rDiff
    //     }
    // } else if (cDiff != 0) {
    //     if (s[1] > t[1]) {
    //         c = t[1] + rDiff
    //     } else {
    //         c = s[1] + rDiff
    //     }
    // }
    const r = (s[0] + t[0]) / 2;
    const c = (s[1] + t[1]) / 2;

    return [r, c]

}
function getOpenPathNodes(s) {
    var jointNodes = connectedNodes[s[0]][s[1]]
    for (let node of jointNodes) {
        var pathID = getPathLoc(s, node)
        openPathNodesList.push(pathID)
        getOpenPathNodes(node)
    }
}
function putWalls() {
    for (let i = 0; i < 17; i++) {
        for (let j = 1; j < 49; j += 2) {
            var target = [i, j];
            var exists = openPathNodesList.some(node => node[0] === target[0] && node[1] === target[1]);

            if (!(exists)) {
                wallsList.push(target)
            }
        }
    }
    for (let i = 1; i < 17; i += 2) {
        for (let j = 0; j < 49; j += 1) {
            var target = [i, j];
            var exists = openPathNodesList.some(node => node[0] === target[0] && node[1] === target[1]);

            if (!(exists)) {
                wallsList.push(target)
            }
        }
    }
}
export function main() {
    create()
    applyDFS([0, 0]);
    getOpenPathNodes([0, 0])
    putWalls()
    console.log(wallsList)
    return wallsList
}