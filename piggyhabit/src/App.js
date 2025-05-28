import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * PiggyHabitContainer - Main container for the PiggyHabit app.
 * Manages state for balance, goal, history, and motivational messages.
 * Entry point for future PiggyHabit features.
 */
function PiggyHabitContainer() {
  // Current balance in piggy bank (number)
  const [balance, setBalance] = useState(0);
  
  // User's savings goal (number)
  const [goal, setGoal] = useState(100);

  // Savings history (array of {amount, date, type})
  const [history, setHistory] = useState([
    // Example: { amount: 20, date: '2024-06-18', type: 'add' }
  ]);

  // Motivational messages (array of strings)
  const motivationalMessages = [
    "Every coin counts – keep going!",
    "Stay consistent, your goal is within reach.",
    "Saving today is an investment in yourself.",
    "Great job! One step closer to your goal.",
    "Big journeys begin with small steps."
  ];
  // Current motivational message index (number)
  const [motivationIndex, setMotivationIndex] = useState(0);

  // (For future) handler to cycle motivational messages
  const nextMotivation = () =>
    setMotivationIndex(idx => (idx + 1) % motivationalMessages.length);

  // Savings input state
  const [inputAmount, setInputAmount] = useState('');

  // Handler for adding savings
  const handleAdd = () => {
    const amt = parseFloat(inputAmount);
    if (isNaN(amt) || amt <= 0) return;
    const newBalance = balance + amt;
    setBalance(newBalance);
    setHistory([
      ...history,
      {
        amount: amt,
        date: new Date().toISOString().slice(0, 10),
        type: 'add'
      }
    ]);
    setInputAmount('');
  };

  // Handler for removing savings
  const handleRemove = () => {
    const amt = parseFloat(inputAmount);
    if (isNaN(amt) || amt <= 0) return;
    const newBalance = Math.max(balance - amt, 0);
    setBalance(newBalance);
    setHistory([
      ...history,
      {
        amount: amt,
        date: new Date().toISOString().slice(0, 10),
        type: 'remove'
      }
    ]);
    setInputAmount('');
  };

  // Progress toward goal (0 - 1)
  const progress = Math.max(0, Math.min(1, balance / goal));

  // Handler to set a new goal
  const [editGoal, setEditGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(goal);

  const handleGoalSave = () => {
    if (goalInput > 0) setGoal(goalInput);
    setEditGoal(false);
  };

  return (
    <div className="piggyhabit-container">

      {/* App Title/Logo */}
      <div className="logo" style={{ marginTop: 24, gap: 8 }}>
        {/* Custom SVG PiggyBank Icon */}
        <span className="logo-symbol" style={{ color: "var(--piggy-primary)", fontSize: 0, display: "flex", alignItems: "center" }}>
          <svg width="54" height="44" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', marginRight: 6}}>
            <ellipse cx="29" cy="24" rx="20" ry="16" fill="var(--piggy-primary)" stroke="var(--piggy-accent)" strokeWidth="3"/>
            <ellipse cx="29" cy="29" rx="10" ry="5" fill="#FFF8E1" opacity="0.4"/>
            <ellipse cx="11" cy="24" rx="3" ry="2" fill="var(--piggy-accent)" />
            <ellipse cx="47" cy="20" rx="2.3" ry="1.6" fill="#fff" stroke="var(--piggy-accent)" strokeWidth="1"/>
            {/* Ear */}
            <path d="M17 10 Q17 5, 23 8" stroke="var(--piggy-accent)" strokeWidth="3" fill="none"/>
            {/* Tail */}
            <path d="M9 34 Q7.6 37, 11.2 37 Q14 37, 12.1 34" stroke="var(--piggy-accent)" strokeWidth="2" fill="none"/>
            {/* Piggy coin slot */}
            <rect x="24" y="10.5" width="10" height="3" rx="1.6" fill="#fff" opacity="0.35"/>
            {/* Smile */}
            <path d="M26.8 31 Q29 33 31.2 31" stroke="#FF9800" strokeWidth="2" fill="none" />
            {/* Eye */}
            <ellipse cx="37.2" cy="19" rx="1" ry="1.3" fill="#633000"/>
          </svg>
        </span>
        <span style={{ fontWeight: 700, color: "var(--piggy-accent)", fontSize: 24 }}>PiggyHabit</span>
      </div>

      {/* Balance Display */}
      <div className="piggy-balance">
        ${balance.toFixed(2)}
      </div>

      {/* Savings goal with edit */}
      <div className="piggy-goal" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {editGoal ? (
          <>
            <input
              type="number"
              min="1"
              step="0.01"
              value={goalInput}
              style={{
                maxWidth: 90,
                border: "1px solid var(--piggy-accent)",
                borderRadius: 6,
                fontSize: 16,
                padding: "2px 8px",
                height: 28,
              }}
              onChange={e => setGoalInput(Number(e.target.value))}
              onKeyDown={e => { if (e.key === "Enter") handleGoalSave(); }}
            />
            <button className="btn" style={{ fontSize: 15, padding: "5px 12px" }} onClick={handleGoalSave}>Save</button>
            <button className="btn" style={{ background: "transparent", color: "var(--piggy-accent)", border: "none", padding: "3px", boxShadow: "none" }} onClick={() => setEditGoal(false)}>✕</button>
          </>
        ) : (
          <>
            Goal: ${goal.toFixed(2)}
            <button className="btn" style={{ fontSize: 15, padding: "5px 10px", marginLeft: 10, background: "#FFF8E1", color: "var(--piggy-accent)", border: "1px solid var(--piggy-accent)" }}
              onClick={() => { setGoalInput(goal); setEditGoal(true); }}
              title="Edit goal">✏️</button>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        width: 280,
        maxWidth: "90vw",
        margin: "8px 0 16px 0",
        height: 22,
        background: "#ffe7af",
        borderRadius: 14,
        boxShadow: "0 1.5px 8px 0 rgba(255, 179, 0, 0.10)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        border: "1.5px solid var(--piggy-primary)",
        position: "relative"
      }}>
        <div style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, var(--piggy-accent), var(--piggy-primary))",
          height: "100%",
          borderRadius: "inherit",
          transition: "width 0.8s cubic-bezier(.52,.01,.38,1.08)",
        }} />
        <span style={{
          position: "absolute",
          left: "0",
          right: "0",
          textAlign: "center",
          fontWeight: 600,
          color: "#735400",
          fontSize: "1.02rem",
          letterSpacing: "0.3px",
        }}>
          {progress === 1 ? "Goal reached 🎉" : `${Math.round(progress * 100)}%`}
        </span>
      </div>

      {/* Add/Remove Savings section */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12, margin: "10px 0 20px 0" }}>
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter amount"
          style={{
            maxWidth: 120,
            border: "1.3px solid var(--piggy-accent)",
            borderRadius: 8,
            fontSize: 18,
            padding: "5px 12px",
            height: 36,
            outline: "none",
            background: "#fffefa"
          }}
          value={inputAmount}
          onChange={e => setInputAmount(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleAdd(); }}
        />
        <button
          className="btn btn-large"
          style={{ background: "var(--piggy-primary)", color: "var(--piggy-accent)", fontWeight: 700, border: "1.3px solid #FFD160", borderRadius: 8 }}
          onClick={handleAdd}
        >+ Add</button>
        <button
          className="btn btn-large"
          style={{ background: "#fff3e0", color: "var(--piggy-accent)", fontWeight: 600, border: "1.2px solid #FFCE7C", borderRadius: 8 }}
          onClick={handleRemove}
        >- Remove</button>
      </div>

      {/* --- Bottom Tab Section: History & Motivation --- */}
      <div className="piggy-bottom-bar">
        <div className="piggy-bottom-tab-list">
          {/* Savings History Section */}
          <div className="piggy-bottom-tab piggy-bottom-tab-history">
            <div className="piggy-bottom-tab-title">Savings History</div>
            <ul className="piggy-bottom-history-list">
              {history.length === 0 ? (
                <li className="piggy-bottom-history-empty">No savings yet.</li>
              ) : (
                history.slice().reverse().map((entry, idx) => (
                  <li
                    key={idx}
                    className={
                      entry.type === "add"
                        ? "piggy-history-add"
                        : "piggy-history-remove"
                    }
                  >
                    {entry.type === "add" ? "+" : "-"}${entry.amount.toFixed(2)}
                    <span className="piggy-history-date">
                      {entry.date}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
          {/* Motivational Messages Section */}
          <div className="piggy-bottom-tab piggy-bottom-tab-motivation">
            <div className="piggy-bottom-tab-title">Motivation</div>
            <div className="piggy-bottom-motivation-content">
              <span>{motivationalMessages[motivationIndex]}</span>
              <button
                title="Show another motivational message"
                className="piggy-motivation-next-btn"
                onClick={() => {
                  // Optionally randomize (or next)
                  let nextIdx = (motivationIndex + 1) % motivationalMessages.length;
                  // Make sure the next motivation is different if possible
                  if (motivationalMessages.length > 1) {
                    while (nextIdx === motivationIndex) {
                      nextIdx = Math.floor(Math.random() * motivationalMessages.length);
                    }
                  }
                  setMotivationIndex(nextIdx);
                }}
              >⟳</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Main App - Renders the PiggyHabitContainer.
 */
function App() {
  return <PiggyHabitContainer />;
}

export default App;