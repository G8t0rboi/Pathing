import React, {useState} from 'react';
import './styles/Grid.css';

function Grid() {

    const numRows = 20;
    const numCols = 20;

    const getNeighbours = (row, col) => {

        if ( row === 0 ) {

        }
        else if ( row === numRows - 1 ) {

        }
        else if ( col === 0 ) {

        }
        else if ( col === numCols - 1 ) {
            
        }

    }

    const astar = () => {

    }

    const createInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < numRows; row++) {
          const currentRow = [];
          for (let col = 0; col < numCols; col++) {
            currentRow.push({
              isWall: false,
              isStart: false,
              isEnd: false,
              x: col,
              y: row,
            });
          }
          grid.push(currentRow);
        }
        grid[0][0].isStart = true;
        grid[numRows-1][numCols-1].isEnd = true;
        return grid;
      };

    const initialGrid = createInitialGrid();

    const [grid, setGrid] = useState(initialGrid);
    const [isdrawing, setIsDrawing] = useState(false);
    const [ismovingstart, setIsMovingStart] = useState(false);
    const [ismovingend, setIsMovingEnd] = useState(false);

    const handleMouseDown = (row, col) => {
        setIsDrawing(true);
        const updated = grid;
        const targetNode = grid[row][col];
        //console.log(targetNode.isStart);
        if ( targetNode.isStart ) {
            setIsMovingStart(true);
            return;
        }
        if ( targetNode.isEnd ) {
            setIsMovingEnd(true);
            return;
        }
        updated[row][col] = {...updated[row][col], isWall: !updated[row][col].isWall};   
        setGrid(updated);
        console.log(ismovingstart, row, col);
    }

    const handleMouseEnter = (row, col) => {

        if ( !isdrawing ) {
            return;
        }

        let updated = grid;

        if ( ismovingstart ) {
            updated = grid.map((r, rI) => (
                r.map((n, nI) => {
                    if ( row === rI && col === nI ) {
                        return {...n, isStart: true};
                    }
                    return {...n, isStart: false};
                })
            ))
        }
        else if ( ismovingend ) {
            updated = grid.map((r, rI) => (
                r.map((n, nI) => {
                    if ( row === rI && col === nI ) {
                        return {...n, isEnd: true};
                    }
                    return {...n, isEnd: false};
                })
            ))
        }
        else if ( isdrawing ) {
            updated = grid.map((r, rI) => (
                r.map((n, nI) => {
                    if ( row === rI && col === nI ) {
                        return {...n, isWall: !n.isWall}
                    }
                    return n;
                })
            ))
        }

        setGrid(updated);
    }

    const handleMouseUp = () => {
        setIsDrawing(false);
        setIsMovingStart(false);
        setIsMovingEnd(false);
    }

    const gridHTML = grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
            {row.map((node, colIndex) => {
                const xy = rowIndex + " " + colIndex;
                return <div 
                key={colIndex} 
                className={`node ${node.isWall ? "selected" : ""} ${node.isStart ? "start" : ""} ${node.isEnd ? "end" : ""}`}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)} 
                onMouseUp={handleMouseUp}></div>
            })}
        </div>
    ));

    //console.log(grid);
    //console.log(gridHTML);
    return (
        <div className="grid">
           {gridHTML}
        </div>
    );

}

export default Grid;