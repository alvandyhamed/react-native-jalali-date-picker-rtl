# react-native-jalali-date-picker-rtl
yarn add https://github.com/alvandyhamed/react-native-jalali-date-picker-rtl
Or
npm i https://github.com/alvandyhamed/react-native-jalali-date-picker-rtl



A simple and clean jalali datepicker for ReactNative.

My goal of push this package on github is to use it for personal projects. You can refer to the below link and use the full version of this package : [https://github.com/rghorbani/react-native-general-calendars]: React-Native-General-calendars

## Demo
<kbd>
  <img src="https://raw.githubusercontent.com/mgolkardev/react-native-jalali-date-picker-rtl/master/demo/demo.jpg?raw=true">
</kbd>


## How to use 
Run : 
    
    `$ npm i --save react-native-jalali-date-picker-rtl`
    or
    `$ yarn add react-native-jalali-date-picker-rtl`
    

Add the following code in your component :

	import React, { Component } from 'react';
	import { View, Text, Dimensions } from 'react-native';
	import PersianCalendarPicker from 'react-native-jalali-date-picker-rtl';

        class FreeTime extends Component { 
            constructor(props) {
                super(props);

                this.state = {
                    date: new Date()
                };
                this.onDateChange = this.onDateChange.bind(this);
            }
        
            onDateChange(date) {
            this.setState({ date });
            }
            
            render() {
                const { date, prevDay, prevDays } = this.state;
                return (
                    <View style={styles.container}>
                        <PersianCalendarPicker
                            selectedDate={date}
                            onDateChange={this.onDateChange}
                            screenWidth={Dimensions.get('window').width}
                        />
                    <Text style={styles.selectedDate}> Date: { this.state.date.toString() } </Text>
                </View>
                );
            }
        }

#### new prop in version
	`reverse: true|false`
	
### this version has selectable jalali years
