import { useState } from 'react';
import CreateAwarenessUsers from './CreateAwarenesUsers';
import { CreateSyncArray } from '../features/sync';
import { Map as YMap } from 'yjs';
import { getRandomRPColorName } from '../features/color';
import helperResize from './helperResize';

export default function CreateAppState(networkProvider, doc) {
  const [draggingBoxPosition, setDraggingBoxPosition] = useState(null);
  const { localUser, remoteUsers, handleLogin, handleCursorPositionChange } =
    CreateAwarenessUsers(networkProvider);

  const boxes = doc.getArray('boxes');

  return {
    localUser: localUser,
    remoteUsers: remoteUsers,
    handleLogin: handleLogin,
    boxes: CreateSyncArray(boxes),
    isDragging: () => Boolean(draggingBoxPosition),
    boxCursorDown: (newDraggingPosition) => {
      if (localUser) {
        setDraggingBoxPosition(newDraggingPosition);
      }
    },
    boxDelete(index) {
      if (localUser) {
        setDraggingBoxPosition(null);
        boxes.delete(index);
      }
    },
    moveCursor(newPosition) {
      handleCursorPositionChange(newPosition);
      if (!localUser) {
        return;
      }
      const draggingPos = draggingBoxPosition;
      if (!draggingPos) {
        return;
      }
      const { index, position, type } = draggingPos;
      const box = boxes.get(index);
      if (type === 'move') {
        const boxPosition = box.get('position');
        box.set('position', {
          top: boxPosition.top + newPosition.top - position.top,
          left: boxPosition.left + newPosition.left - position.left,
        });
      } else if (type === 'resize') {
        helperResize(box, newPosition, position);
        // const boxSize = box.get('size');
        // const boxPosition = box.get('position');

        // box.set('size', {
        //   height: Math.max(
        //     50,
        //     boxSize.height - (newPosition.top - position.top)
        //   ),
        //   width: Math.max(
        //     50,
        //     boxSize.width - (newPosition.left - position.left)
        //   ),
        // });
        // if (boxSize.width === 50 && boxSize.height === 50) {
        //   console.log(boxSize);
        //   return;
        // }
        // box.set('position', {
        //   top:
        //     boxSize.height === 50
        //       ? boxPosition.top
        //       : boxPosition.top + (newPosition.top - position.top),
        //   left:
        //     boxSize.width === 50
        //       ? boxPosition.left
        //       : boxPosition.left + (newPosition.left - position.left),
        // });
      } else if (type === 'rotate') {
        const boxRotate = box.get('rotate');
        box.set('rotate', {
          rotation: boxRotate.rotation + (newPosition.left - position.left),
        });
      }

      setDraggingBoxPosition({ type, index, position: newPosition });
    },
    releaseCursor(position) {
      if (!localUser) {
        return;
      } else if (draggingBoxPosition) {
        return setDraggingBoxPosition(null);
      }
      boxes.push([
        new YMap([
          ['position', position],
          ['size', { width: 100, height: 100 }],
          ['color', getRandomRPColorName()],
          ['rotate', { rotation: 0 }],
        ]),
      ]);
    },
  };
}
