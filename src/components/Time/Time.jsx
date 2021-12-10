import PropTypes from 'prop-types';
import s from './Time.module.scss';

function Time(props) {
  return (
    <div className={s.Time}>
      {props.min}:{props.sec}:{props.ms}
    </div>
  );
}

Time.propTypes = {
  props: PropTypes.object.isRequired,
};

export default Time;
