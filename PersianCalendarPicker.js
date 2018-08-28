/**
 * Persian Calendar Picker Component
 *
 * Copyright 2016 Reza (github.com/rghorbani)
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const moment = require('moment-jalaali');
const {
  Text,
  View,
} = require('react-native');

const styles = require('./style');
const HeaderControls = require('./HeaderControls');
const WeekDaysLabels = require('./WeekDaysLabels');
const Days = require('./Days');

class PersianCalendarPicker extends React.Component {
  static propTypes = {
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    onDateChange: PropTypes.func,
    screenWidth: PropTypes.number,
    weekdays: PropTypes.array,
    months: PropTypes.array,
    previousTitle: PropTypes.string,
    nextTitle: PropTypes.string,
    selectedDayColor: PropTypes.string,
    selectedDayTextColor: PropTypes.string,
    scaleFactor: PropTypes.number,
    textStyle: Text.propTypes.style,
    prevDays: PropTypes.string,
    rtl: PropTypes.bool

  };

  constructor(props) {
    super(props);
    // if (this.props.scaleFactor !== undefined) {
    //   styles = StyleSheet.create(makeStyles(this.props.scaleFactor));
    // }
    let date = moment(this.props.selectedDate);
    this.state = {
      date: date,
      day: date.jDate(),
      month: date.jMonth(),
      year: date.jYear(),
      selectedDay: []
    };

    this.onDayChange = this.onDayChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.getNextYear = this.getNextYear.bind(this);
    this.getPrevYear = this.getPrevYear.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  // Trigger date change if new props are provided.
  // Typically, when selectedDate is changed programmatically.
  //
  componentWillReceiveProps(newProps) {
    let date = moment(newProps.selectedDate);
    this.setState({
      date: date,
      day: date.jDate(),
      month: date.jMonth(),
      year: date.jYear(),
    });
  }

  onDayChange(day) {

    this.setState({ day: day.day }, () => { this.onDateChange(); });
  }

  onMonthChange(month) {
    this.setState({ month: month }, () => { this.onDateChange(); });
  }

  getNextYear() {
    this.setState({ year: this.state.year + 1 }, () => { this.onDateChange(); });
  }

  getPrevYear() {
    this.setState({ year: this.state.year - 1 }, () => { this.onDateChange(); });
  }

  onDateChange() {
    let {
      day,
      month,
      year,
    } = this.state;
    let date = moment(year + '/' + (month + 1) + '/' + day, 'jYYYY/jM/jD');
    let date2 = new Date(date.year(), date.month(), date.date());
    console.log(this.props);
    console.log(this.state);
    this.setState({ date: date });
    this.props.onDateChange(date2);
  }

  render() {
    return (
      <View style={styles.calendar}>
        <HeaderControls
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          year={this.state.year}
          month={this.state.month}
          onMonthChange={this.onMonthChange}
          getNextYear={this.getNextYear}
          getPrevYear={this.getPrevYear}
          months={this.props.months}
          previousTitle={this.props.previousTitle}
          nextTitle={this.props.nextTitle}
          textStyle={this.props.textStyle}
          reverse={this.props.reverse}
        />
        <WeekDaysLabels
          screenWidth={this.props.screenWidth}
          weekdays={this.props.weekdays}
          textStyle={this.props.textStyle}
          reverse={this.props.reverse}
        />
        <Days
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          month={this.state.month}
          year={this.state.year}
          date={this.state.date}
          onDayChange={this.onDayChange}
          screenWidth={this.props.screenWidth}
          selectedDayTextColor={this.props.selectedDayTextColor}
          selectedDayColor={this.props.selectedDayColor}
          textStyle={this.props.textStyle}
          prevDays={this.props.prevDays}
          reverse={this.props.reverse}
        />
      </View>
    );
  }
}

module.exports = PersianCalendarPicker;
