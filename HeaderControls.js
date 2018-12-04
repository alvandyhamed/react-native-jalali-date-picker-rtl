/**
 * Persian Calendar Picker Component
 *
 * Copyright 2016 Reza (github.com/rghorbani)
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const {
  Text,
  TouchableOpacity,
  View,
    Picker
} = require('react-native');

const styles = require('./style');
const {
  MONTHS,
} = require('./util');

class HeaderControls extends React.Component {
  static propTypes = {
    month: PropTypes.number.isRequired,
    year: PropTypes.number,
    getNextYear: PropTypes.func.isRequired,
    getPrevYear: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    textStyle: Text.propTypes.style
  };

  constructor(props) {
    super(props);
      let yearess=[]
      for(let i=1320;i<=this.props.year;i++){
        yearess.push(i)
      }
           this.state = {
          selectedMonth: this.props.month,
          years:yearess

      };

    this.getNext = this.getNext.bind(this);
    this.getPrevious = this.getPrevious.bind(this);
    this.previousMonthDisabled = this.previousMonthDisabled.bind(this);
    this.nextMonthDisabled = this.nextMonthDisabled.bind(this);
  }

  // Trigger date change if new props are provided.
  // Typically, when selectedDate is changed programmatically.
  //
  componentWillReceiveProps(newProps) {
    this.setState({
      selectedMonth: newProps.month
    });
  }

  // Logic seems a bit awkawardly split up between here and the CalendarPicker
  // component, eg: getNextYear is actually modifying the state of the parent,
  // could just let header controls hold all of the logic and have CalendarPicker
  // `onChange` callback fire and update itself on each change
  getNext() {
    let next = this.state.selectedMonth + 1;
    if (next > 11) {
      this.setState({ selectedMonth: 0 },
        // Run this function as a callback to ensure state is set first
        () => {
          this.props.getNextYear();
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    } else {
      this.setState({ selectedMonth: next },
        () => {
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    }
  }

  getPrevious() {
    let prev = this.state.selectedMonth - 1;
    if (prev < 0) {
      this.setState({ selectedMonth: 11 },
        // Run this function as a callback to ensure state is set first
        () => {
          this.props.getPrevYear();
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    } else {
      this.setState({ selectedMonth: prev },
        () => {
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    }
  }

  previousMonthDisabled() {
    if (this.state.selectedMonth === 1 && this.props.minDate) {
      return true;
    }
    // return ( this.props.minDate &&
    //          ( this.props.year < this.props.minDate.getFullYear() ||
    //            ( this.props.year == this.props.minDate.getFullYear() && this.state.selectedMonth <= this.props.minDate.getMonth() )
    //          )
    //        );
  }

  nextMonthDisabled() {
    return (this.props.maxDate &&
      (this.props.year > this.props.maxDate.getFullYear() ||
        (this.props.year == this.props.maxDate.getFullYear() && this.state.selectedMonth >= this.props.maxDate.getMonth())
      )
    );
  }

  render() {
      let serviceItems = this.state.years.map( (s, i) => {

          return <Picker.Item key={i} value={s} label={s} />
      });

      let textStyle = this.props.textStyle;

    let previous;
    if (this.previousMonthDisabled()) {
      previous = (
        <Text style={[styles.prev, this.props.reverse && styles.prev_rtl, textStyle, styles.disabledTextColor]}>{this.props.previousTitle || 'ماه قبل'}</Text>
      );
    }
    else {
      previous = (
        <TouchableOpacity onPress={this.getPrevious}>
          <Text style={[styles.prev, this.props.reverse && styles.prev_rtl, textStyle]}>{this.props.previousTitle || 'ماه قبل'}</Text>
        </TouchableOpacity>
      );
    }

    let next;
    if (this.nextMonthDisabled()) {
      next = (
        <Text style={[styles.next, this.props.reverse && styles.next_rtl, textStyle, styles.disabledTextColor]}>{this.props.nextTitle || 'ماه بعد'}</Text>
      );
    }
    else {
      next = (
        <TouchableOpacity onPress={this.getNext}>
          <Text style={[styles.next, this.props.reverse && styles.next_rtl, textStyle]}>{this.props.nextTitle || 'ماه بعد'}</Text>
        </TouchableOpacity>
      );
    }


    return (
      <View style={[styles.headerWrapper, this.props.reverse && styles.rtl]}>
        <View style={styles.monthSelector}>
          {next}
        </View>

        <View>
        <Text style={[styles.monthLabel, textStyle]}
          >
              {(this.props.months || MONTHS)[this.state.selectedMonth]}
          </Text>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Picker
                selectedValue={this.state.language}
                style={{ height: 50, width: 100 ,borderWidth:1}}
                onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>

                {this.state.years.map(( i) => {
                    return <Picker.Item key={i} value={i+''} label={i.toString().PersianNumber()} />
                })}
            </Picker>
          </View>
        </View>


        <View style={styles.monthSelector}>
          {previous}
        </View>

      </View>
    );
  }
}

module.exports = HeaderControls;

