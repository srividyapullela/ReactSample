import * as moment from 'moment-timezone';

export class DateUtil {

    public static getTimeStamp(): string {
      let dt = moment.now();
        let newDate= moment.tz(dt, 'America/Chicago').format("MM/DD/YYYY HH:mm:ss")
        return newDate;
    }

}
