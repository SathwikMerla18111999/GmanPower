import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { GManService } from './gman.service';

@Controller('gman')
export class GManController {
  constructor(private readonly gmanService: GManService) {}

  @Get('power/:filename')
  async calculatePower(@Req() req, @Res() res) {
    const result = await this.gmanService.calculateRemainingPower(req['fileParsedData']);

    if (result) {
      console.log(result.remainingPower); // Log the result to the console
      res.status(200).send(`POWER ${result.remainingPower}\n`);
    } else {
      res.status(404).send('File not found or invalid format.');
    }
  }
}