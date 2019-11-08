import * as math from 'mathjs';
import {applyWindow, countLivingNeighbors, expandGrid, step} from "../source/game";

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