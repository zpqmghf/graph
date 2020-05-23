var canGo = [
    [[1], [8, 0], [9, 3], [10, 2, 4], [11, 3, 5], [12, 4, 6], [13, 5]],
    [[14], [1, 15, 9], [2, 16, 8], [3, 17, 11], [4, 10, 12], [5, 19, 11], [6, 20]],
    [[7, 15], [8, 14, 16], [9, 23, 15, 17], [10, 16], [19], [12, 26, 18, 20], [13, 19]],
    [[28], [23], [16, 22, 24], [31, 23, 25], [24], [19], [34]],
    [[21, 35, 29], [36, 28, 30], [37, 29], [24, 38, 32], [39, 31], [40, 34], [27, 33]],
    [[28, 42], [29], [30, 38], [31, 45, 37, 39], [32, 38, 40], [33, 47, 39, 41], [48, 40]],
    [[35, 43], [42, 44], [43, 45], [38, 44], [47], [40, 46, 48], [41, 47]]
];
function dijkstra(start, end) {
    let S = [start];            //S为已找到最小路径点的索引
    let U = [];                 //U为未找到最小路径点的索引
    var index = 0;              //用于遍历的Index
    for (let i = 0; i < canGo.length; i++) {      //把除start以外的点放入U
        for (let j = 0; j < canGo[i].length; j++) {
            if (index == start) continue;
            U.push(index++);
        }
    }
    let temp = [];              //temp数组存放每一个点目前到起点的最短距离
    let parent = [];            //parent数组存放到该点的上一个点的索引
    index = 0;//索引计数器
    for (let i = 0; i < canGo.length; i++) {
        for (let j = 0; j < canGo[i].length; j++) {
            if (index == start)         //起点到起点为0
                temp[index] = 0;
            else if (canGo[Math.floor(start / 7)][start % 7].indexOf(index) != -1) {    //起点附近的点为1
                temp[index] = 1;
            } else {
                temp[index] = 999;   //其他点为999
            }
            index++;
        }
    }
    while (U.length > 0) {  //主循环，直到找到U中所有点的最短路径
        let min = 99;
        let minIndex;
        for (let i = 0; i < temp.length; i++) {
            if (min > temp[i] && S.indexOf(i) == -1) {          //找到目前不在S数组中到起点最短路径的一个点
                min = temp[i];
                minIndex = i;
            }
        }
        let i = Math.floor(minIndex / 7);   
        let j = minIndex % 7;
        for (let k = 0; k < canGo[i][j].length; k++) {      //更新该点的最短路径
            if (temp[canGo[i][j][k]] > temp[minIndex] + 1) {    //该点的最短路径为 能够通往该点，且该点的最短路径值大于 通往该点的点的最短路径+1
                temp[canGo[i][j][k]] = temp[minIndex] + 1;  //更新为通往该节点的点的最短路径+1
                parent[canGo[i][j][k]] = minIndex;  //将该节点的父节点改为通往这个节点的点
            }
        }
        S.push(minIndex);   //该点现在到起点的距离一定是最短路径
        U.splice(U.indexOf(minIndex), 1);   //从U中去掉该点
    }
    index = end;
    let result = [];
    while (parent[index]) {         //打印出起点到终点的路径
        result.push(parent[index])
        index = parent[index];
    }
    result.push(start);
    console.log(result);
}
dijkstra(36, 12);