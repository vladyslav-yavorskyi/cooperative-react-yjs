import Cursor from './Cursor';
import Box from './Box';

function DrawArea(props) {
  return (
    <main
      id="draw-area"
      className={`flex-1 relative select-none overflow-hidden h-screen bg-left-top ${
        props.dragState === 'dragging'
          ? 'cursor-grabbing'
          : props.dragState === 'ready'
          ? 'cursor-pointer'
          : ''
      }`}
      onPointerMove={(event) => {
        props.onMoveCursor({ top: event.clientY, left: event.clientX });
      }}
      onPointerUp={(event) => {
        props.onDrawPointerUp({ top: event.clientY, left: event.clientX });
      }}
    >
      {props.boxes.map((box, index) => {
        return (
          <Box
            key={index}
            box={box}
            dragState={props.dragState}
            onDblClick={() => props.onBoxDelete(index)}
            onPointerDown={(evt, type) => {
              props.onBoxPointerDown({
                type,
                index,
                position: { left: evt.clientX, top: evt.clientY },
              });
            }}
          />
        );
      })}
      {props.remoteUsers.map((user, index) => (
        <Cursor
          key={index}
          index={index}
          name={user.name}
          position={user.cursor}
        />
      ))}
    </main>
  );
}

export default DrawArea;
