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

  return (
    <div className="piggyhabit-container">
      {/* App Title/Logo */}
      <div className="logo" style={{ marginTop: 24, gap: 8 }}>
        <span className="logo-symbol" style={{ color: "var(--piggy-primary)", fontSize: 28 }}>🐖</span>
        <span style={{ fontWeight: 700, color: "var(--piggy-accent)", fontSize: 24 }}>PiggyHabit</span>
      </div>

      {/* Balance Display */}
      <div className="piggy-balance">
        ${balance.toFixed(2)}
      </div>

      {/* Goal section */}
      <div className="piggy-goal">
        Goal: ${goal.toFixed(2)}
      </div>

      {/* For future: Add/Remove buttons, progress */}
      {/* History Display */}
      <div className="piggy-history">
        <strong>Savings History</strong>
        <ul style={{ margin: '14px 0 0 0', padding: 0, listStyle: "none" }}>
          {history.length === 0 ? (
            <li style={{ color: "#bbb", fontStyle: "italic" }}>No savings yet.</li>
          ) : (
            history.slice().reverse().map((entry, idx) => (
              <li key={idx} style={{ color: entry.type === "add" ? "var(--piggy-accent)" : "#999" }}>
                {entry.type === "add" ? "+" : "-"}${entry.amount.toFixed(2)}
                <span style={{ marginLeft: 8, color: "#a7a7a7", fontSize: 12 }}>{entry.date}</span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Motivational message */}
      <div className="piggy-motivation">
        {motivationalMessages[motivationIndex]}
        {/* Placeholder for future: message cycle button */}
      </div>

      {/* Placeholder for future feature components */}
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