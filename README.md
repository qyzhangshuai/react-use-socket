# usesocket

React [hook](https://reactjs.org/docs/hooks-intro.html)
for [Socket.io Client](https://github.com/socketio/socket.io-client).

Using React Context API.

# Installation

`npm install socket.io-client usesocket`

`yarn add socket.io-client usesocket`

# How to use (example for Next.js)

1) ## `env.local`

Create `env.local` file in the root folder and add the `NEXT_PUBLIC_SOCKET_URI` or `SOCKET_URI` variable:

```dotenv
NEXT_PUBLIC_SOCKET_URI="ws://localhost:443"
```

2) ## `SocketProvider`

Wrap main `<Component/>` with `SocketProvider`.

```typescript jsx
import {SocketProvider} from "usesocket";

const MyApp = ({Component, pageProps}) => (
    <SocketProvider>
        <Component {...pageProps} />
    </SocketProvider>
);
export default MyApp
```

3) ## `useSocket`

The function `useSocket()` returns the `socket` object.

```typescript jsx
import {useSocket} from "usesocket";
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
