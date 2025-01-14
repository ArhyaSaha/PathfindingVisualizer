import { bfs, visInOrder } from './bfs.js';
import { djikstras, visInOrderDj } from './djikstras.js';
import { dfs, visInOrderD } from './dfs.js';
import { main } from './maze.js';


var s = [];
var end = [];

var visited = new Array(17);
var prev = new Array(17);

let done = false;
var mazeOn = false;

function clickHandle(n) {
    switch (n) {
        case 0:
            mazeOn = false;
            refreshGrid();
            $('#navbarDropdownMenuLink').text('Select Maze');
            break;
        case 1:
            refreshGrid();
            generateMaze();
            $('#navbarDropdownMenuLink').text('DFS Maze');
            break;
    }

}
window.clickHandle = clickHandle;

function putStart() {
    done = true;
    if (done) {
        // var selectedNodeId = $(this).attr("id");
        $("#container").one("click", function () {
            $(this).css("background-color", "green");
        });
        done = false; // Reset the flag
        $("#grid").off("click");
    }
}

// function that builds a grid in the "container"
function createGrid(x, y) {
    for (var col = 0; col < y; col++) {
        for (var row = 0; row < x; row++) {
            $("#container").append("<div class='grid' id='" + "b" + col + "-" + row + "'></div>");
        };
    };
    $(".grid").width(1400 / x);
    $(".grid").height(520 / y);
};

// the function then also creates that new grid
function refreshGrid() {
    recreate(visited, prev);
    $("#container").html("");
    createGrid(49, 17);
    wall();
    s = [];
    end = [];
    $('#status-update').html("Pick Start & End nodes.");
}

function generateMaze() {
    const wallsList = main()
    // animateList(wallsList, 'wall')
    console.log(wallsList)
    for (let wall of wallsList) {
        $('#b' + wall[0] + '-' + wall[1]).addClass('wall')
        visited[wall[0]][wall[1]] = '#';

    }
}

// allows the click of a button to prompt the user to create a new grid
$(document).ready(function () {

    createGrid(49, 17);
    recreate(visited, prev);

    document.addEventListener('keydown', function (event) {
        if (event.key === 's' || event.key === 'S') {
            $('.grid').click(function (e) {
                $("#b" + s[0] + "-" + s[1]).css("background-color", "white");
                let ID = $(this).attr("id");

                $(this).css("background-color", "green");
                s = getLoc(ID);

                visited[s[0]][s[1]] = false;
            });
        }
        if (event.key === 'e' || event.key === 'E') {
            $('.grid').click(function (e) {
                $("#b" + end[0] + "-" + end[1]).css("background-color", "white");
                let ID = $(this).attr("id");

                $(this).css("background-color", "red");
                end = getLoc(ID);

                visited[end[0]][end[1]] = false;
            });
        }
    });


    document.addEventListener('keyup', function (event) {
        if (event.key === 's' || event.key === 'S') {
            $('.grid').off('click');
        }
        if (event.key === 'e' || event.key === 'E') {
            $('.grid').off('click');
        }

    });


    $(".grid").on("mousedown mouseover", function (e) {
        if (e.buttons == 1 || e.buttons == 3) {
            console.log($(this).css("background-color"));
            if (($(this).css("background-color")) == "rgb(255, 255, 255)") {
                $(this).addClass("wall");
                let ID = $(this).attr("id");
                let temp = getLoc(ID);
                visited[temp[0]][temp[1]] = '#';
            }
            if (($(this).css("background-color")) == "rgb(0, 0, 0)") {
                $(this).removeClass("wall");
                let ID = $(this).attr("id");
                let temp = getLoc(ID);
                visited[temp[0]][temp[1]] = false;
            }

        }
    });


    $("#newGrid").click(function () {
        refreshGrid();
    });

    $("#visualize").click(function () {
        visualize();
    });
    // generateMaze();
});

function wall() {
    $(".grid").on("mousedown mouseover", function (e) {
        if (e.buttons == 1 || e.buttons == 3) {
            console.log($(this).css("background-color"));
            if (($(this).css("background-color")) == "rgb(255, 255, 255)") {
                $(this).addClass("wall");
                let ID = $(this).attr("id");
                let temp = getLoc(ID);
                visited[temp[0]][temp[1]] = '#';
            }
            if (($(this).css("background-color")) == "rgb(0, 0, 0)") {
                $(this).removeClass("wall");
                let ID = $(this).attr("id");
                let temp = getLoc(ID);
                visited[temp[0]][temp[1]] = false;
            }

        }
    });
}
function getLoc(id) {
    let a = "";
    let b = "";
    for (let i = 1; i < 4; i++) {
        if (id[i] == '-') {
            break;
        } else {
            a += id[i];
        }
    }
    for (let i = id.length - 1; i > 0; i--) {
        if (id[i] == '-') {
            break;
        }
        b += id[i];

    }
    b = b.split('').reverse().join('');
    var c = [Number(a), Number(b)];
    return c;
}

async function visualize() {
    var dropdown = document.getElementById("myDropdown");
    var selectedValue = dropdown.value;

    console.log(s == []);

    if (s.length === 0 || end.length === 0) {
        $('#status-update').html("Please select start & end node by holding down 'S' and 'E' key.");
    }
    else {
        $('#status-update').html("Searching for best path...");
        switch (selectedValue) {
            case '1':
                startBFS();
                break;
            case '2':
                startDFS();
                break;
            case '3':
                startDjikstras();
                break;
        }
    }



    // $('#status-update').html("Searching for best path...");

    // const path = bfs(s, end, visited, prev);
    // await animateList(visInOrder, "visiting", 50);
    // const prom = new Promise(r => animateDjisktra(visInOrder));
    // $('#status-update').html("Best path found..");
    // await animateList(path, "finalPath", "visiting", 50);
}

async function startBFS() {
    const path = bfs(s, end, visited, prev);
    await animateList(visInOrder, "visiting", "", 30);
    if (path.length === 2) {
        $('#status-update').html("Path Not Possible");
    } else {
        await animateList(path, "finalPath", "visiting", 30);
    }

}
async function startDFS() {
    const path = dfs(s, end, visited, prev);
    await animateList(visInOrderD, "visiting", "", 40);
    if (path == []) {
        $('#status-update').html("Path Not Possible");
    } else {
        await animateList(path, "finalPath", "visiting", 40);
    }

}
async function startDjikstras() {
    const path = djikstras(s, end, visited, prev);
    await animateList(visInOrderDj, "visiting", "", 40);
    if (path == []) {
        $('#status-update').html("Path Not Possible");
    } else {
        await animateList(path, "finalPath", "visiting", 40);
    }
}


async function animateList(aList, addClass, removeClass, time) {
    for (let i = 0; i < aList.length; i++) {
        var nodes = aList[i];
        $("#b" + nodes[0] + "-" + nodes[1]).removeClass(removeClass).addClass(addClass);
        await sleep(30);
    }
    return Promise.resolve();;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function recreate(visited, prev) {
    for (let i = 0; i < visited.length; i++) {
        visited[i] = [];
        prev[i] = [];
    }
    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 49; j++) {
            visited[i][j] = false;
            prev[i][j] = null;
        }
    }
}

