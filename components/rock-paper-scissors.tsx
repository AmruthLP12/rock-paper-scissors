"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Hand, Square } from 'lucide-react'

type Choice = 'rock' | 'paper' | 'scissors'

export default function RockPaperScissors() {
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [tieScore, setTieScore] = useState(0)
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null)
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const choices: Choice[] = ['rock', 'paper', 'scissors']

  const getComputerChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex]
  }

  const determineWinner = (player: Choice, computer: Choice): string => {
    if (player === computer) {
      setTieScore(prevScore => prevScore + 1)
      return "It's a tie!"
    }
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      setPlayerScore(prevScore => prevScore + 1)
      return 'You win!'
    } else {
      setComputerScore(prevScore => prevScore + 1)
      return 'Computer wins!'
    }
  }

  const handleChoice = (choice: Choice) => {
    const computerChoice = getComputerChoice()
    setPlayerChoice(choice)
    setComputerChoice(computerChoice)
    const gameResult = determineWinner(choice, computerChoice)
    setResult(gameResult)
  }

  const getIcon = (choice: Choice) => {
    switch (choice) {
      case 'rock':
        return <Square className="w-12 h-12" />
      case 'paper':
        return <Hand className="w-12 h-12" />
      case 'scissors':
        return <Scissors className="w-12 h-12" />
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Rock Paper Scissors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2">Scoreboard</h2>
          <p>Player: {playerScore} | Computer: {computerScore} | Ties: {tieScore}</p>
        </div>
        <div className="flex justify-center gap-4 mb-6">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              className="p-4 bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
              aria-label={choice}
            >
              {getIcon(choice)}
            </button>
          ))}
        </div>
        {playerChoice && computerChoice && (
          <div className="text-center">
            <div className="flex justify-center gap-8 mb-4">
              <div>
                <p className="mb-2">You chose:</p>
                {getIcon(playerChoice)}
              </div>
              <div>
                <p className="mb-2">Computer chose:</p>
                {getIcon(computerChoice)}
              </div>
            </div>
            <p className="text-lg font-semibold">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

