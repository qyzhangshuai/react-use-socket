# react-use-socket
  <a href="https://www.npmjs.com/package/svelte">
    <img src="https://img.shields.io/npm/v/react-use-socket.svg" alt="npm version">
  </a>

React [hook](https://reactjs.org/docs/hooks-intro.html)
for [Socket.io Client](https://github.com/socketio/socket.io-client).

Using React Context API.

# Installation

`npm install socket.io-client react-use-socket`

`yarn add socket.io-client react-use-socket`

# How to use (example for Next.js)

1) ## `.env.local`

( skip this step for default endpoint URI: `ws://localhost:443`)

Create `.env.local` file in the root folder and add the `NEXT_PUBLIC_SOCKET_URI` variable:

```dotenv
NEXT_PUBLIC_SOCKET_URI="ws://localhost:1234"
```

2) ## `SocketProvider`

Wrap main `<Component/>` with `SocketProvider`.

```typescript jsx
import {SocketProvider} from "react-use-socket";

const MyApp = ({Component, pageProps}) => (
    <SocketProvider>
        <Component {...pageProps} />
    </SocketProvider>
);
export default MyApp
```

3) ## `useSocket`

The function `useSocket()` returns an object.

```typescript jsx
import {useSocket} from "react-use-socket";
import {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";

const App = () => {
    const socket = useSocket();

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.on("message", (message: string) => {
            setMessages((state) => [...state, message]);
        });

        return () => {
            socket.off("message", () => {
            });
        };
    }, []);

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const sendMessageHandler = () => socket.emit("message", input);

    const enterInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") socket.emit("message", input);
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => {
                    return <li key={index}>{message}</li>;
                })}
            </ul>
            <input
                value={input}
                placeholder="message"
                onChange={inputHandler}
                onKeyDown={enterInputHandler}
            />
            <button onClick={sendMessageHandler}>Send</button>
        </div>
    );
};
export default App;
```
