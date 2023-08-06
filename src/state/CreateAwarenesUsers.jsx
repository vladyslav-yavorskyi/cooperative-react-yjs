import { useEffect, useState } from 'react';

const usersFromAwareness = (awareness) => {
  const { clientID } = awareness;

  return {
    getLocalUser: () => {
      const local = awareness.getLocalState();
      return local.name ? local : null;
    },
    getRemoteUsers: () => {
      return Array.from(awareness.getStates().entries())
        .flatMap(([key, value]) =>
          key !== clientID && value.name ? [value] : []
        )
        .sort((a, b) => a.joinedOn - b.joinedOn);
    },
  };
};

export default function CreateAwarenessUsers({ awareness }) {
  const { getLocalUser, getRemoteUsers } = usersFromAwareness(awareness);
  const [localUser, setLocalUser] = useState(getLocalUser());
  const [remoteUsers, setRemoteUsers] = useState(getRemoteUsers());

  useEffect(() => {
    const handler = (_changes, event) => {
      if (event === 'local') {
        setLocalUser(getLocalUser());
      } else {
        setRemoteUsers(getRemoteUsers());
      }
    };
    awareness.on('change', handler);
    return () => {
      awareness.off('change', handler);
    };
  }, [awareness, getLocalUser, getRemoteUsers]);

  return {
    localUser,
    remoteUsers,
    handleCursorPositionChange(newPosition) {
      awareness.setLocalStateField('cursor', newPosition);
    },
    handleLogin(name) {
      awareness.setLocalState({
        ...awareness.getLocalState(),
        name,
        joinedOn: Date.now(),
      });
    },
  };
}
