import {Hook} from '@oclif/config'
import cli from 'cli-ux'  
import * as fs from 'fs-extra'
const chalk = require('chalk')

const hook: Hook<'init'> = async function (opts) {
  try {
    if (this.config.pjson.telemetry == null) {
      const disableTelemetry = await cli.prompt(chalk.red('Telemetry is enabled. Would you like to opt out? (Y/N)'))
      if (disableTelemetry === 'Y' || disableTelemetry === 'y') {
        this.config.pjson.telemetry = false
        this.log(chalk.blue('Telemetry has been disabled.'))
      }else { 
        this.config.pjson.telemetry = true
        this.log(chalk.blue('Telemetry will remain enabled'))
      }
      var path = require('path')
      var pathToJson = path.resolve(__dirname, '../../../package.json')
      const userConfig = await fs.readJSON(pathToJson)
      userConfig.telemetry = this.config.pjson.telemetry  
      await fs.writeFile(pathToJson, JSON.stringify(userConfig, null, 2))
    }
  } catch (err) {
      // swallow the exception; we don't want to crash the app
      // on a failed attempt to set telemetry
  }
}

export default hook