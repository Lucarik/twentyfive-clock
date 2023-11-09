import './App.css';
import { useState } from "react";
/**
 * @function SessionSection A section that contains the display of session
 * information, as well as increment and decrement buttons to change session length
 * 
 * @param {String} props.name The name of the section
 * @param {String} props.time The time a session will countdown for
 * 
 * @method props.handleInc On click calls handleIncrement from {@link Clock}
 * @method props.handleDec On click calls handleDecrement from {@link Clock}
 */
function SessionSection(props) {
  return (
    <div className="secDiv">
      <h2 id="session-label">{props.name}</h2>
      <span><span id="session-length">{props.time}</span>:00</span>
      <span><button id="session-increment" onClick={props.handleInc}>⇧</button><button id="session-decrement" onClick={props.handleDec}>⇩</button></span>
    </div>
  );
}
/**
 * @function BreakSection A section that contains the display of break
 * information, as well as increment and decrement buttons to change break session length
 * 
 * @param {String} props.name The name of the section
 * @param {String} props.time The time a break session will countdown for
 * 
 * @method props.handleInc On click calls handleIncrement from {@link Clock}
 * @method props.handleDec On click calls handleDecrement from {@link Clock}
 */
function BreakSection(props) {
  return (
    <div className="secDiv">
      <h2 id="break-label">{props.name}</h2>
      <span><span id="break-length">{props.time}</span>:00</span>
      <span><button id="break-increment" onClick={props.handleInc}>⇧</button><button id="break-decrement" onClick={props.handleDec}>⇩</button></span>
    </div>
  );
}
/**
 * @function Timer Displays the timer and its controls. The user can runs, 
 * pause, and reset the timer
 * 
 * @param {String} props.session The name of the session
 * @param {String} props.getTime The current countdown time value in seconds
 * 
 * @method props.sessionSwitch On click calls handleIncrement from {@link Clock}
 * @method props.handlePlay On click calls handlePlay from {@link Clock}
 * @method props.handleReset On click calls handleReset from {@link Clock}
 */
function Timer(props) {
  /**
 * @function secondsToTimeString Converts seconds to a time in mm:ss format
 * 
 * @param {String} sec The time in seconds
 * 
 * @return {String} Returns string in mm:ss format
 */
  function secondsToTimeString(sec) {
    console.log(sec);
    if (sec < 0) {
      props.sessionSwitch();
    }
    let minutes = Math.floor(sec / 60);
    minutes = minutes + '';
    minutes = minutes.length <= 1 ? '0' + minutes : minutes;
    let seconds = sec - minutes * 60;
    seconds = "" + seconds;
    seconds = seconds.length < 2 ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
  }
  return (
    <div className="timer-wrapper">
      <div className="time">
        <h5 id="timer-label">{props.session}</h5>
        <h1 id="time-left" className="time-text">{secondsToTimeString(props.getTime)}</h1>
        <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
      <div className="controls">
        <span><button id="start_stop" onClick={props.handlePlay} className="control-button">⏵</button><button id="reset" onClick={props.handleReset} className="control-button">🔃</button></span>
      </div>
    </div>//
  );
}
/**
 * @function Clock Displays both Break and Session sections, as well as the timer
 * and its controls. The user can runs, pause, and reset the timer, as well as
 * change the timer length through incrementing or decrementing Session/Break session buttons 
 * 
 * @param {int} session The name of the current session(session/break)
 * @param {int} breakTime The time a break session will countdown for
 * @param {int} sessionTime The time a session will countdown for
 * @param {int} mainTime The current countdown time value
 * @param {int} window.intervalId The ID used to clear current interval
 * 
 * @method setSession Sets the current session
 * @method setBreakTime Sets the break session time value
 * @method setSessionTime Sets the session time value
 * @method setMainTime Sets the current time on the timer
 */
