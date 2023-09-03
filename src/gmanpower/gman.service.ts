import { Injectable } from '@nestjs/common';

export interface IGManCoordinates {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startDirection: string;
}

export interface IGManPowerResult {
  remainingPower: number;
}

@Injectable()
export class GManService {
  calculateRemainingPower({
    startX,
    startY,
    endX,
    endY,
    startDirection,
  }: IGManCoordinates): IGManPowerResult {
    let sx = startX;
    let sy = startY;
    let sd = startDirection;
    let moves = 0;
    let turns = 0;

    while (sx !== endX || sy !== endY) {
      if (sx !== endX) {
        if (sx < endX) {
          switch (sd) {
            case 'N':
              sd = 'E';
              turns++;
              break;
            case 'E':
              moves++;
              break;
            case 'S':
              sd = 'E';
              turns++;
              break;
            case 'W':
              sd = 'N';
              turns++;
              break;
          }
        } else {
          switch (sd) {
            case 'N':
              sd = 'W';
              turns++;
              break;
            case 'E':
              sd = 'N';
              turns++;
              break;
            case 'S':
              sd = 'W';
              turns++;
              break;
            case 'W':
              moves++;
              break;
          }
        }
      } else if (sy !== endY) {
        if (sy < endY) {
          switch (sd) {
            case 'N':
              moves++;
              break;
            case 'E':
              sd = 'S';
              turns++;
              break;
            case 'S':
              moves++;
              break;
            case 'W':
              sd = 'S';
              turns++;
              break;
          }
        } else {
          switch (sd) {
            case 'N':
              sd = 'N';
              moves++;
              break;
            case 'E':
              sd = 'E';
              moves++;
              break;
            case 'S':
              sd = 'S';
              moves++;
              break;
            case 'W':
              sd = 'W';
              moves++;
              break;
          }
        }
      }
    }

    const remainingPower = 200 - (moves * 10 + turns * 5);
    return { remainingPower };
  }
}