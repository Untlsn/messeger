import { createSignal } from 'solid-js';
import { io } from 'socket.io-client';

const App = () => {
  const [login, setLogin] = createSignal('');
  const [submittedLogin, setSubmittedLogin] = createSignal('');
  const [value, setValue] = createSignal('');
  const [purpose, setPurpose] = createSignal('')
  const [message, setMessage] = createSignal('');
  const socket = io('ws://localhost:8080')

  socket.on('message', ({ type, payload }) => {
    if (type == 'message') setMessage(`${payload.from}: ${payload.message}`)
  })

  return (
    <div class='flex items-center justify-center flex-col h-screen gap-2'>
      <p>{message()}</p><br />
      <p>{submittedLogin() || 'unknown'}</p><br />
      <input class='border-1' value={login()} onChange={ev => setLogin(ev.currentTarget.value)}/>
      <button onClick={() => {
        socket.emit('message', { type: 'login', payload: login() })
        setSubmittedLogin(login())
        setLogin('');
      }}>Login</button>
      <p>
        <span>To: </span>
        <input value={purpose()} onChange={ev => setPurpose(ev.currentTarget.value)}/>
      </p>
      <input class='border-1' value={value()} onChange={ev => setValue(ev.currentTarget.value)}/>
      <button onClick={() => {
        socket.emit('message', { type: 'message', payload: { message: value(), to: purpose() } })
        setValue('');
      }}>Send Message</button>
    </div>
  );
};

export default App;
