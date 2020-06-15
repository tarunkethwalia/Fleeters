import React,{Fragment, useState} from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker } from "@material-ui/pickers";

export default function DateAndTimePickers({dateValue,label,id}) {
    const [selectedDate, changedDate] = useState(new Date());
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Fragment>
            <DateTimePicker
                value={selectedDate}
                disablePast
                className='DateInput'
                onChange={(date)=>{dateValue(date,id);changedDate(date)}}
                label={label}
                showTodayButton
                inputvarient='outlined'
            />
            </Fragment>
            </MuiPickersUtilsProvider>
        );
}
