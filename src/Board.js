import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    isLightChanges: 0.20
  };

  createBoard() {
    let board = [];

    for (let i = 0; i < this.props.nRows; i++) {
      const row = [];
      for (let j = 0; j < this.props.nCols; j++) {
        row.push((Math.random() < this.props.isLightChanges));
      }
      board.push(row);
    }
    return board;
  };

  flipCellsAround(coord) {
    const { nRows, nCols } = this.props;
    let board = this.state.board;
    const [x, y] = coord.split("-").map(Number);

    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nRows && y >= 0 && y < nCols) {
        board[x][y] = !board[x][y];
      }
    }

    // flip the clicked cell and sorrounding cells
    flipCell(x, y);
    flipCell(x + 1, y);
    flipCell(x - 1, y);
    flipCell(x, y + 1);
    flipCell(x, y - 1);

    // determine if the game is won
    let hasWon = board.every(row => row.every(cell => !cell));
    // set state
    this.setState({ board: board, hasWon: hasWon });
  }

  render() {
    const tableBoard = [];
    for (let x = 0; x < this.props.nRows; x++) {
      const cell = [];
      for (let y = 0; y < this.props.nCols; y++) {
        const coord = `${x}-${y}`;
        cell.push(
          <Cell
            key={coord} isLit={this.state.board[x][y]} flipCellsAroundMe={() => this.flipCellsAround(coord)} />
        )
      }
      tableBoard.push(<tr key={x}>{cell}</tr>)
    };

    return (
      <>
        {
          this.state.hasWon ?
            <div className="winner">
              <span className="neon">You</span>
              <span className="flux">Win!</span>
            </div> :
            <div className="container" >
              <div className="Board-container">
                <div className="neon">LIGHTS</div>
                <div className="flux">OUT</div>
              </div>
              <div className="Board">
                <table>
                  <tbody>
                    {tableBoard}
                  </tbody>
                </table>
              </div>
            </div >
        }
      </>

    );

  };
}

export default Board;