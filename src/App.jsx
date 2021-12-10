import { Component } from 'react';
import Time from 'components/Time/Time';
import TimeControls from 'components/TimeControls/TimeControls';
import { Observable } from 'rxjs';

class App extends Component {
  constructor() {
    super();
    this.state = {
      min: 0,
      sec: 0,
      ms: 0,
      isRunning: false,
      hasStarted: false,
    };
  }
  componentDidMount() {
    const stream$ = new Observable(observer => {
      setInterval(() => {
        if (this.state.isRunning) {
          let ms = this.state.ms;
          let sec = this.state.sec;
          let min = this.state.min;
          if (ms < 100) observer.next({ ms: ms + 1 });
          else observer.next({ sec: sec + 1, ms: 0 });
          if (sec > 59) observer.next({ min: min + 1, sec: 0 });
        }
      }, 10);
    });
    stream$.subscribe(val => {
      if (Object.keys(val).length === 1) {
        this.setState({ ms: val.ms });
      } else {
        if (Object.keys(val)[0] === 'sec') {
          this.setState({ sec: val.sec, ms: 0 });
        } else {
          this.setState({ min: val.min, sec: 0 });
        }
      }
    });
  }
  handleClick(button) {
    let running = this.state.isRunning;
    if (button === 'start' || button === 'wait') {
      this.setState({ isRunning: !running, hasStarted: true });
    } else if (button === 'reset' || button === 'stop') {
      this.setState({ min: 0, sec: 0, ms: 0 });
      this.setState({ isRunning: false, hasStarted: false });
    }
  }
  fNum(e) {
    return e.toLocaleString(undefined, { minimumIntegerDigits: 2 });
  }
  render() {
    return (
      <div className="stopwatch">
        <Time
          min={this.fNum(this.state.min)}
          sec={this.fNum(this.state.sec)}
          ms={this.fNum(this.state.ms)}
        ></Time>
        <TimeControls
          onClick={button => this.handleClick(button)}
          isRunning={this.state.isRunning}
          hasStarted={this.state.hasStarted}
        ></TimeControls>
      </div>
    );
  }
}
export default App;
