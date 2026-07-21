import { useState, useRef, useEffect } from 'react';
import useTypingEffect from './js/index.js';
import useMousePosition from './js/mouse.js';
import useTypingEffect2 from './js/effect.js';
import './index.css'

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [yesPressed, setYesPressed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gift: '',
    compliment: '',
    date: '',
    time: ''
  });
  const noBtnRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id === 'your_name' ? 'name' : id === 'your_gift' ? 'gift' : id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // We update the UI to submitted immediately so they don't have to wait
    setIsSubmitted(true);

    try {
      await fetch("https://formsubmit.co/ajax/2bb65e318dfdf96cfc63262cc6f7b961", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New Valentine's Date Accepted! ❤️",
          Name: formData.name || "Secret Admirer",
          Gift: formData.gift || "None",
          Compliment: formData.compliment || "None",
          Date: formData.date || "TBD",
          Time: formData.time || "TBD",
          Escape_Attempts: noCount,
          Message: "They finally said YES!"
        })
      });
    } catch (error) {
      console.error("Failed to send email", error);
    }
  };

  const typingText2 = useTypingEffect2(["please fill here", "I am serous of dating HAHHA", "dating on VC",
    "But soon on the personal"
  ])

  const typingText = useTypingEffect(["Yashvi ❤️", "My Cutest Baby ❤️"]);
  const mousePosition = useMousePosition();

  const handleNoDodge = () => {
    const edge = Math.floor(Math.random() * 4);
    let x, y;

    switch (edge) {
      case 0:
        x = Math.random() * 80 + 10;
        y = Math.random() * 10 + 10;
        break;
      case 1:
        x = Math.random() > 0.5 ? (Math.random() * 15 + 10) : (Math.random() * 15 + 75);
        y = Math.random() * 10 + 80;
        break;
      case 2:
        x = Math.random() * 10 + 10;
        y = Math.random() * 80 + 10;
        break;
      case 3:
        x = Math.random() * 10 + 80;
        y = Math.random() * 80 + 10;
        break;
      default:
        x = 50; y = 50;
    }

    setNoButtonStyle({
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      transition: 'all 0.3s ease-in-out'
    });
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    handleNoDodge();
  };

  useEffect(() => {
    if (noBtnRef.current && mousePosition.x !== 0 && mousePosition.y !== 0) {
      const rect = noBtnRef.current.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;

      const dist = Math.hypot(mousePosition.x - btnX, mousePosition.y - btnY);
      if (dist < 70) {
        handleNoDodge();
      }
    }
  }, [mousePosition]);

  if (yesPressed) {
    return (
      <main className='page'>
        <section className="card-container">
          <div className="card">
            <div className="card-decorations">
              <span className="card-deco" style={{ top: '20px', left: '20px' }}>♥</span>
              <span className="card-deco" style={{ top: '20px', right: '20px' }}>♥</span>
              <span className="card-deco" style={{ bottom: '20px', left: '20px' }}>♥</span>
              <span className="card-deco" style={{ bottom: '20px', right: '20px' }}>♥</span>
            </div>
            <div className="card-icon" style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '4rem' }}>🧸</span>
            </div>
            <h2 className="card-title">Yayyyy! ❤️</h2>
            <p className="card-text">I knew you would say yes!</p>
            <p className="card-text" style={{ marginBottom: '15px' }}><span>{typingText2}</span></p>
            {isSubmitted ? (
              <div className="receipt">
                <div className="receipt-top-edge"></div>
                <div className="stamp-official">OFFICIAL</div>

                <h3 style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '25px', marginBottom: '15px', letterSpacing: '1px' }}>VALENTINE RECEIPT</h3>

                <div className="receipt-divider"></div>

                <div style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
                  <div>
                    <strong>From:</strong> {formData.name || 'Secret Admirer'}
                  </div>
                  <div>
                    <strong>To:</strong> Valentine
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <strong>Date:</strong> {formData.date || 'TBD'}
                  </div>
                  <div>
                    <strong>Time:</strong> {formData.time || 'TBD'}
                  </div>
                  <div>
                    <strong>Gift:</strong> {formData.gift || 'None'}
                  </div>

                  {formData.compliment && (
                    <div style={{ marginTop: '5px' }}>
                      <strong>Compliment:</strong>
                      <div style={{ fontStyle: 'italic', paddingLeft: '10px' }}>"{formData.compliment}"</div>
                    </div>
                  )}

                  <div className="receipt-divider"></div>

                  <div>
                    <strong>Q:</strong> Be my Valentine?<br />
                    <strong>A:</strong> YES ♥
                  </div>

                  <div className="receipt-divider"></div>

                  <div>
                    <strong>Escape attempts:</strong> {noCount}<br />
                    <span style={{ fontStyle: 'italic', color: '#e55a81' }}>
                      Verdict: {noCount >= 7 ? 'LEGENDARY STUBBORNNESS' : noCount > 3 ? 'PLAYING HARD TO GET' : 'EASY CATCH'}
                    </span>
                  </div>
                </div>

                <div className="receipt-bottom-edge"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form-container">
                <input type="text" id='your_name' value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Put your name here" required />
                <input type="text" id='your_gift' value={formData.gift} onChange={handleInputChange} className="form-input" placeholder="Gift for something" />
                <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '0' }}>i know you are serious about our dating so i am also serious but in the vc only hahahah</p>
                <textarea id="compliment" value={formData.compliment} onChange={handleInputChange} placeholder="Complime for something" className="form-input" rows="3" style={{ resize: 'none' }}></textarea>
                <div className="flex gap-3 w-full">
                  <input type="date" id='date' value={formData.date} onChange={handleInputChange} className="form-input flex-1" required />
                  <input type="time" id='time' value={formData.time} onChange={handleInputChange} className="form-input flex-1 time" required />
                </div>
                <button type="submit" className="form-submit">Lets date on IG😊</button>
              </form>
            )}
          </div>
        </section>
      </main>
    );
  }


  const cappedCount = Math.min(noCount, 8);
  const yesFontSize = 16 + (cappedCount * 10);
  const yesPaddingV = 10 + (cappedCount * 5);
  const yesPaddingH = 30 + (cappedCount * 8);

  return (
    <main className='page'>
      {/* Card */}
      <section className="card-container">
        <div className="card">
          {/* Corner Heart Decorations */}
          <div className="card-decorations">
            <span className="card-deco" style={{ top: '20px', left: '20px' }}>♥</span>
            <span className="card-deco" style={{ top: '20px', right: '20px' }}>♥</span>
            <span className="card-deco" style={{ bottom: '20px', left: '20px' }}>♥</span>
            <span className="card-deco" style={{ bottom: '20px', right: '20px' }}>♥</span>
          </div>

          <div className="card-icon" style={{ marginBottom: '10px' }}>
            <span style={{ fontSize: '2.8rem' }}>💞</span>
          </div>
          <p className="card-text" style={{ fontSize: '1.3rem', marginBottom: '5px' }}>HI <span>{typingText}</span>,</p>
          <h2 className="card-title" style={{ fontSize: '1.9rem', marginBottom: '30px' }}>Will you be my Valentine?</h2>

          <div className="buttons-container" style={{ alignItems: 'center' }}>
            <button
              className="btn-no"
              id="btn_no"
              ref={noBtnRef}
              onMouseEnter={handleNoDodge}
              onClick={handleNoClick}
              style={noButtonStyle}
            >
              No
            </button>
            <button
              className="btn-yes"
              id="btn_yes"
              onClick={() => setYesPressed(true)}
              style={{ fontSize: `${yesFontSize}px`, padding: `${yesPaddingV}px ${yesPaddingH}px`, zIndex: 100, position: 'relative' }}
            >
              Yes
            </button>
          </div>

          <p className="card-subtext" style={{ marginTop: '20px', fontSize: '0.85rem', opacity: 0.8 }}>"No" seems a bit shy 😅</p>
        </div>
      </section>
    </main>
  )
}