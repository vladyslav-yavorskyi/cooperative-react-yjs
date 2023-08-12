const helperResize = (box, newPosition, position) => {
  const boxSize = box.get('size');
  const boxPosition = box.get('position');
  const { rotation } = box.get('rotate');

  const pureAngle = rotation < 0 ? 360 + (rotation % 360) : rotation % 360;

  if (135 < pureAngle && pureAngle <= 225) {
    box.set('size', {
      height: Math.max(50, boxSize.height - (newPosition.top - position.top)),
      width: Math.max(50, boxSize.width - (newPosition.left - position.left)),
    });

    box.set('position', {
      top:
        boxSize.height === 50
          ? boxPosition.top
          : boxPosition.top + (newPosition.top - position.top),
      left:
        boxSize.width === 50
          ? boxPosition.left
          : boxPosition.left + (newPosition.left - position.left),
    });
  } else if (45 < pureAngle && pureAngle <= 135) {
    box.set('size', {
      height: Math.max(50, boxSize.height - (newPosition.left - position.left)),
      width: Math.max(50, boxSize.width + (newPosition.top - position.top)),
    });

    box.set('position', {
      top:
        boxSize.height === 50
          ? boxPosition.top
          : boxPosition.top +
            (newPosition.top - position.top) / 2 +
            (newPosition.left - position.left) / 2,
      left:
        boxSize.width === 50
          ? boxPosition.left
          : boxPosition.left +
            (newPosition.left - position.left) / 2 -
            (newPosition.top - position.top) / 2,
    });
  } else if (225 < pureAngle && pureAngle <= 315) {
    box.set('size', {
      height: Math.max(50, boxSize.height + (newPosition.left - position.left)),
      width: Math.max(50, boxSize.width - (newPosition.top - position.top)),
    });

    box.set('position', {
      top:
        boxSize.width === 50
          ? boxPosition.top
          : boxPosition.top +
            (newPosition.top - position.top) / 2 -
            (newPosition.left - position.left) / 2,
      left:
        boxSize.height === 50
          ? boxPosition.left
          : boxPosition.left +
            (newPosition.left - position.left) / 2 +
            (newPosition.top - position.top) / 2,
    });
  } else {
    box.set('size', {
      height: Math.max(50, boxSize.height + newPosition.top - position.top),
      width: Math.max(50, boxSize.width + newPosition.left - position.left),
    });
  }
};

export default helperResize;
