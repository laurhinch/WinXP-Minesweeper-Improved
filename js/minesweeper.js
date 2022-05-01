rocket.extend(($ = rocket.$), rocket);
var arcade = {};

arcade.minesweeper = function (play_area, face) {
    play_area.preventSelect();
    this.play_area = play_area;
};

arcade.minesweeper.prototype.play_area;
arcade.minesweeper.prototype.play_table;
arcade.minesweeper.prototype.grid;
arcade.minesweeper.prototype.grid_area;
arcade.minesweeper.prototype.header_td_mine_count;
arcade.minesweeper.prototype.header_td_timer;
arcade.minesweeper.prototype.width;
arcade.minesweeper.prototype.height;
arcade.minesweeper.prototype.number_mines;
arcade.minesweeper.prototype.mine_counter;
arcade.minesweeper.prototype.mouse = { left: false, right: false };
arcade.minesweeper.prototype.correct_mines;
arcade.minesweeper.prototype.timer_interval;
arcade.minesweeper.prototype.face;
arcade.minesweeper.prototype.game_active;

arcade.minesweeper.prototype.build = function (width, height) {
    this.play_table = $.createElement("table")
        .setAttribute({ cellspacing: 0, cellpadding: 0 })
        .style({
            border: "1px solid black",
            width: width * 16 + 22,
            "-moz-box-shadow": "3px 3px 6px 1px #999",
            "-webkit-box-shadow": "3px 3px 6px 1px #999",
            "box-shadow": "3px 3px 6px 1px #999",
            margin: "auto",
        });
    var tbody = $.createElement("tbody");

    // 5 Rows
    var tr_border_top = $.createElement("tr");
    var tr_header = $.createElement("tr");
    var tr_border_middle = $.createElement("tr");
    var tr_border_bottom = $.createElement("tr");

    // Cells
    var td_border_top_left = $.createElement("td").style({
        width: 10,
        height: 10,
        "background-image": "url('image/sprite.png')",
        "background-repeat": "no-repeat",
        "background-position": "0px -81px",
    });
    var td_border_top_right = $.createElement("td").style({
        width: 10,
        height: 10,
        "background-image": "url('image/sprite.png')",
        "background-repeat": "no-repeat",
        "background-position": "-26px -81px",
    });
    tr_border_top.appendChild(td_border_top_left);
    for (var i = 0; i < width; i++) {
        tr_border_top.appendChild(
            $.createElement("td").style({
                width: 16,
                height: 10,
                "background-image": "url('image/sprite.png')",
                "background-repeat": "no-repeat",
                "background-position": "-10px -81px",
            })
        );
    }
    tr_border_top.appendChild(td_border_top_right);
    tbody.appendChild(tr_border_top);

    var td_header_left = $.createElement("td").style({
        width: 10,
        height: 32,
        "background-image": "url('image/sprite.png')",
        "background-repeat": "no-repeat",
        "background-position": "-36px -81px",
    });
    var td_header_center = $.createElement("td")
        .style({ "background-color": "#c0c0c0" })
        .setAttribute({ colspan: width });
    var td_header_right = $.createElement("td").style({
        width: 10,
        height: 32,
        "background-image": "url('image/sprite.png')",
        "background-repeat": "no-repeat",
        "background-position": "-36px -81px",
    });
    tr_header.appendChild(td_header_left);
    tr_header.appendChild(td_header_center);
    tr_header.appendChild(td_header_right);
    tbody.appendChild(tr_header);

    var td_border_middle_left = $.createElement("td").style({
        width: 10,
        height: 10,
        "background-image": "url('image/sprite.png')",
        "background-repeat": "no-repeat",
        "background-position": "-0px -91px",
    });
    var td_border_middle_right = $.createElement("td").style({
        width: 10,
        height: 10,
        "background-image": "url('image/sprite.png')",
        "background-repeat": "no-repeat",
        "background-position": "-26px -91px",
    });
    tr_border_middle.appendChild(td_border_middle_left);
    for (var i = 0; i < width; i++) {
        tr_border_middle.appendChild(
            $.createElement("td").style({
                "background-image": "url('image/sprite.png')",
                "background-repeat": "no-repeat",
                "background-position": "-10px -81px",
            })
        );
    }
    tr_border_middle.appendChild(td_border_middle_right);
    tbody.appendChild(tr_border_middle);

    var tr_grid_area = $.createElement("tr");
    tr_grid_area.appendChild(
        $.createElement("td").style({
            height: 16,
            width: 10,
            "background-image": "url('image/sprite.png')",
            "background-repeat": "no-repeat",
            "background-position": "-36px -81px",
        })
    );
    this.grid_area = $.createElement("td").setAttribute({ colspan: width, rowspan: height });
    tr_grid_area.appendChild(this.grid_area);
    tr_grid_area.appendChild(
        $.createElement("td").style({
            height: 16,
            width: 10,
            "background-image": "url('image/sprite.png')",
            "background-repeat": "no-repeat",
            "background-position": "-36px -81px",
        })
    );
    tbody.appendChild(tr_grid_area);
    for (var i = 0; i < height - 1; i++) {
        tr_grid_area = $.createElement("tr");
        tr_grid_area.appendChild(
            $.createElement("td").style({
                height: 16,
                width: 10,
                "background-image": "url('image/sprite.png')",
                "background-repeat": "no-repeat",
                "background-position": "-36px -81px",
            })
        );
        tr_grid_area.appendChild(
            $.createElement("td").style({
                height: 16,
                width: 10,
                "background-image": "url('image/sprite.png')",
                "background-repeat": "no-repeat",
                "background-position": "-36px -81px",
            })
        );
        tbody.appendChild(tr_grid_area);
    }

    var td_border_bottom_left = $.createElement("td").style({
        width: 10,
        height: 10,
        "background-image": "url('image/sprite.png')",
        "background-repeat": "no-repeat",
        "background-position": "0px -101px",
    });
    var td_border_bottom_right = $.createElement("td").style({
        width: 10,
        height: 10,
        "background-image": "url('image/sprite.png')",
        "background-repeat": "no-repeat",
        "background-position": "-26px -101px",
    });
    tr_border_bottom.appendChild(td_border_bottom_left);
    for (var i = 0; i < width; i++) {
        tr_border_bottom.appendChild(
            $.createElement("td").style({
                width: 16,
                height: 10,
                "background-image": "url('image/sprite.png')",
                "background-repeat": "no-repeat",
                "background-position": "-10px -101px",
            })
        );
    }
    tr_border_bottom.appendChild(td_border_bottom_right);
    tbody.appendChild(tr_border_bottom);

    this.play_table.appendChild(tbody);
    this.play_area.appendChild(this.play_table);

    // Header
    var header_table = $.createElement("table")
        .setAttribute({ cellpadding: 0, cellspacing: 0 })
        .style({ width: "100%" });
    var header_tbody = $.createElement("tbody");
    var header_tr = $.createElement("tr");
    this.header_td_mine_count = $.createElement("td").style({ width: 53, "text-align": "center" });
    this.header_td_face = $.createElement("td").style({ "text-align": "center" });
    this.header_td_timer = $.createElement("td").style({ width: 53, "text-align": "center" });
    header_tr.appendChild(this.header_td_mine_count);
    header_tr.appendChild(this.header_td_face);
    header_tr.appendChild(this.header_td_timer);
    header_tbody.appendChild(header_tr);
    header_table.appendChild(header_tbody);
    td_header_center.appendChild(header_table);
};

