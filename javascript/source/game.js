import * as math from 'mathjs';

export function step(inputGrid) {
    let nLivingNeighbors = countLivingNeighbors(inputGrid);
    // for each cell: determine if live or die (isLiving, nLivingNeighbors)
    return liveOrDieGrid(inputGrid, nLivingNeighbors);
}

export function liveOrDieGrid(inputGrid, nLivingNeighbors) {
    return inputGrid.map((row, ir) => row.map((el, ic) => liveOrDieCell(el, nLivingNeighbors[ir][ic])));
}

export function liveOrDieCell(isLiving, nLivingNeighbors) {
    if (!isLiving && nLivingNeighbors === 3) {
        return 1;
    }

    if (isLiving && (nLivingNeighbors === 2 || nLivingNeighbors === 3)) {
        return 1;
    }

    return 0;
}

export function countLivingNeighbors(inputGrid) {
    let expandedGrid = expandGrid(inputGrid);

    let windowMatrix = math.ones(3,3).subset(math.index(1,1), 0);
    return applyWindow(expandedGrid, windowMatrix).toArray();
}

export function expandGrid(grid) {
    let nRows = grid.length;
    let nCols = grid[0].length;

    return math.subset(
        math.zeros(nRows+2, nCols+2),
        math.index(math.range(1, nRows+1), math.range(1, nCols+1)),
        grid
    );
}

export function applyWindow(grid, windowMatrix) {
    let [nRows, nCols] = grid.size();
    let applied = math.zeros(nRows-2, nCols-2);
    for (let ir=0; ir<nRows-2; ir++) {
        for (let ic=0; ic<nCols-2; ic++) {
            let areaToApply = grid.subset(math.index(math.range(ir, ir+3), math.range(ic, ic+3)));
            applied.subset(math.index(ir, ic),math.sum(math.dotMultiply(windowMatrix, areaToApply)));
        }
    }

    return applied;
}
