export interface Boards {
  player: [string, number[][]];
  computer: [string, number[][]];
}

export interface ComputerMove {
  playerBoard: number[],
  hits: {}
}
