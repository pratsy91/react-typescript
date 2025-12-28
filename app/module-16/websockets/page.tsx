import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function WebSocketsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        WebSockets TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        WebSocket events and messages can be typed for type-safe real-time
        communication.
      </p>

      <Section title="1. Typing Socket Events and Messages">
        <p className="text-gray-700 dark:text-gray-300">
          WebSocket events and messages can be typed with TypeScript
          interfaces.
        </p>

        <CodeBlock title="Typed WebSocket Client">
          {`// Typed WebSocket message types
type SocketEvent = 
  | { type: 'message'; data: ChatMessage }
  | { type: 'user_joined'; data: { userId: string; username: string } }
  | { type: 'user_left'; data: { userId: string } }
  | { type: 'error'; data: { message: string } };

interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
}

// Typed WebSocket hook
function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<SocketEvent | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  
  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      setReadyState(ws.readyState);
    };
    
    ws.onmessage = (event) => {
      const message: SocketEvent = JSON.parse(event.data);
      setLastMessage(message);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      setReadyState(ws.readyState);
    };
    
    setSocket(ws);
    
    return () => {
      ws.close();
    };
  }, [url]);
  
  const sendMessage = (message: SocketEvent) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };
  
  return {
    socket,
    lastMessage,
    readyState,
    sendMessage,
  };
}

// Usage
function ChatComponent() {
  const { lastMessage, sendMessage } = useWebSocket('ws://localhost:8080');
  
  useEffect(() => {
    if (lastMessage?.type === 'message') {
      console.log('New message:', lastMessage.data);
    }
  }, [lastMessage]);
  
  const handleSend = (text: string) => {
    sendMessage({
      type: 'message',
      data: {
        id: Date.now().toString(),
        userId: 'current-user-id',
        text,
        timestamp: Date.now(),
      },
    });
  };
  
  return <div>{/* chat UI */}</div>;
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>WebSocket messages are typed with union types</li>
          <li>Socket events support typed data payloads</li>
          <li>WebSocket hooks provide typed message handling</li>
          <li>Send functions are typed with message interfaces</li>
        </ul>
      </InfoBox>
    </div>
  );
}

