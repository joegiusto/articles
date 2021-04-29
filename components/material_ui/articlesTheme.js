import { createMuiTheme } from "@material-ui/core";

const materialTheme = createMuiTheme({
    overrides: {
        MuiButton: {
            textPrimary: {
                color: 'color: rgb(0 0 0)',
                '&:hover': {
                    backgroundColor: 'rgb(255 183 183 / 50%)'
                }
            }
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: 'rgb(255 183 183)',
                color: '#000',
            },
        },
        MuiPickersToolbarText: {
            toolbarTxt: {
                color: 'rgb(0 0 0 / 50%)',
            },
            toolbarBtnSelected: {
                color: '#000'
            },
        },
        MuiPickerDTTabs: {
            tabs: {
                backgroundColor: 'rgb(255 183 183)',
                color: '#000',
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
            // backgroundColor: lightBlue.A200,
            // color: "black",
            },
        },
        MuiPickersDay: {
            day: {
            color: '#000',
            },
            daySelected: {
            backgroundColor: '#000',
            },
            dayDisabled: {
            color: 'rgb(255 183 183)',
            },
            current: {
            color: '#000',
            },
        },
        MuiPickersModal: {
            dialogAction: {
            color: '#000',
            },
        },
        MuiPickersClock: {
            pin: {
                backgroundColor: 'rgb(255 183 183)',
            },
        },
        MuiPickersClockNumber: {
            clockNumberSelected: {
                color: '#000',
                fontWeight: '700'
            }
        },
        MuiPickersClockPointer: {
            noPoint : {
                backgroundColor: 'rgb(255 183 183)',
            },
            thumb: {
                border: '14px solid #ffb7b7',
            },
            pointer : {
                backgroundColor: 'rgb(255 183 183)',
            },
        },
    },
});

export default materialTheme;