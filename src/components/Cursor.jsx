import { getRPColorFromIndex } from '../features/color';

function Cursor(props) {
  return (
    <div
      className="absolute w-5 h-5 top-0 left-0 pointer-events-none"
      style={
        props.position
          ? {
              transform: `translate(${props.position.left}px, ${props.position.top}px)`,
            }
          : { display: 'none' }
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="-rotate-45 drop-shadow"
        viewBox="0 0 32 32"
      >
        <path
          className="stroke-base"
          style={{ fill: getRPColorFromIndex(props.index) }}
          d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z"
        />
      </svg>
      <span className="p-1 text-sm drop-shadow">{props.name}</span>
    </div>
  );
}

export default Cursor;
