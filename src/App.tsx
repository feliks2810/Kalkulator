import { useEffect, useState } from 'react'
import './App.css'

type Operator = '+' | '−' | '×' | '÷'

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return 'Error'
  if (Math.abs(value) >= 1e14) return value.toExponential(6)
  return Number(value.toPrecision(12)).toString()
}

function App() {
  const [display, setDisplay] = useState('0')
  const [previous, setPrevious] = useState<number | null>(null)
  const [operator, setOperator] = useState<Operator | null>(null)
  const [waiting, setWaiting] = useState(false)
  const [expression, setExpression] = useState('')

  const inputDigit = (digit: string) => {
    if (display === 'Error') {
      setDisplay(digit)
      setExpression('')
      setPrevious(null)
      setOperator(null)
      setWaiting(false)
      return
    }

    if (waiting) {
      setDisplay(digit)
      setWaiting(false)
      return
    }

    setDisplay((current) =>
      current === '0' ? digit : current.length < 14 ? current + digit : current
    )
  }

  const inputDecimal = () => {
    if (display === 'Error' || waiting) {
      setDisplay('0.')
      setWaiting(false)
      return
    }

    if (!display.includes('.')) setDisplay((current) => current + '.')
  }

  const clear = () => {
    setDisplay('0')
    setPrevious(null)
    setOperator(null)
    setWaiting(false)
    setExpression('')
  }

  const backspace = () => {
    if (waiting || display === 'Error') {
      setDisplay('0')
      setWaiting(false)
      return
    }

    setDisplay((current) =>
      current.length <= 1 || (current.length === 2 && current.startsWith('-'))
        ? '0'
        : current.slice(0, -1)
    )
  }

  const toggleSign = () => {
    if (display === '0' || display === 'Error') return
    setDisplay((current) =>
      current.startsWith('-') ? current.slice(1) : '-' + current
    )
  }

  const percent = () => {
    if (display === 'Error') return
    setDisplay(formatNumber(Number(display) / 100))
    setWaiting(true)
  }

  const calculate = (a: number, b: number, op: Operator): number => {
    switch (op) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b === 0 ? NaN : a / b
    }
  }

  const chooseOperator = (nextOperator: Operator) => {
    if (display === 'Error') return

    const current = Number(display)

    if (previous !== null && operator && !waiting) {
      const result = calculate(previous, current, operator)
      const formatted = formatNumber(result)
      setDisplay(formatted)
      setPrevious(Number(formatted))
      setExpression(`${formatted} ${nextOperator}`)
    } else {
      setPrevious(current)
      setExpression(`${display} ${nextOperator}`)
    }

    setOperator(nextOperator)
    setWaiting(true)
  }

  const equals = () => {
    if (previous === null || operator === null || display === 'Error') return

    const result = calculate(previous, Number(display), operator)
    setExpression(`${previous} ${operator} ${display} =`)
    setDisplay(formatNumber(result))
    setPrevious(null)
    setOperator(null)
    setWaiting(true)
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) {
        inputDigit(event.key)
      } else if (event.key === '.') {
        inputDecimal()
      } else if (event.key === '+') {
        chooseOperator('+')
      } else if (event.key === '-') {
        chooseOperator('−')
      } else if (event.key === '*') {
        chooseOperator('×')
      } else if (event.key === '/') {
        event.preventDefault()
        chooseOperator('÷')
      } else if (event.key === 'Enter' || event.key === '=') {
        equals()
      } else if (event.key === 'Backspace') {
        backspace()
      } else if (event.key === 'Escape') {
        clear()
      } else if (event.key === '%') {
        percent()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  return (
    <main className="calculator">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">÷</div>
          <div>
            <span className="brand-name">CALCULATOR</span>
            <span className="brand-subtitle">Simple by design</span>
          </div>
        </div>
        <div className="status-dot" aria-label="Ready" />
      </header>

      <section className="display-panel" aria-live="polite">
        <div className="expression">{expression || '\u00A0'}</div>
        <div className={`display-value ${display.length > 9 ? 'compact' : ''}`}>
          {display}
        </div>
      </section>

      <section className="keypad" aria-label="Calculator keypad">
        <button className="key key-function" onClick={clear}>AC</button>
        <button className="key key-function" onClick={toggleSign}>±</button>
        <button className="key key-function" onClick={percent}>%</button>
        <button className="key key-operator" onClick={() => chooseOperator('÷')}>÷</button>

        <button className="key" onClick={() => inputDigit('7')}>7</button>
        <button className="key" onClick={() => inputDigit('8')}>8</button>
        <button className="key" onClick={() => inputDigit('9')}>9</button>
        <button className="key key-operator" onClick={() => chooseOperator('×')}>×</button>

        <button className="key" onClick={() => inputDigit('4')}>4</button>
        <button className="key" onClick={() => inputDigit('5')}>5</button>
        <button className="key" onClick={() => inputDigit('6')}>6</button>
        <button className="key key-operator" onClick={() => chooseOperator('−')}>−</button>

        <button className="key" onClick={() => inputDigit('1')}>1</button>
        <button className="key" onClick={() => inputDigit('2')}>2</button>
        <button className="key" onClick={() => inputDigit('3')}>3</button>
        <button className="key key-operator" onClick={() => chooseOperator('+')}>+</button>

        <button className="key key-zero" onClick={() => inputDigit('0')}>0</button>
        <button className="key" onClick={inputDecimal}>.</button>
        <button className="key key-equals" onClick={equals}>=</button>
      </section>

      <footer className="app-footer">
        <span>MADE FOR EVERYDAY</span>
        <span className="footer-line" />
        <span>v1.0</span>
      </footer>
    </main>
  )
}

export default App
