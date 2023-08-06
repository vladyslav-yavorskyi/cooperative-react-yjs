function OnlineAside(props) {
  return (
    <aside className="flex flex-col gap-4 py-4 px-3 w-2/12 bg-rp-surface">
      <h1 className="text-3xl font-bold text-red-200">Who is online?</h1>
      {!props.localUser && (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            const data = new FormData(evt.target);
            const username = data.get('username') || '';
            props.onLogin(username.toString());
          }}
        >
          <label htmlFor="login-username" className="block mb-2 font-semibold">
            Username
          </label>
          <input
            type="text"
            className="block mb-2 py-2 px-3 bg-rp-overlay rounded"
            id="login-username"
            name="username"
            required
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Login
          </button>
        </form>
      )}
      <ul className="flex-1 list-disc list-inside overflow-y-auto">
        {props.localUser && (
          <li>
            {props.localUser.name}
            <span className="italic"> (you)</span>
          </li>
        )}
        {props.remoteUsers.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </aside>
  );
}

export default OnlineAside;