arcade.minesweeper.prototype.mark_tile = function (tile, forceFlag) {
    const is_tile_revealed = tile.is_revealed();
    if (is_tile_revealed) {
        return;
    }
    const was_tile_flagged = tile.get_state() === "flag";

    let is_tile_flagged = false;
    if (forceFlag) {
        tile.set_state("flag");
        is_tile_flagged = true;
    } else {
        is_tile_flagged = tile.mark() === "flag";
    }

    if (is_tile_flagged) {
        this.mine_counter.decrement();
        if (tile.is_a_mine()) {
            this.correct_mines++;
        }
    } else if (was_tile_flagged) {
        this.mine_counter.increment();
        if (tile.is_a_mine()) {
            this.correct_mines--;
        }
    }

    this.check_game_end(tile);
};

arcade.minesweeper.prototype.check_game_end = function (tile) {
    if (this.correct_mines !== this.number_mines) {
        return;
    }
    const total_revealed_and_flagged = this.correct_mines + this.grid.revealed_tiles;
    if (total_revealed_and_flagged < this.grid.number_tiles) {
        return;
    }
    this.grid.reveal_grid(tile);
    this.end_game(true);
}

arcade.minesweeper.prototype.end_game = function (success) {
    this.game_active = false;
    clearInterval(this.timer_interval);
    if (success) {
        this.face.set_state("sunglasses");
    } else {
        this.face.set_state("dead");
    }
};

