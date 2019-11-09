import * as math from 'mathjs';
import {applyWindow, countLivingNeighbors, expandGrid, liveOrDieCell, liveOrDieGrid, step} from "../source/game";

describe("Game of Life", function () {
    describe("step", function () {
        it("Can accept a 2D array as input", function () {
            let input = [[0, 0], [0, 0]];

            let output = step(input);

            let expectedOutput = [[0, 0], [0, 0]];

            expect(output).toEqual(expectedOutput);
        });

        it("Can do a 1-generation step on a 2x2 grid", function () {
            let input = [[0, 1], [1, 1]];

            let output = step(input);

            let expectedOutput = [[1, 1], [1, 1]];

            expect(output).toEqual(expectedOutput);
        });
    });

    describe("liveOrDie", function () {
        it("Returns proper status for a 3x3grid", function () {
            const inputGrid = [[1, 1, 1], [1, 0, 0], [0, 0, 0]]
            const nLivingNeighbors = [[1, 2, 3], [4, 1, 2], [3, 4, 5]]
            let output = liveOrDieGrid(inputGrid, nLivingNeighbors);

            let expectedOutput = [[0,1,1],[0,0,0],[1,0,0]];

            expect(output).toEqual(expectedOutput);
        });
    });

    describe("liveOrDieCell", function () {
        it("Any living cell with fewer than two live neighbors dies, as if by underpopulation", function () {
            expect(liveOrDieCell(1, 0)).toEqual(0);
            expect(liveOrDieCell(1, 1)).toEqual(0);
        });

        it("Any living cell with two or three live neighbors lives on to the next generation", function () {
            expect(liveOrDieCell(1, 2)).toEqual(1);
            expect(liveOrDieCell(1, 3)).toEqual(1);
        });

        it("Any living cell with more than three live neighbors dies, as if by overpopulation", function () {
            expect(liveOrDieCell(1, 4)).toEqual(0);
            expect(liveOrDieCell(1, 5)).toEqual(0);
            expect(liveOrDieCell(1, 7)).toEqual(0);
        });

        it("Any dead cell with exactly three live neightbors becomes a live cell, as if by reproduction", function () {
            expect(liveOrDieCell(0, 2)).toEqual(0);
            expect(liveOrDieCell(0, 3)).toEqual(1);
            expect(liveOrDieCell(0, 4)).toEqual(0);
        });
    });


    describe("countLivingNeighbors", function () {
        it("Counts neighbors on a 2x2 grid", function () {
            let input = [[0, 1], [1, 1]];

            let output;
            output = countLivingNeighbors(input);

            expect(output).toEqual([[3, 2], [2, 2]]);
        });
    });

    describe("expandGrid", function () {
        it("Expands a 2x2 grid", function () {
            let input = [[0, 1], [1, 1]];

            let output = expandGrid(input);

            expect(output.toArray()).toEqual([[0,0,0,0],[0,0,1,0],[0,1,1,0],[0,0,0,0]])
        })
    });

    describe("applyWindow", function () {
        it("Applies a windowing matrix to a grid", function () {
            let input = [
                [1,0,0,0],
                [0,0,1,0],
                [0,1,1,1],
                [0,1,0,1]];

            let window = [[1,1,1],[1,0,1],[1,1,1]];

            let output = applyWindow(math.matrix(input), math.matrix(window));

            expect(output.toArray()).toEqual([[4, 3],[3, 5]])
        })
    });
});
