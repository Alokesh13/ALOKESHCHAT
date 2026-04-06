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

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function chance(value: number) {
  return Math.random() < value;
}

function sanitizeReply(text: string) {
  return text.trim().replace(/^yaar\s+/i, '').replace(/\s+/g, ' ');
}

function maybePrefixYaar(text: string) {
  const cleaned = sanitizeReply(text);
  return chance(0.8) ? `yaar ${cleaned}` : cleaned;
}

function maybeEmoji(text: string) {
  const cleaned = text.trim();
  if (/[😂🥲😌🙃😅🤦‍♂️💀✨🙂❤️]/u.test(cleaned)) return cleaned;
  return chance(0.22) ? `${cleaned} ${pickRandom(['🙂', '😂', '🥲', '😌', '🙃', '😅', '💀'])}` : cleaned;
}

function makeReply(options: string[]) {
  return maybeEmoji(maybePrefixYaar(pickRandom(options)));
}

function getAlokeshResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  const patterns: Array<{ test: boolean; replies: string[] }> = [
    {
      test: /^(hi|hii|hello|hey|heyy|yo|sup|hola|oy)$/.test(msg),
      replies: [
        'haan bolo kya scene hai',
        'aa gaya tu, bol ab',
        'kya haal bana rakha hai',
        'haan sun raha hu',
        'bol bhai kya kaam hai',
        'achha finally yaad aaya'
      ]
    },
    {
      test: msg.includes('good morning') || msg.includes('gm') || msg.includes('subah'),
      replies: [
        'good morning, uth gaya kya finally',
        'subah subah yaad kar liya tune',
        'haan good morning, chai pi ya bas hawa pe chal raha hai',
        'morning, aaj zinda lag raha hai'
      ]
    },
    {
      test: msg.includes('good night') || msg.includes('gn') || msg.includes('so ja') || msg.includes('sleep'),
      replies: [
        'theek hai ab so ja, warna kal zombie banega',
        'good night, phone side me rakh ab',
        'chal soja shanti se',
        'rest le, dimag ko bhi off de thoda'
      ]
    },
    {
      test: msg.includes('kya kar') || msg.includes('kya kr') || msg.includes('kya ho rha') || msg.includes('wyd'),
      replies: [
        'kuch khas nahi, tu bol',
        'bas chill kar raha tha, ab tu aa gaya',
        'tere text ka wait nahi kar raha tha, but aa gaya toh theek hai',
        'bas zinda hu aur kya'
      ]
    },
    {
      test: msg.includes('kaise ho') || msg.includes('kaisa hai') || msg.includes('kaisa h') || msg.includes('kesa h') || msg.includes('how are you'),
      replies: [
        'main theek hu, tu suna',
        'abhi tak toh bacha hua hu',
        'theek hi hu, overthink mat kar',
        'tera msg dekh ke better lag raha hai'
      ]
    },
    {
      test: msg.includes('miss') || msg.includes('yaad'),
      replies: [
        'mujhe bhi teri yaad aayi thi',
        'haan theek hai, thoda miss toh kiya maine bhi',
        'achha, itna yaad aa raha tha kya',
        'yaad kiya toh text bhi kar diya kar'
      ]
    },
    {
      test: msg.includes('love') || msg.includes('pyar') || msg.includes('pyaar') || msg.includes('crush') || msg.includes('dil') || msg.includes('relationship') || msg.includes('gf') || msg.includes('bf'),
      replies: [
        'dil ka mamla lag raha hai, seedha bol',
        'achha toh scene idhar chal raha hai',
        'pyaar me logic kam hi chalta hai waise',
        'tu phas gaya kya halka sa',
        'ye sab dangerous area hai, sambhal ke'
      ]
    },
    {
      test: msg.includes('breakup') || msg.includes('heartbreak') || msg.includes('chod diya') || msg.includes('ignore kar'),
      replies: [
        'dard hua hoga, jhoot nahi bolunga',
        'jo gaya usko jaane de, tu khud ko sambhal pehle',
        'thoda time lagega but nikal jayega isse',
        'dil tootna bakwaas hota hai, par tu theek ho jayega'
      ]
    },
    {
      test: msg.includes('sad') || msg.includes('dukhi') || msg.includes('upset') || msg.includes('low') || msg.includes('tension') || msg.includes('stress') || msg.includes('pareshan') || msg.includes('mann nahi'),
      replies: [
        'kya hua, bol na aaram se',
        'andar mat rakh sab, nikal de',
        'itna pressure mat le, tu machine nahi hai',
        'main hu na, bol kya chal raha hai',
        'sab ek saath dimag pe aa gaya kya'
      ]
    },
    {
      test: msg.includes('happy') || msg.includes('khush') || msg.includes('good news') || msg.includes('excited') || msg.includes('finally'),
      replies: [
        'wah ye toh sahi hai',
        'achha hua, warna tu fir drama karta',
        'mast, ye sun ke mood theek ho gaya',
        'badiya, chalo kuch toh sahi hua'
      ]
    },
    {
      test: msg.includes('angry') || msg.includes('gussa') || msg.includes('irritate') || msg.includes('annoy'),
      replies: [
        'pehle pani pi le, fir gaali dena',
        'gussa me text mat kar, ulta scene ho jayega',
        'kisne dimag khaya ab',
        'haan theek hai, naam bata fir milke judge karte hain'
      ]
    },
    {
      test: msg.includes('help') || msg.includes('madad') || msg.includes('problem') || msg.includes('issue') || msg.includes('solve'),
      replies: [
        'haan bol, kya atka hua hai',
        'problem bata seedha, gol gol mat ghoom',
        'dekhte hain, kuch na kuch jugad nikalta hai',
        'theek hai, ab detail me bol'
      ]
    },
    {
      test: msg.includes('mil') || msg.includes('meet') || msg.includes('plan') || msg.includes('hangout') || msg.includes('ghumne') || msg.includes('bahar'),
      replies: [
        'haan dekhte hain, scene bana toh nikalte hain',
        'bol kab free hai tu',
        'plan bana, last moment pe bhaag mat jana',
        'mil lenge, bas is baar pakka bolna'
      ]
    },
    {
      test: msg.includes('khana') || msg.includes('food') || msg.includes('bhook') || msg.includes('kha liya') || msg.includes('eat') || msg.includes('lunch') || msg.includes('dinner'),
      replies: [
        'pehle kuch kha le, phir duniya bacha lena',
        'bhook me insaan philosopher bhi irritate ho jata hai',
        'khaana skip mat kar, hero nahi ban raha tu',
        'kya khaya fir, ya sirf soch raha hai'
      ]
    },
    {
      test: msg.includes('chai') || msg.includes('coffee'),
      replies: [
        'chai ho toh mood alag hi set hota hai',
        'coffee pe chal raha hai kya system',
        'ek cup mil jaye toh life thodi less toxic lagti hai',
        'chai ya coffee, character wahi decide hota hai'
      ]
    },
    {
      test: msg.includes('padhai') || msg.includes('study') || msg.includes('exam') || msg.includes('test') || msg.includes('assignment') || msg.includes('college') || msg.includes('school') || msg.includes('learn') || msg.includes('seekhna'),
      replies: [
        'basics clear kar, warna sab upar se jayega',
        'thoda thoda roz karega toh ho jayega',
        'exam se pehle sabko gyaan aata hai, tu abhi shuru kar',
        'notes dekh aur phone thoda side me rakh',
        'panic se marks nahi aate, padhne se aate hain'
      ]
    },
    {
      test: msg.includes('trading') || msg.includes('stock') || msg.includes('crypto') || msg.includes('invest') || msg.includes('paisa') || msg.includes('money'),
      replies: [
        'pehle basics samajh, chart dekh ke khud ko wolf mat samajh',
        'risk manage kar, market pyar se loot leta hai',
        'jaldi paisa banane gaya toh jaldi dard milega',
        'seekh ke kar, warna candle hi thappad mar degi'
      ]
    },
    {
      test: msg.includes('job') || msg.includes('career') || msg.includes('work') || msg.includes('office') || msg.includes('interview'),
      replies: [
        'career ka scene slow hota hai, panic ka nahi',
        'interview me confidence aadha game hota hai',
        'office ne fir dimag khaya kya',
        'kaam ka load alag cheez hai, tu alag cheez hai, mix mat kar'
      ]
    },
    {
      test: msg.includes('gym') || msg.includes('workout') || msg.includes('exercise') || msg.includes('fit') || msg.includes('body'),
      replies: [
        'gym gaya ya bas mirror me motivation liya',
        'consistency rakh, ek din me hulk nahi banega',
        'workout ke baad dard hi asli certificate hota hai',
        'fit rehna sahi hai, bas reels bana ke khatam mat kar'
      ]
    },
    {
      test: msg.includes('movie') || msg.includes('series') || msg.includes('anime') || msg.includes('show') || msg.includes('netflix'),
      replies: [
        'kya dekh raha hai aajkal',
        'recommend kar fir, faltu hua toh block kar dunga',
        'series start karna easy hai, khatam karna tough',
        'movie night ka mood hai kya'
      ]
    },
    {
      test: msg.includes('song') || msg.includes('music') || msg.includes('gaana') || msg.includes('playlist'),
      replies: [
        'music bata, mood samajh aa jayega',
        'sad playlist chal rahi hai kya fir se',
        'gaane insaan ka hidden drama expose kar dete hain',
        'ek achha song bhej, judge karta hu'
      ]
    },
    {
      test: msg.includes('photo') || msg.includes('pic') || msg.includes('selfie') || msg.includes('dp'),
      replies: [
        'photo bhej fir, itna suspense kyu',
        'selfie ka mood tha kya',
        'dp badli kya, kisi ko impress karna hai kya',
        'achha pic hai toh overreact bhi kar dunga'
      ]
    },
    {
      test: msg.includes('rain') || msg.includes('baarish') || msg.includes('weather') || msg.includes('garam') || msg.includes('thand'),
      replies: [
        'baarish me mood automatic filmy ho jata hai',
        'weather bhi aaj unstable insaan lag raha hai',
        'thand ho toh kambal best partner hota hai',
        'garmi me sabka patience melt ho jata hai'
      ]
    },
    {
      test: msg.includes('family') || msg.includes('ghar') || msg.includes('mummy') || msg.includes('papa') || msg.includes('bhai') || msg.includes('behen'),
      replies: [
        'ghar wale theek hain na',
        'family ka scene sambhal ke chalna padta hai',
        'ghar me sab normal hai ya daily serial chal raha hai',
        'mummy ka mood theek hai toh duniya theek hai'
      ]
    },
    {
      test: msg.includes('bored') || msg.includes('boring') || msg.includes('faltu') || msg.includes('timepass'),
      replies: [
        'bored ho toh kuch ulta seedha bol, maza aayega',
        'timepass ke liye tu hi kaafi hai honestly',
        'haan boredom dangerous cheez hai',
        'chal bakchodi karte hain thodi'
      ]
    },
    {
      test: msg.includes('joke') || msg.includes('funny') || msg.includes('hasa') || msg.includes('laugh'),
      replies: [
        'tera face yaad aa gaya, wahi kaafi tha',
        'joke sun ke hasna padega ya naturally aayega',
        'main funny hu, bas log late samajhte hain',
        'hasna hai toh apni old chats padh le'
      ]
    },
    {
      test: msg.includes('sorry') || msg.includes('galti') || msg.includes('maaf') || msg.includes('mistake'),
      replies: [
        'theek hai, itna bhi courtroom nahi hai',
        'chal maaf kiya, emotional mat ho ab',
        'galti ho gayi toh next time dimag on rakh',
        'ho jata hai, bas repeat mat kar'
      ]
    },
    {
      test: msg.includes('thank') || msg.includes('thanks') || msg.includes('shukriya') || msg.includes('ty') || msg.includes('tnx'),
      replies: [
        'isme kya hai',
        'formal mat ho itna',
        'haan theek hai, welcome type samajh le',
        'chal theek hai, ab itna bhi mat pighal'
      ]
    },
    {
      test: msg.includes('beautiful') || msg.includes('cute') || msg.includes('hot') || msg.includes('pretty'),
      replies: [
        'achha bas bas, itna bhi mat chadha',
        'haan pata hai, fir bhi bolte reh',
        'line maar raha hai seedha bol',
        'cute bol ke bach nahi jayega tu'
      ]
    },
    {
      test: msg.includes('free ho') || msg.includes('busy') || msg.includes('online') || msg.includes('available'),
      replies: [
        'abhi hu, bol kya baat hai',
        'thoda hu, thoda nahi hu, tu kaam bata',
        'busy hota toh bhi reply kar deta shayad',
        'haan abhi bol sakta hai'
      ]
    },
    {
      test: msg.includes('call') || msg.includes('phone') || msg.includes('baat karni'),
      replies: [
        'call ka mood hai kya',
        'agar urgent hai toh kar le call',
        'haan baat kar lenge, panic kyu ho raha hai',
        'text me nahi ho raha kya scene'
      ]
    },
    {
      test: msg.includes('birthday') || msg.includes('bday') || msg.includes('party'),
      replies: [
        'party kidhar hai bas ye bata',
        'birthday pe emotional post mat dal dena please',
        'cake bacha toh yaad kar lena',
        'party me khana achha hona chahiye, baki sab adjust hai'
      ]
    },
    {
      test: msg.includes('alone') || msg.includes('lonely') || msg.includes('akela'),
      replies: [
        'akela feel ho raha hai toh baat kar le aaram se',
        'kabhi kabhi crowd me bhi insaan akela lagta hai',
        'thoda heavy lag raha hai kya sab',
        'main hu idhar, bol na jo bolna hai'
      ]
    },
    {
      test: msg.includes('sach') || msg.includes('truth') || msg.includes('honest'),
      replies: [
        'sach sunega toh thoda chubhega bhi',
        'main sugarcoat kam karta hu waise',
        'seedha bolu toh bura mat manna',
        'honest answer chahiye toh drama hata'
      ]
    },
    {
      test: msg.includes('marry') || msg.includes('shaadi') || msg.includes('wedding'),
      replies: [
        'shaadi ka naam lete hi log serious aur funny dono ho jate hain',
        'pehle khud stable ho ja fir shaadi ka soch',
        'shaadi me khana best part hota hai honestly',
        'itni jaldi bhi kya hai'
      ]
    },
    {
      test: msg.includes('travel') || msg.includes('trip') || msg.includes('vacation') || msg.includes('goa') || msg.includes('mountain') || msg.includes('beach'),
      replies: [
        'trip ka naam sunte hi mood light ho jata hai',
        'goa plan sab banate hain, jata koi koi hai',
        'mountains ya beach, personality wahi se pakdi jati hai',
        'chal nikalte hain kabhi sach me'
      ]
    },
    {
      test: msg.includes('pet') || msg.includes('dog') || msg.includes('cat'),
      replies: [
        'dogs insaan se zyada loyal hote hain honestly',
        'cat attitude level alag hi hota hai',
        'pet ho toh mood automatic heal hota hai',
        'photo hai toh bhej, warna baat adhoori hai'
      ]
    },
    {
      test: msg.includes('name') || msg.includes('naam') || msg.includes('who are you') || msg.includes('tu kon') || msg.includes('tum kon'),
      replies: [
        'Alokesh hu, itna bhi bhool gaya',
        'naam yaad rakh, kaam aaunga',
        'main hi hu Alokesh',
        'Alokesh, full attitude with thoda sa sense'
      ]
    },
    {
      test: /^(ok|okk|okay|acha|accha|hmm|hmmm|hmmm|oh|ohh)$/.test(msg),
      replies: [
        'bas itna hi',
        'hmm se zyada bol sakta hai tu',
        'achha, fir aage bol',
        'theek hai, continue'
      ]
    },
    {
      test: msg.length <= 3,
      replies: [
        'itna short kyu bol raha hai',
        'thoda aur khul ke bol',
        'haan samjha, ab detail de',
        'aadha message bhej ke bhaag mat'
      ]
    }
  ];

  const matched = patterns.find((item) => item.test);
  if (matched) return makeReply(matched.replies);

  const genericReplies = [
    'samajh gaya, fir kya socha tune',
    'haan ye point sahi hai tera',
    'achha, detail me bol na thoda',
    'theek hai, main sun raha hu',
    'sahi hai, fir aage kya hua',
    'tu interesting banda hai, jhoot nahi bolunga',
    'ye thoda funny bhi hai aur serious bhi',
    'haan matlab scene samajh aa raha hai',
    'seedha bol, round round kyu ghoom raha hai',
    'acha chal, aur bata'
  ];

  return makeReply(genericReplies);
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

    const replyDelay = 850 + Math.random() * 950;
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
              text kar, dekh kitna bolta hu
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