arcade.minesweeper.prototype.new_game = function (width, height, number_mines) {
    var self = this;

    this.width = width;
    this.height = height;
    this.number_mines = number_mines;
    this.correct_mines = 0;

    this.play_area.innerHTML("");

    this.build(width, height);

    this.face = new arcade.minesweeper.face(this, this.header_td_face);

    this.play_table.removeEventListener("mousedown,mouseup").style({ cursor: "default", border: "1px solid #444" });
    this.play_table
        .addEventListener("mousedown", function (e) {
            if (e.target === this.face.get_element()) return false;
            if (!this.game_active) {
                return;
            }
            if (e.which === 1) this.face.set_state("scared");
        }.bind(this))
        .addEventListener("mouseup", function (e) {
            if (!this.game_active) {
                return;
            }
            this.face.set_state("smile");
        }.bind(this));

    this.mine_counter = new arcade.minesweeper.ssd(this.header_td_mine_count, number_mines);

    var timer = new arcade.minesweeper.ssd(this.header_td_timer, 0);
    this.timer_interval = setInterval(function () {
        timer.increment();
    }, 1000);

    this.grid = new arcade.minesweeper.grid(this, this.grid_area, width, height, this.face);
    this.grid.generate(number_mines);

    this.game_active = true;
};
arcade.minesweeper.prototype.restart = function () {
    this.new_game(this.width, this.height, this.number_mines);
};

