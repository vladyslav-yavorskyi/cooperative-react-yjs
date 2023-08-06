import { useRef } from 'react';
import { getBoxData } from '../features/sync';
import { getRPColorFromName } from '../features/color';

function Box(props) {
  const handleRef = useRef(null);
  const { size, position, color } = getBoxData(props.box, [
    'size',
    'position',
    'color',
  ]);

  return (
    <div
      className="absolute flex items-end justify-end rounded top-0 left-0 border border-base"
      onDoubleClick={props.onDblClick}
      onPointerDown={(event) => {
        if (event.target !== handleRef.current) {
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
        transform: `translate(${position.left}px, ${position.top}px)`,
      }}
    >
      <div
        ref={handleRef}
        className="h-3 w-3 rounded-br border-r-2 border-b-2 border-base mb-1 mr-1"
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
