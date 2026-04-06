import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Check,
  CheckCheck,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'alokesh';
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

function pickRandom(items: string[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function ensureYaar(text: string) {
  const cleaned = text.trim();
  if (/\byaar\b/i.test(cleaned)) return cleaned;
  return `yaar ${cleaned}`;
}

function getAlokeshResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  if (/^(hi|hello|hey|hii|helloo|yo|sup)$/.test(msg)) {
    return pickRandom([
      'haan yaar bolo',
      'yaar kya haal hai',
      'aa gaya yaar tu',
      'bol na yaar kya scene hai'
    ]);
  }

  if (msg.includes('kya kr') || msg.includes('kya kar') || msg.includes('kya ho rha')) {
    return pickRandom([
      'kuch khaas nahi yaar tu bata',
      'bas yaar aise hi tha',
      'tere text ka wait tha yaar',
      'kuch nahi yaar chill kar raha tha'
    ]);
  }

  if (msg.includes('kaise ho') || msg.includes('kaisa hai') || msg.includes('kaisa h') || msg.includes('kesa h')) {
    return pickRandom([
      'main theek hu yaar tu suna',
      'haan yaar ab better hu',
      'theek hi hu yaar',
      'tera msg dekh ke achha laga yaar'
    ]);
  }

  if (msg.includes('naam') || msg.includes('tu kon') || msg.includes('tum kon') || msg.includes('who are you') || msg.includes('who r u')) {
    return pickRandom([
      'Alokesh hu main yaar',
      'main hi hu yaar Alokesh',
      'Alokesh yaar aur kaun',
      'tera hi banda hu yaar Alokesh'
    ]);
  }

  if (msg.includes('sad') || msg.includes('upset') || msg.includes('dukhi') || msg.includes('tension') || msg.includes('stress') || msg.includes('pareshan') || msg.includes('mann nahi')) {
    return pickRandom([
      'kya hua yaar bata na',
      'aaja yaar bol kya chal raha hai',
      'itna mat soch yaar sab theek ho jayega',
      'bol de yaar dil halka ho jayega'
    ]);
  }

  if (msg.includes('miss') || msg.includes('yaad')) {
    return pickRandom([
      'mujhe bhi teri yaad aati hai yaar',
      'haan yaar miss kiya maine bhi',
      'tu yaad aaya tha yaar sach me',
      'miss kiya kya yaar'
    ]);
  }

  if (msg.includes('love') || msg.includes('pyar') || msg.includes('pyaar') || msg.includes('crush') || msg.includes('gf') || msg.includes('date') || msg.includes('dil')) {
    return pickRandom([
      'bata na yaar kya chal raha hai',
      'dil wali baat hai kya yaar',
      'samajh raha hu yaar',
      'seedha bol yaar kya feel ho raha hai'
    ]);
  }

  if (msg.includes('mil') || msg.includes('meet') || msg.includes('plan') || msg.includes('ghumne') || msg.includes('hang')) {
    return pickRandom([
      'haan yaar dekhte hain',
      'scene bana toh milte hain yaar',
      'bol kab free hai yaar',
      'theek hai yaar plan karte hain'
    ]);
  }

  if (msg.includes('khana') || msg.includes('food') || msg.includes('bhook') || msg.includes('kha')) {
    return pickRandom([
      'kuch kha le pehle yaar',
      'bhook lagi hai kya yaar',
      'khana mat skip kar yaar',
      'kya khayega yaar'
    ]);
  }

  if (msg.includes('padhai') || msg.includes('study') || msg.includes('exam') || msg.includes('test') || msg.includes('learn') || msg.includes('seekhna')) {
    return pickRandom([
      'basics se start kar yaar',
      'haan yaar dheere dheere ho jayega',
      'tension mat le yaar kar lega',
      'consistency rakh yaar bas'
    ]);
  }

  if (msg.includes('trading') || msg.includes('stock') || msg.includes('invest') || msg.includes('paisa') || msg.includes('job') || msg.includes('career')) {
    return pickRandom([
      'pehle basics samajh yaar',
      'risk samajh ke chal yaar',
      'seekh lega tu yaar',
      'jaldi mat kar yaar warna paisa ud jayega'
    ]);
  }

  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('shukriya') || msg.includes('ty') || msg.includes('tnx')) {
    return pickRandom([
      'arey yaar isme kya',
      'koi na yaar',
      'theek hai yaar',
      'formal mat ho yaar'
    ]);
  }

  if (msg.includes('bye') || msg.includes('gn') || msg.includes('good night') || msg.includes('sleep') || msg.includes('so ja') || msg.includes('rest')) {
    return pickRandom([
      'theek hai yaar so ja',
      'good night yaar',
      'chal yaar baad me baat karte hain',
      'rest kar yaar'
    ]);
  }

  if (msg.includes('help') || msg.includes('madad') || msg.includes('problem') || msg.includes('issue')) {
    return pickRandom([
      'haan yaar bol kya help chahiye',
      'bata yaar problem kya hai',
      'theek hai yaar dekhte hain',
      'bol yaar solve karte hain'
    ]);
  }

  if (msg.includes('thak') || msg.includes('tired') || msg.includes('thakan')) {
    return pickRandom([
      'thoda rest kar le yaar',
      'bahut thak gaya kya yaar',
      'so ja yaar ya thoda let ja',
      'khud ka bhi dhyan rakh yaar'
    ]);
  }

  if (msg.includes('happy') || msg.includes('khush') || msg.includes('good news') || msg.includes('excited')) {
    return pickRandom([
      'achha hai yaar',
      'wah yaar sahi hai',
      'mast yaar ye toh badiya hai',
      'ye sun ke achha laga yaar'
    ]);
  }

  const defaults = [
    'samajh gaya yaar',
    'haan yaar bolo',
    'theek hai yaar',
    'fir kya hua yaar',
    'achha yaar',
    'haan yaar sahi',
    'bol na yaar',
    'main sun raha hu yaar',
    'samjha yaar',
    'seedha bol yaar'
  ];

  return ensureYaar(pickRandom(defaults));
}

