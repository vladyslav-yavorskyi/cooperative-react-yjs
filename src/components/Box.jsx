import { useRef } from 'react';
import { getBoxData } from '../features/sync';
import { getRPColorFromName } from '../features/color';

function Box(props) {
  const handleRef = useRef(null);
  const rotateRef = useRef(null);
  const { size, position, color, rotate } = getBoxData(props.box, [
    'size',
    'position',
    'color',
    'rotate',
  ]);

  return (
    <div
      className="absolute  rounded"
      onDoubleClick={props.onDblClick}
      onPointerDown={(event) => {
        if (
          event.target !== handleRef.current &&
          event.target !== rotateRef.current
        ) {
          props.onPointerDown(event, 'move');
        }
      }}
      style={{
        cursor:
          props.dragState === 'dragging'
            ? 'grabbing'
            : props.dragState === 'ready'
            ? 'grab'
            : undefined,
        backgroundColor: getRPColorFromName(color),
        width: `${size.width}px`,
        height: `${size.height}px`,
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: `rotate(${rotate.rotation}deg)`,
      }}
    >
      <div
        ref={rotateRef}
        className="absolute h-4 w-4 rounded-full border-white-800 border-2 top-0 left-[50%] -translate-x-1/2   mt-1"
        style={{
          cursor: props.dragState === 'none' ? undefined : 'pointer',
        }}
        onPointerDown={(event) => {
          props.onPointerDown(event, 'rotate');
        }}
      ></div>
      <div
        ref={handleRef}
        className=" absolute h-3 w-3 rounded-br border-r-2 border-b-2 border-base mb-1 mr-1 right-0 bottom-0"
        style={{
          cursor: props.dragState === 'none' ? undefined : 'se-resize',
        }}
        onPointerDown={(event) => {
          props.onPointerDown(event, 'resize');
        }}
      />
    </div>
  );
}

export default Box;
