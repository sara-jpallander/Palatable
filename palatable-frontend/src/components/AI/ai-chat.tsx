import { useState, useRef, useEffect } from 'react'

interface Message {
    role: 'user' | 'ai';
    content: string;
}

const AIchat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage: Message = { role: 'user', content: message };
        setChatHistory(prev => [...prev, userMessage]);
        setMessage('');
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:3008/ai/suggest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                })
            });

            const data = await res.json();
            
            // Handle the response format from the backend
            // The backend returns { suggestions: [...] }
            let aiReply = "";
            if (data.suggestions && Array.isArray(data.suggestions)) {
                aiReply = "Här är några förslag:\n" + data.suggestions.map((s: any) => 
                    `- ${s.name}: ${s.reason}`
                ).join('\n');
            } else {
                aiReply = "Jag kunde tyvärr inte hitta några bra förslag just nu.";
            }

            const aiMessage: Message = { role: 'ai', content: aiReply };
            setChatHistory(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { role: 'ai', content: "Hoppsan! Något gick fel när jag försökte hämta förslag." };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <div className='ai-chat-wrapper'>
            {isOpen && (
                <div className='ai-chat-window'>
                    <div className='ai-chat-header'>
                        <h3>Palatable AI</h3>
                        <button onClick={() => setIsOpen(false)} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '2rem'}}>×</button>
                    </div>
                    <div className='ai-chat-messages'>
                        {chatHistory.length === 0 && (
                            <div className='message ai'>
                                Hej! Jag är din Palatable-assistent. Vad letar du efter för färger eller stämning idag?
                            </div>
                        )}
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                {msg.content}
                            </div>
                        ))}
                        {isLoading && <div className='message ai'>Tänker...</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className='ai-chat-input-area'>
                        <input 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            onKeyPress={handleKeyPress}
                            placeholder="Skriv något..."
                            disabled={isLoading}
                        />
                        <button onClick={sendMessage} disabled={isLoading || !message.trim()}>
                            Sänd
                        </button>
                    </div>
                </div>
            )}
            <button className='ai-chat-button' onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '↓' : '✨'}
            </button>
        </div>
    )
}

export default AIchat
