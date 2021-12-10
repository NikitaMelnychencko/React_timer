import PropTypes from 'prop-types';
import { fromEvent } from 'rxjs';
import { map, buffer, filter, debounceTime } from 'rxjs/operators';
import s from './TimeControls.module.scss';

function TimeControls(props) {
  let name = '';
  if (props.isRunning) {
    name = 'stop';
  } else {
    name = 'start';
  }
  const click$ = fromEvent(document.body, 'click');
  const doubleClick$ = click$.pipe(
    buffer(click$.pipe(debounceTime(300))),
    map(clicks => clicks.length),
    filter(clicksLength => clicksLength >= 2),
  );

  const dupleClick = () => {
    doubleClick$.subscribe(e => {
      props.onClick('wait');
    });
  };

  return (
    <div className={s.ControlButtons}>
      <button onClick={() => props.onClick(name)}>
        {props.isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => dupleClick()}>Wait</button>
      <button onClick={() => props.onClick('reset')}>Reset</button>
    </div>
  );
}

TimeControls.propTypes = {
  props: PropTypes.object.isRequired,
};

export default TimeControls;