function getCurrentTime(): string {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}

function ChatBubble({ msg }: { msg: Message }) {
  const isUser = msg.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-2`}>
      <div className="relative max-w-[82%]">
        <div
          className={`relative rounded-lg px-3 py-1.5 shadow-sm ${
            isUser ? 'bg-[#005c4b] text-[#e9edef]' : 'bg-[#202c33] text-[#e9edef]'
          }`}
          style={{
            borderTopLeftRadius: isUser ? 8 : 2,
            borderTopRightRadius: isUser ? 2 : 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8
          }}
        >
          <span
            className={`absolute top-0 h-3 w-3 ${isUser ? '-right-1 bg-[#005c4b]' : '-left-1 bg-[#202c33]'}`}
            style={{ clipPath: isUser ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(100% 0, 100% 100%, 0 0)' }}
          />

          <p className="break-words pr-14 text-[14px] leading-[19px]">{msg.text}</p>
          <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-[#8696a0]">
            <span>{msg.time}</span>
            {isUser && (
              <span>
                {msg.status === 'read' ? (
                  <CheckCheck className="h-4 w-4 text-[#53bdeb]" />
                ) : msg.status === 'delivered' ? (
                  <CheckCheck className="h-4 w-4 text-[#8696a0]" />
                ) : (
                  <Check className="h-4 w-4 text-[#8696a0]" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMessage: Message = {
      id: Date.now(),
      text: trimmed,
      sender: 'user',
      time: getCurrentTime(),
      status: 'sent'
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg)));
    }, 300);

    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: 'read' } : msg)));
    }, 700);

    const replyDelay = 850 + Math.random() * 850;
    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        text: getAlokeshResponse(trimmed),
        sender: 'alokesh',
        time: getCurrentTime(),
        status: 'read'
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, response]);
    }, replyDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#111b21] text-white">
      <div className="mx-auto flex h-screen max-w-md flex-col overflow-hidden border-x border-white/5 bg-[#0b141a] shadow-2xl">
        <header className="flex items-center justify-between bg-[#202c33] px-3 py-2.5">
          <div className="flex items-center gap-3">
            <button className="text-[#d1d7db]">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-[#00a884] to-[#0b5c4b] ring-1 ring-white/10">
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">A</div>
            </div>
            <div>
              <div className="text-[15px] font-medium text-[#e9edef]">Alokesh</div>
              <div className="text-xs text-[#8696a0]">{isTyping ? 'typing...' : 'online'}</div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-[#d1d7db]">
            <Video className="h-[19px] w-[19px]" />
            <Phone className="h-[19px] w-[19px]" />
            <MoreVertical className="h-[19px] w-[19px]" />
          </div>
        </header>

        <main
          className="flex-1 overflow-y-auto bg-[#0b141a] py-3"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.03) 2px, transparent 0), radial-gradient(circle at 55px 55px, rgba(255,255,255,0.02) 2px, transparent 0), linear-gradient(rgba(17,27,33,0.82), rgba(17,27,33,0.82)), url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 80 80\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23202c33\' fill-opacity=\'0.55\'%3E%3Cpath d=\'M50 50c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm-6 0a4 4 0 11-8 0 4 4 0 018 0zm6-30V8h-4v12H34v4h12v12h4V24h12v-4H50zM20 46v-4h-8v4H0v4h12v12h8V50h12v-4H20z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '80px 80px, 80px 80px, cover, 80px 80px'
          }}
        >
          <div className="mb-3 flex justify-center px-3">
            <div className="rounded-md bg-[#182229] px-3 py-1 text-[11px] text-[#8696a0] shadow-sm">Today</div>
          </div>

          {messages.length === 0 && (
            <div className="flex h-full min-h-[55vh] items-center justify-center px-8 text-center text-sm text-[#8696a0]">
              yaar text kar na, main yahi hu
            </div>
          )}

          <div className="space-y-1.5">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} msg={msg} />
            ))}
          </div>

          {isTyping && (
            <div className="mt-1 flex justify-start px-2">
              <div className="relative rounded-lg rounded-tl-sm bg-[#202c33] px-4 py-3 shadow-sm">
                <span
                  className="absolute -left-1 top-0 h-3 w-3 bg-[#202c33]"
                  style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
                />
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-[#8696a0]" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-[#8696a0]" style={{ animationDelay: '120ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-[#8696a0]" style={{ animationDelay: '240ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </main>

        <footer className="bg-[#111b21] px-2 py-2">
          <div className="flex items-end gap-2">
            <div className="flex flex-1 items-center gap-3 rounded-3xl bg-[#202c33] px-3 py-2.5 text-[#8696a0]">
              <Smile className="h-5 w-5 shrink-0" />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Message"
                className="w-full bg-transparent text-[15px] text-[#e9edef] outline-none placeholder:text-[#8696a0]"
              />
              <Paperclip className="h-5 w-5 shrink-0" />
              <Camera className="h-5 w-5 shrink-0" />
            </div>

            <button
              onClick={sendMessage}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00a884] text-white transition hover:bg-[#06b48f]"
            >
              {inputText.trim() ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
