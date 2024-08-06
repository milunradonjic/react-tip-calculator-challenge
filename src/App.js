import "./styles.css";
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [myPercentage, setMyPercentage] = useState(0);
  const [friendsPercentage, setFriendsPercentage] = useState(0);

  function onReset() {
    setBill(0);
    setMyPercentage(0);
    setFriendsPercentage(0);
  }

  return (
    <div className="App">
      <Bill bill={bill} onChange={setBill} />
      <Service value={myPercentage} onChange={setMyPercentage}>
        How did you like the service?
      </Service>
      <Service value={friendsPercentage} onChange={setFriendsPercentage}>
        How did your friend like the service?
      </Service>
      <ToPay
        bill={bill}
        myPercentage={myPercentage}
        friendsPercentage={friendsPercentage}
      />
      <ResetBtn onReset={onReset} />
    </div>
  );
}

function Bill({ bill, onChange }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="text"
        value={bill}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function Service({ value, onChange, children }) {
  return (
    <div>
      {children}
      <select onChange={(e) => onChange(Number(e.target.value))} value={value}>
        <SelectPercentage value={0}>Dissatisfied (0%)</SelectPercentage>
        <SelectPercentage value={5}>It was okay (5%)</SelectPercentage>
        <SelectPercentage value={10}>It was good (10%)</SelectPercentage>
        <SelectPercentage value={20}>It was amazing (20%)</SelectPercentage>
      </select>
    </div>
  );
}

function SelectPercentage({ value, children }) {
  return <option value={value}>{children}</option>;
}

function ToPay({ bill, myPercentage, friendsPercentage }) {
  const tip = bill * ((myPercentage + friendsPercentage) / 2 / 100 || 0);
  const total = bill + tip;

  return (
    <div>
      <strong>
        <p>{`You pay $${total} ($${bill} + $${tip} tip)`}</p>
      </strong>
    </div>
  );
}

function ResetBtn({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
