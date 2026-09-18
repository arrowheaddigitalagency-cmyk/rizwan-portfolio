import { Reveal } from '@/components/ui/Reveal';
import { QUOTE_PRIMARY } from '@/lib/data';

const expertise = [
  { number: '01', title: 'Automotive, from the ground up.', tag: 'OPERATIONS & INDUSTRY', body: 'Repair services, vehicle auctions, parts and dealership operations. Understanding the details that keep an automotive business moving.', skills: ['Vehicle services', 'Auctions & inventory', 'Day-to-day operations'], icon: 'wheel' },
  { number: '02', title: 'Understanding both sides of a rental.', tag: 'RENTALS & CUSTOMER EXPERIENCE', body: 'First-hand experience with fleets, pricing and bookings — and the expectations of the person waiting for the keys.', skills: ['Fleet operations', 'Rental bookings', 'Customer care'], icon: 'key' },
  { number: '03', title: 'Building trust. Then building on it.', tag: 'BUSINESS & LEADERSHIP', body: 'Staying involved with teams and customers. Taking ownership of the work, adapting to change and growing through practical experience.', skills: ['Hands-on leadership', 'Problem solving', 'Accountability'], icon: 'bridge' },
  { number: '04', title: 'Seeing the bigger mobility picture.', tag: 'TRAVEL & ENTREPRENEURSHIP', body: 'Connecting lessons from automotive businesses and international travel exhibitions to the vision behind YalaRide.', skills: ['Travel & mobility', 'Market understanding', 'Business development'], icon: 'globe' },
];

function ExpertiseIcon({ type }: { type: string }) {
  return <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    {type === 'wheel' ? <><circle cx="40" cy="40" r="27"/><circle cx="40" cy="40" r="10"/><path d="M40 13v17m0 20v17M13 40h17m20 0h17M21 21l12 12m14 14 12 12m0-38L47 33M33 47 21 59"/></> : type === 'key' ? <><circle cx="28" cy="29" r="15"/><circle cx="28" cy="29" r="5"/><path d="m39 40 26 26m-8-8 7-7m-15-1 7-7"/></> : type === 'bridge' ? <><path d="M10 60h60M17 60V23m46 37V23M10 36c20 0 18 15 30 15s10-15 30-15M28 46v14m24-14v14M40 51v9"/><circle cx="17" cy="20" r="3"/><circle cx="63" cy="20" r="3"/></> : <><circle cx="40" cy="40" r="27"/><ellipse cx="40" cy="40" rx="12" ry="27"/><path d="M14 40h52M19 24c14 7 28 7 42 0M19 56c14-7 28-7 42 0"/></>}
  </svg>;
}

export function Philosophy() {
  return <section id="philosophy" className="philosophy-section section-space">
    <div className="philosophy-rings" aria-hidden="true"><span/><span/><span/><i>✳</i></div>
    <div className="page-width philosophy-layout"><Reveal><p className="kicker">03 / THE CONVICTION</p><p className="philosophy-aside">Not just a career.<br/>A way of looking<br/>at the world.</p><span className="small-signature">MR /</span></Reveal><Reveal><h2>Build something<br/>that <em>means something.</em></h2><blockquote>“{QUOTE_PRIMARY}”</blockquote><p className="quote-credit">MOHAMMED RIZWAN <span>Entrepreneur. Founder. Always learning.</span></p></Reveal></div>
  </section>;
}

export function Expertise() {
  return <section id="expertise" className="expertise-section section-space"><div className="page-width"><Reveal><div className="section-heading"><div><p className="kicker">05 / EXPERIENCE INTO EXPERTISE</p><h2>Learned by doing.<br/><em>Built to make a difference.</em></h2></div><p className="section-note">Practical knowledge, earned over time.<br/>Connected by an entrepreneurial mindset.</p></div></Reveal><div className="expertise-grid">{expertise.map((item, i) => <Reveal key={item.number} delay={i % 2 * .08}><article className="expertise-card shine-card"><div className="expertise-card-top"><ExpertiseIcon type={item.icon}/><span>{item.number} /</span></div><p className="kicker">{item.tag}</p><h3>{item.title}</h3><p className="body-copy">{item.body}</p><ul className="skill-tags">{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article></Reveal>)}</div></div></section>;
}

export function MobilityVision() {
  return <section id="vision" className="vision-section section-space"><div className="page-width"><Reveal><div className="section-heading"><div><p className="kicker">07 / THE ROAD AHEAD</p><h2>Two sides of a marketplace.<br/><em>One shared opportunity.</em></h2></div><p className="section-note">The ambition behind YalaRide.</p></div></Reveal><div className="vision-grid"><Reveal className="vision-card shine-card"><span className="vision-label">FOR PEOPLE ON THE MOVE</span><span className="vision-symbol" aria-hidden="true">↗</span><h3>More accessible<br/>mobility.</h3><p>Make finding a rental vehicle easier, more convenient and better value — wherever the journey leads.</p><span className="vision-baseline">CHOICE / CONVENIENCE / VALUE</span></Reveal><Reveal className="vision-card shine-card" delay={.1}><span className="vision-label">FOR RENTAL BUSINESSES</span><span className="vision-symbol" aria-hidden="true">↔</span><h3>A wider world<br/>of opportunity.</h3><p>Help rental businesses of different sizes reach new audiences and participate in a broader digital marketplace.</p><span className="vision-baseline">VISIBILITY / CONNECTION / POSSIBILITY</span></Reveal></div><Reveal><div className="vision-statement"><span>THE LONG-TERM VISION</span><p>A trusted worldwide mobility platform.<br/><em>Grounded in real-world experience.</em></p></div></Reveal></div></section>;
}

export function Collaboration() {
  return <section id="collaborate" className="collaboration-section section-space"><div className="page-width collaboration-grid"><Reveal><p className="kicker">09 / OPEN A CONVERSATION</p><h2>Great possibilities<br/>start with <em>good people.</em></h2><p className="body-copy">A shared idea, an industry perspective or a new opportunity. There’s always room for a meaningful conversation.</p><a className="text-link" href="#contact">Get in touch <span aria-hidden="true">↗</span></a></Reveal><Reveal><div className="conversation-list">{[
    ['01', 'Business & partnerships', 'Explore business opportunities, strategic partnerships and shared interests across automotive, rentals and mobility.'],
    ['02', 'Mobility & YalaRide', 'Connect around the YalaRide vision, the rental industry and the future of more accessible mobility.'],
    ['03', 'Media & professional enquiries', 'For interviews, professional communication and conversations about the entrepreneurial journey.'],
  ].map(([number,title,body]) => <details key={number} name="conversation"><summary><span>{number}</span>{title}<i aria-hidden="true">+</i></summary><p>{body}</p></details>)}</div></Reveal></div></section>;
}
