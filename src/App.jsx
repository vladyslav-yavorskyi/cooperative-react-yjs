import { IndexeddbPersistence } from 'y-indexeddb';
import OnlineAside from './components/OnlineAside';
import CreateAppState from './state/CreateAppState';
import { WebrtcProvider } from 'y-webrtc';
import { Doc } from 'yjs';
import DrawArea from './components/DrawArea';

const doc = new Doc();
const networkProvider = new WebrtcProvider('syn-global-room', doc, {
  signaling: ['ws:localhost:5173'],
});
new IndexeddbPersistence('syn-global-room', doc);

export default function App() {
  const state = CreateAppState(networkProvider, doc);

  return (
    <div className="flex items-stretch h-screen">
      <DrawArea
        onMoveCursor={state.moveCursor}
        onDrawPointerUp={state.releaseCursor}
        onBoxPointerDown={state.boxCursorDown}
        onBoxDelete={state.boxDelete}
        boxes={state.boxes}
        remoteUsers={state.remoteUsers}
        dragState={
          state.isDragging() ? 'dragging' : state.localUser ? 'ready' : 'none'
        }
      />
      <OnlineAside
        onLogin={state.handleLogin}
        remoteUsers={state.remoteUsers}
        localUser={state.localUser}
      />
    </div>
  );
}
