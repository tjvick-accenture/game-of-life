import * as math from 'mathjs';

export function step(inputGrid) {
    countLivingNeighbors(inputGrid);
    // for each cell: determine if live or die (isLiving, nLivingNeighbors)
    return inputGrid;
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
        math.index([1, nRows], [1, nCols]),
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