$.ready(function () {
    var minesweeper = new arcade.minesweeper($("#play_area"));
    minesweeper.new_game(16, 16, 40);

    $("#button_beginner").addEventListener("click", function () {
        minesweeper.new_game(9, 9, 10);
    });
    $("#button_intermediate").addEventListener("click", function () {
        minesweeper.new_game(16, 16, 40);
    });
    $("#button_expert").addEventListener("click", function () {
        minesweeper.new_game(30, 16, 99);
    });
    $("#button_lauren").addEventListener("click", function () {
        minesweeper.new_game(50, 50, 420);
    });

    $(document)
        .addEventListener("mousedown", function (e) {
            if (!minesweeper.game_active) {
                return;
            }

            if (e.which == 1) minesweeper.mouse.left = true;
            else if (e.which == 3) minesweeper.mouse.right = true;
            if (e.target.nodeName !== "TD") return false;

            var tile = minesweeper.grid.get_tile_from_td(e.target);
            if (!tile) return false;

            // On right click, mark the tile if the right mouse is the only button down
            if (minesweeper.mouse.right && !minesweeper.mouse.left) {
                minesweeper.mark_tile(tile, false);
            }

            // On left click OR if I have both mouse buttons down
            if (minesweeper.mouse.left || (minesweeper.mouse.right && minesweeper.mouse.left)) {
                var tiles_to_highlight = [];
                tiles_to_highlight.push(minesweeper.grid.get_tile_from_td(e.target));

                // If I have both mouse buttons down, add the surrounding tiles to the highlight array
                if (minesweeper.mouse.left && minesweeper.mouse.right) {
                    var coordinates = minesweeper.grid.get_coordinates_from_td(e.target);
                    var surrounding_tiles = minesweeper.grid.get_surrounding_tiles(coordinates.x, coordinates.y);
                    tiles_to_highlight = tiles_to_highlight.concat(surrounding_tiles);
                }

                // Highlight the tiles
                // console.log(tiles_to_highlight);
                for (var i in tiles_to_highlight) {
                    if (tiles_to_highlight[i].highlight()) {
                        minesweeper.grid.highlighted_tiles.push(tiles_to_highlight[i]);
                    }
                }
            }
        })
        .addEventListener("mouseup", function (e) {

            if (e.target.nodeName !== "TD") {
                if (e.which == 1) minesweeper.mouse.left = false;
                else if (e.which == 3) minesweeper.mouse.right = false;
                return false;
            }
            // If I am releasing the left mouse button OR if both mouse buttons were down and I released either one of them
            if (minesweeper.mouse.left || (minesweeper.mouse.left && minesweeper.mouse.right)) {
                var click_coordinates = minesweeper.grid.get_coordinates_from_td(e.target);

                if (click_coordinates.x === -1 || click_coordinates.y === -1) {
                    if (e.which == 1) minesweeper.mouse.left = false;
                    else if (e.which == 3) minesweeper.mouse.right = false;
                    return false;
                }

                // If I'm trying the quick reveal, do a couple of checks to make sure that all the mines are marked or obvious.
                if (minesweeper.mouse.left && minesweeper.mouse.right) {
                    // Get the number of flagged and unflagged tiles
                    const is_highlighted_revealed =
                        minesweeper.grid.tiles[click_coordinates.x][click_coordinates.y].is_revealed();
                    const mine_count =
                        minesweeper.grid.tiles[click_coordinates.x][click_coordinates.y].get_mine_count();
                    var flag_count = 0;
                    var unflagged_count = 0;
                    var unflagged_tiles = [];
                    // Count all flags and unrevealed unflagged tiles
                    for (var i in minesweeper.grid.highlighted_tiles) {
                        if (minesweeper.grid.highlighted_tiles[i].get_state() === "flag") {
                            flag_count++;
                        } else if (minesweeper.grid.highlighted_tiles[i].is_revealed() === false) {
                            unflagged_count++;
                            unflagged_tiles.push(minesweeper.grid.highlighted_tiles[i]);
                        }
                    }

                    const total_flagged_and_unrevealed = flag_count + unflagged_count;

                    // Compare. If all the mines are marked or obvious, reveal each of the surrounding tiles
                    if (
                        (flag_count === mine_count || total_flagged_and_unrevealed === mine_count) &&
                        is_highlighted_revealed
                    ) {
                        if (flag_count === mine_count) {
                            for (var i in minesweeper.grid.highlighted_tiles) {
                                var coordinates = minesweeper.grid.get_coordinates_from_td(
                                    minesweeper.grid.highlighted_tiles[i].get_element()
                                );
                                minesweeper.grid.reveal_area(coordinates.x, coordinates.y);
                                minesweeper.check_game_end(minesweeper.grid.highlighted_tiles[i]);
                            }
                        } else if (total_flagged_and_unrevealed === mine_count) {
                            for (var i in unflagged_tiles) {
                                minesweeper.mark_tile(unflagged_tiles[i], true);
                            }
                            flag_count = mine_count;
                        }
                    } else {
                        // If not all of the tiles are marked and we're not revealing, unhighlight all of the tiles.
                        for (var i in minesweeper.grid.highlighted_tiles) {
                            minesweeper.grid.highlighted_tiles[i].unhighlight();
                        }
                    }
                } else {
                    // Single tile reveals are simple
                    const failed = minesweeper.grid.reveal_area(click_coordinates.x, click_coordinates.y);
                    if (failed) {
                        minesweeper.end_game(false);
                        return;
                    }
                    minesweeper.check_game_end(minesweeper.grid.tiles[click_coordinates.x][click_coordinates.y]);
                }

                // Clear highlighted tile array
                minesweeper.grid.highlighted_tiles = [];
            }
            if (e.which == 1) minesweeper.mouse.left = false;
            else if (e.which == 3) minesweeper.mouse.right = false;
        })
        .addEventListener("keydown", function () { });
});
