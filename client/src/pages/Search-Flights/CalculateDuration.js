function CalculateDuration(props) {
  let returnduration = "";

  let hours = Math.floor(props / 60 / 60);
  let minutes = Math.floor(props / 60)  - (hours * 60);
  if (minutes < 10 ) minutes = "0" + minutes;

  if (hours > 20) {
    returnduration = -1;
  } else {
    returnduration = hours + ":" + minutes
  }

  return returnduration;
}

export default CalculateDuration;
