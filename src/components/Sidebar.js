import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { icons } from '../assets/icons';

const SidebarContainer = styled.div`
  position: fixed; /* Sidebar remains fixed */
  
  // small, cross-browser smooth scroller for an element (or window when container is null)
  const smoothScrollTo = (container, to, duration = 480) => {
    const isWindow = !container || container === window || container === document.body || container === document.documentElement;
    const start = isWindow ? window.pageYOffset : container.scrollTop;
    const change = to - start;
    const startTimeRef = { v: null };
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (timestamp) => {
      if (!startTimeRef.v) startTimeRef.v = timestamp;
      const elapsed = timestamp - startTimeRef.v;
      const progress = Math.min(elapsed / duration, 1);
      const val = start + change * easeInOutCubic(progress);
      if (isWindow) {
        window.scrollTo(0, val);
      } else {
        container.scrollTop = val;
      }
      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };
  width: 15%; /* Sidebar occupies 10% of the width */
  height: 100%; /* Full viewport height */
  background: rgba(255, 255, 255, 0.8); /* Default glass background */
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Ensures content stays within the sidebar */
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
  position: fixed; /* Sidebar remains fixed */
  width: 15%; /* Sidebar occupies 10% of the width */
  z-index: 5; /* above particles */
  height: 100%; /* Full viewport height */
  background: rgba(255, 255, 255, 0.8); /* Default glass background */
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Ensures content stays within the sidebar */
  transition: all 0.3s ease;
  }
`;

/* reveal the hidden expanded content when the sidebar is hovered or focused */
const RevealStyles = styled.div`
  @media (max-width: 1024px) {
    .sidebar-expanded-target { max-height: 0; opacity: 0; transition: max-height 240ms ease, opacity 240ms ease; }
    ${SidebarContainer}:hover & .sidebar-expanded-target, ${SidebarContainer}:focus-within & .sidebar-expanded-target {
      max-height: 800px; opacity: 1;
    }
  }
`;

const TypingHeader = styled.h1`
  color: #e67e22;
  font-size: 28px;
  text-align: center;
  cursor: pointer;
  overflow-wrap: break-word;
  white-space: normal;
  border-right: 3px solid #e67e22;
  animation: blink 0.5s step-end infinite;

  @keyframes blink {
    from, to { border-color: transparent; }
    50% { border-color: #e67e22; }
  }

  /* at smaller widths we hide it by default (it will appear when the sidebar is hovered) */
  @media (max-width: 1024px) {
    color: #e67e22;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    overflow-wrap: break-word;
    white-space: normal;
    border-right: 3px solid #e67e22;
    animation: blink 0.5s step-end infinite;
  }
`;

/* SocialIcons removed because it was defined but not used (avoids no-unused-vars). */

const NavLinks = styled.ul`
  position: absolute; /* Fixed position within the sidebar */
  bottom: 220px; /* Adjust as needed */
  left: 0; /* align to left edge of sidebar */
  transform: none;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: center;

  li {
    margin: 12px 0;
    width: 100%;
    transition: background-color 0.2s ease, transform 0.2s ease;

    button {
      all: unset;
      display: flex;
      align-items: left;
      justify-content: left;
      gap: 12px;
      padding: 10px;
      padding-left: 50px; /* slightly reduced horizontal padding now that content is centered */
      width: 90%;
      border-radius: 8px;
      color: inherit;
      cursor: pointer;
    }

    &:hover button {
      background-color: #f1f1f1;
      transform: translateY(-2px); /* lift instead of shifting horizontally so centered layout stays visually aligned */
      box-shadow: 0 8px 18px rgba(230, 126, 34, 0.12);
      padding: 10px;
      border-radius: 80px;
    }
  }

  /* anchor wraps icon + label so the whole row is clickable */
  button {
    color: #333;
    font-weight: 600;
    font-size: 16px; /* reduced font size for nav labels */
    font-family: 'Roboto', sans-serif;
  }

  img {
    width: 30px;
    height: 30px;
  }
`;

// small helper for visible focus rings on sections
const FocusHelper = styled.div`
  /* when a section receives programmatic focus, provide a visible ring */
  section:focus {
    outline: 4px solid rgba(230,126,34,0.12);
    outline-offset: 6px;
  }
`;

