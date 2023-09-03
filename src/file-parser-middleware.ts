import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FileParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET' && req.url.startsWith('/gman/power/')) {
      const filename = req.url.replace('/gman/power/', '');
      const fs = require('fs');
      const readline = require('readline');
      const fileStream = fs.createReadStream(filename);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      let startX = 0;
      let startY = 0;
      let endX = 0;
      let endY = 0;
      let startDirection = '';

      rl.on('line', (line: string) => {
        const [command, ...args] = line.split(' ');

        if (command === 'SOURCE') {
          // Parse source coordinates and direction
          startX = parseInt(args[0]);
          startY = parseInt(args[1]);
          startDirection = args[2];
        } else if (command === 'DESTINATION') {
          // Parse destination coordinates
          endX = parseInt(args[0]);
          endY = parseInt(args[1]);
        }
      });

      rl.on('close', () => {
        // Store the parsed data in the request object
        req['fileParsedData'] = {
          startX,
          startY,
          endX,
          endY,
          startDirection,
        };
        next();
      });
    } else {
      next();
    }
  }
}