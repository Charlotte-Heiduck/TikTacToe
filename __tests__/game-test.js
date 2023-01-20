const Game = require("../src/game.js");

test("all 0", () => {
    let game = new Game("000000000");
    let actual = game.winCheck(1);
    let expected = false;
    expect(actual).toBe(expected);
});

test("first row 1s", () => {
    game = new Game("111000000");
    actual = game.winCheck(1);
    expected = true;
    expect(actual).toBe(expected);
});

test("first col 1s", () => {
    game = new Game("100100100");
    actual = game.winCheck(1);
    expected = true;
    expect(actual).toBe(expected);
});

test("first col 2s", () => {
    game = new Game("010010010");
    actual = game.winCheck(1);
    expected = true;
    expect(actual).toBe(expected);
});

test("first diag upper left", () => {
    game = new Game("100010001");
    actual = game.winCheck(1);
    expected = true;
    expect(actual).toBe(expected);
});

test("first diag upper right", () => {
    game = new Game("001010100");
    actual = game.winCheck(1);
    expected = true;
    expect(actual).toBe(expected);
});

test("first diag upper right", () => {
    game = new Game("111000222");
    actual = game.winCheck(1);
    expected = true;
    expect(actual).toBe(expected);
});