const Sidebar = () => {
  const [currentText, setCurrentText] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    // move texts inside the effect so it doesn't change identity across renders
    const texts = [
      { text: "Welcome to My Portfolio", typingSpeed: 100, pauseDuration: 2000 },
      { text: "This sidebar helps you navigate my work", typingSpeed: 80, pauseDuration: 1000 },
      { text: "Explore my skills, projects, and more", typingSpeed: 120, pauseDuration: 1000 },
    ];

    const typingInterval = setInterval(() => {
      if (charIndex < texts[textIndex].text.length) {
        setCurrentText((prev) => prev + texts[textIndex].text[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCharIndex(0);
          setTextIndex((prev) => (prev + 1) % texts.length);
          setCurrentText("");
        }, texts[textIndex].pauseDuration); // Pause before switching to the next text
      }
    }, texts[textIndex].typingSpeed);

    return () => clearInterval(typingInterval);
  }, [charIndex, textIndex]);

  // Smooth-scroll to a section id (used by nav links)
  const handleNavClick = (e, id) => {
    // allow normal clicks with modifier keys (ctrl/meta) to open in new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Debug: log navigation attempts (helps when clicks seem to do nothing)
  try { console.debug('Sidebar: navigate to', id); } catch (_) {}
  setActiveId(id);

      // Prefer using native scrollIntoView — it's reliable and will scroll the nearest scrollable ancestor.
      // If you need a custom offset (fixed headers), we can calculate container.scrollTop instead.
      try {
        // attempt native smooth scrolling first
        el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        // fallback: if the nearest scrollable ancestor didn't move after a short delay, force-scroll it
        setTimeout(() => {
          try {
            const container = document.getElementById('content-container');
            const offset = 8;
            if (container) {
              const containerRect = container.getBoundingClientRect();
              const elRect = el.getBoundingClientRect();
              const desiredTop = elRect.top - containerRect.top + container.scrollTop - offset;
              // if current scroll is far from desired, force animate (no smooth polyfill here)
              if (Math.abs(container.scrollTop - desiredTop) > 4) {
                console.debug('Sidebar fallback: forcing container scroll to', desiredTop);
                container.scrollTo({ top: desiredTop, behavior: 'smooth' });
              }
            } else {
              const desiredTop = el.getBoundingClientRect().top + window.pageYOffset - offset;
              if (Math.abs(window.pageYOffset - desiredTop) > 4) {
                console.debug('Sidebar fallback: forcing window scroll to', desiredTop);
                window.scrollTo({ top: desiredTop, behavior: 'smooth' });
              }
            }
          } catch (ex) { /* ignore */ }
        }, 250);
      } catch (err) {
        // Fallback: compute and scroll the container or window
        const offset = 8;
        const container = document.getElementById('content-container');
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const top = elRect.top - containerRect.top + container.scrollTop - offset;
          container.scrollTo({ top, behavior: 'smooth' });
        } else {
          const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    // update URL hash without jumping (avoid setting location.hash which can trigger an immediate jump)
    try { window.history.replaceState(null, '', `#${id}`); } catch (_) { /* ignore - don't set location.hash */ }
      // focus the target for accessibility
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
      // Debug: log scroll positions after a short delay to verify smooth animation
      setTimeout(() => {
        try {
          const container = document.getElementById('content-container');
          if (container) console.debug('Sidebar: container.scrollTop after nav =', container.scrollTop);
          else console.debug('Sidebar: window.pageYOffset after nav =', window.pageYOffset);
        } catch (ex) { }
      }, 600);
      // add a temporary highlight class so navigation is visible even if scrolling is subtle
      try {
        el.classList.add('sidebar-nav-highlight');
        setTimeout(() => el.classList.remove('sidebar-nav-highlight'), 1600);
      } catch (ex) {}
    }
  };

  return (
    <SidebarContainer>
      <RevealStyles />
  <FocusHelper />
  <div className="sidebar-expanded-target">
    <TypingHeader className="epunda-slab-typed">{currentText}</TypingHeader>
    </div>
      <NavLinks className="sidebar-expanded-target">
        <li>
          <button aria-current={activeId === 'about' ? 'true' : undefined} onClick={(e) => handleNavClick(e, 'about')} onKeyDown={(e) => e.key === 'Enter' && handleNavClick(e, 'about')}>
            <img src={icons.about} alt="About Icon" />
            <span className="nav-label">About</span>
          </button>
        </li>
        <li>
          <button aria-current={activeId === 'experience' ? 'true' : undefined} onClick={(e) => handleNavClick(e, 'experience')} onKeyDown={(e) => e.key === 'Enter' && handleNavClick(e, 'experience')}>
            <img src={icons.experience} alt="Experience Icon" />
            <span className="nav-label">Experience</span>
          </button>
        </li>
        <li>
          <button aria-current={activeId === 'projects' ? 'true' : undefined} onClick={(e) => handleNavClick(e, 'projects')} onKeyDown={(e) => e.key === 'Enter' && handleNavClick(e, 'projects')}>
            <img src={icons.projects} alt="Projects Icon" />
            <span className="nav-label">Projects</span>
          </button>
        </li>
        <li>
          <button aria-current={activeId === 'skills' ? 'true' : undefined} onClick={(e) => handleNavClick(e, 'skills')} onKeyDown={(e) => e.key === 'Enter' && handleNavClick(e, 'skills')}>
            <img src={icons.skills} alt="Skills Icon" />
            <span className="nav-label">Skills</span>
          </button>
        </li>
        <li>
          <button aria-current={activeId === 'connect' ? 'true' : undefined} onClick={(e) => handleNavClick(e, 'connect')} onKeyDown={(e) => e.key === 'Enter' && handleNavClick(e, 'connect')}>
            <img src={icons.connect} alt="Connect Icon" />
            <span className="nav-label">Connect</span>
          </button>
        </li>
      </NavLinks>
    </SidebarContainer>
  );
};

export default Sidebar;
