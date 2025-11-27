import React, { useState, useEffect, useRef } from 'react';
import { VscSend, VscSparkle } from 'react-icons/vsc';
import phdStudents from '../../data/phd_students.json';
import publications from '../../data/publications.json';

const CopilotChat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your Portfolio Copilot. Ask me anything about Karim's work, research, or teaching!", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            const responseText = generateResponse(userMessage.text);
            const aiMessage = { id: Date.now() + 1, text: responseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const generateResponse = (text) => {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('who') || lowerText.includes('karim')) {
            return "Karim Anaya-Izquierdo is a Senior Lecturer in Statistics at the University of Bath. He specializes in statistical modelling and data science.";
        }

        if (lowerText.includes('publication') || lowerText.includes('paper') || lowerText.includes('research')) {
            const count = publications.length;
            const recent = publications.slice(0, 3).map(p => `'${p.title}'`).join(", ");
            return `Karim has ${count} publications. The most recent ones are: ${recent}. You can see the full list in the 'Research' folder.`;
        }

        if (lowerText.includes('teach') || lowerText.includes('course')) {
            return "Karim teaches various statistics courses. Check out the 'Teaching' folder for notebooks on his current and previous courses.";
        }

        if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('reach')) {
            return "You can find Karim's contact details and social links in the 'Accounts' menu (bottom left icon).";
        }

        if (lowerText.includes('project') || lowerText.includes('work')) {
            return "Karim is involved in several exciting projects like 'CerTest' and 'GKN Prosperity'. You can view the HTML files in the 'Research/Projects' folder.";
        }

        if (lowerText.includes('student') || lowerText.includes('phd')) {
            const studentNames = phdStudents.map(s => s.name).join(", ");
            return `Karim supervises several PhD students, including: ${studentNames}. Check the 'phd_students.html' page for more details!`;
        }

        if (lowerText.includes('hello') || lowerText.includes('hi')) {
            return "Hello! How can I help you explore this portfolio today?";
        }

        return "I'm tuned to answer questions about Karim's academic work. Try asking about his 'research', 'teaching', or 'projects'!";
    };

    return (
        <div className="d-flex flex-column h-100" style={{ backgroundColor: 'var(--vscode-sidebar-bg)', color: 'var(--vscode-foreground)' }}>
            {/* Header */}
            <div className="px-3 py-2 d-flex align-items-center gap-2" style={{ borderBottom: '1px solid var(--vscode-border)', fontWeight: 'bold', fontSize: '11px' }}>
                <VscSparkle /> COPILOT CHAT
            </div>

            {/* Messages Area */}
            <div className="flex-grow-1 p-3" style={{ overflowY: 'auto', fontSize: '13px' }}>
                {messages.map(msg => (
                    <div key={msg.id} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                        <div style={{
                            maxWidth: '85%',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: msg.sender === 'user' ? 'var(--vscode-button-background)' : 'var(--vscode-editor-bg)',
                            color: msg.sender === 'user' ? 'var(--vscode-button-foreground)' : 'var(--vscode-foreground)',
                            border: msg.sender === 'ai' ? '1px solid var(--vscode-border)' : 'none'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="d-flex justify-content-start mb-3">
                        <div style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--vscode-editor-bg)',
                            border: '1px solid var(--vscode-border)',
                            color: 'var(--vscode-descriptionForeground)',
                            fontStyle: 'italic'
                        }}>
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3" style={{ borderTop: '1px solid var(--vscode-border)' }}>
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about Karim's work..."
                        style={{
                            flexGrow: 1,
                            backgroundColor: 'var(--vscode-input-background)',
                            color: 'var(--vscode-input-foreground)',
                            border: '1px solid var(--vscode-input-border)',
                            padding: '6px 8px',
                            borderRadius: '2px',
                            outline: 'none',
                            fontSize: '13px'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        style={{
                            backgroundColor: 'var(--vscode-button-background)',
                            color: 'var(--vscode-button-foreground)',
                            border: 'none',
                            borderRadius: '2px',
                            padding: '0 8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <VscSend />
                    </button>
                </div>

                {/* Suggested Questions */}
                <div className="mt-3">
                    <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', opacity: 0.8 }}>Suggested Questions:</div>
                    <div className="d-flex flex-wrap gap-2">
                        {[
                            "Who is Karim?",
                            "What are his publications?",
                            "Tell me about the CerTest project",
                            "What courses does he teach?",
                            "How can I contact him?"
                        ].map((q, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setInput(q);
                                    // Optional: Auto-send or just populate input
                                }}
                                style={{
                                    fontSize: '11px',
                                    backgroundColor: 'var(--vscode-badge-background)',
                                    color: 'var(--vscode-badge-foreground)',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    border: '1px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--vscode-button-hoverBackground)';
                                    e.currentTarget.style.border = '1px solid var(--vscode-focusBorder)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--vscode-badge-background)';
                                    e.currentTarget.style.border = '1px solid transparent';
                                }}
                            >
                                {q}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ fontSize: '10px', color: 'var(--vscode-descriptionForeground)', marginTop: '12px', textAlign: 'center' }}>
                    AI responses are simulated based on portfolio content.
                </div>
            </div>
        </div>
    );
};

export default CopilotChat;