function Clock() {
  
  const [session, setSession] = useState("Session");
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [mainTime, setMainTime] = useState(sessionTime*60);
  window.intervalId;
  /**
 * @function decrementTime Decrements the current main time by 1 second
 */
  function decrementTime() {
    setMainTime(prevTime => prevTime-1);
  }
  /**
 * @function handlePlay Plays or stops the timer depending on whether intervalId is set
 * 
 * @param {Element} event The play/stop button
 * 
 * @method handleStop Called in the case the timer is playing to stop it
 */
  function handlePlay(event) {
    if (!window.intervalId) {
      event.target.innerHTML = '⏸';
      window.intervalId = setInterval(decrementTime, 1000);
    } else {
      event.target.innerHTML = '⏵';
      handleStop();
    }
  }
  /**
 * @function handleStop Stops the timer, clears intervalId
 */
  function handleStop() {
    clearInterval(window.intervalId);
    window.intervalId = null;
  }
/**
 * @function handleIncrementBreak Handles increment for break section and sets
 * break time value. Allows increments of 1, up to a break time value of 60
 */
  function handleIncrementBreak() {
    if (breakTime < 60) {
      setBreakTime(prevTime => prevTime+1);
      if (session == 'Break') {
        setMainTime((breakTime+1)*60);
      }
    }
  }
  /**
 * @function handleIncrementSession Handles increment for session section and sets
 * session time value. Allows increments of 1, up to a session time value of 60
 */
  function handleIncrementSession() {
    if (sessionTime < 60) {
      setSessionTime(prevTime => prevTime+1);
      if (session == 'Session') {
        setMainTime((sessionTime+1)*60);
      }
    }
  }
  /**
 * @function handleDecrementBreak Handles decrement for break section and sets
 * break time value. Allows decrements of 1, up to a break time value of 1
 */
  function handleDecrementBreak() {
    if (breakTime > 1) {
        setBreakTime(prevTime => prevTime-1);
      if (session == 'Break') {
        setMainTime((breakTime-1)*60);
      }
    }
    
  }
  /**
 * @function handleDecrementSession Handles decrement for session section and sets
 * session time value. Allows decrements of 1, up to a session time value of 1
 */
  function handleDecrementSession() {
    if (sessionTime > 1) {
        setSessionTime(prevTime => prevTime-1);
      if (session == 'Session') {
        setMainTime((sessionTime-1)*60);
      }
    }
  }
  /**
 * @function handleReset Handles reset button click, sets session and all times 
 * to default values, resets timer
 */
  function handleReset() {
    setBreakTime(5);
    setSessionTime(25);
    clearInterval(window.intervalId);
    window.intervalId = null;
    setSession("Session");
    setMainTime(1500);
    document.getElementById("start_stop").innerHTML = '⏵';
    let audio = document.getElementById("beep");
    audio.src = "";
    audio.removeAttribute('src');
    audio.src = 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav';
  }
  /**
 * @function sessionSwitch Switches session, plays audio when timer value hits 0, 
 * and continues timer using other session's time.
 */
  function sessionSwitch() {
    handleStop();
    window.intervalId = setInterval(decrementTime, 1000);
    let audio = document.getElementById("beep");
    audio.play();
    if (session == "Break") {
      setSession("Session");
      setMainTime(sessionTime*60);
    } else if (session == "Session") {
      setSession("Break");
      setMainTime(breakTime*60);
    }
  }
  return (
    <div className="container">
      <div className="top-div">
        <BreakSection handleInc={handleIncrementBreak} handleDec={handleDecrementBreak} time={breakTime} name={"Break"} />
        <SessionSection handleInc={handleIncrementSession} handleDec={handleDecrementSession} time={sessionTime} name={"Session"} />
      </div>
      <div className="timer-div">
        <Timer sessionSwitch={sessionSwitch} handlePlay={handlePlay} handleReset={handleReset} getTime={mainTime} setSession={setSession} session={session} />
      </div>
     </div>
  );
}
/**
 * @function App Container for {@link Clock}
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />

      </header>
    </div>
  );
}

export default App;
