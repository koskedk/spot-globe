import { Controller, Get, Logger, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getAppName(): any {
    return {
      name: 'Dwapi Spot-Globe',
      build: '10FEB212107',
      staus: 'running',
    };
  }
  @Get('globe')
  getLib(@Res() res): string {
    Logger.log(__dirname + '/wwwroot/globe.js');
    return res.sendFile(__dirname + '/wwwroot/globe.js');
  }
}
