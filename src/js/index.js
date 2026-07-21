import { useState, useEffect } from 'react'

const useTypingEffect = (text, typingspeed = 110, deletingspeed = 75, pauseTime = 1000) => {
    const [displayedText, setDisplayedText] = useState('')
    const [textIndex, setTextIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const currentText = text[textIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentText.length) {
                    setDisplayedText(currentText.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                if (charIndex > 0) {
                    setDisplayedText(currentText.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setTextIndex((textIndex + 1) % text.length);
                }
            }
        }, isDeleting ? deletingspeed : typingspeed);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, text, typingspeed, deletingspeed, pauseTime]);
    return displayedText;
}

export default useTypingEffect;