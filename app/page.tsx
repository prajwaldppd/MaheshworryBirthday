"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Heart, Music, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Confetti from "./components/confetti"

export default function BirthdayPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioError, setAudioError] = useState(false)

  useEffect(() => {
    // Start confetti on page load
    setShowConfetti(true)

    // Create audio element with error handling
    const audio = new Audio()
    audio.src = "/birthday-song.mp3"
    audio.loop = true

    // Add error handling
    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e)
      setAudioError(true)
      setIsPlaying(false)
    })

    // Add canplaythrough event to ensure audio is loaded
    audio.addEventListener("canplaythrough", () => {
      console.log("Audio can play through")
    })

    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        // Use a promise with catch to handle play errors
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error("Play error:", error)
              setAudioError(true)
              setIsPlaying(false)
            })
        }
        return
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 dark:from-pink-900 dark:to-purple-950">
      {showConfetti && <Confetti />}

      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Music control */}
        <div className="fixed bottom-4 right-4 z-10">
          <Button
            onClick={toggleMusic}
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Music className="h-6 w-6" />}
          </Button>
          {audioError && (
            <div className="absolute right-0 bottom-12 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-3 py-1 rounded-md text-sm whitespace-nowrap">
              Unable to play audio
            </div>
          )}
        </div>

        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 dark:text-pink-400 mb-4">Happy Birthday! MaheshWorry</h1>
          <div className="relative w-full max-w-md h-40 md:h-60 mb-6">
            <Image
              src="/placeholder.jpg?height=40&width=480"
              alt="Birthday cake"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-xl md:text-2xl text-purple-700 dark:text-purple-300 max-w-2xl">
            Wishing you a fantastic day filled with joy, laughter, and wonderful memories!
          </p>
        </div>

        {/* Photo Gallery */}
        
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-600 dark:text-pink-400">
            Our Memories Together, well we didn't meet and make any memories sadly.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 w-full">
                  <Image
                    src={`/placeholder.jpg?height=300&width=400&text=Photo ${i}`}
                    alt={`Memory ${i}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Birthday Message */}
        <Card className="max-w-3xl mx-auto mb-16 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-pink-200 dark:border-pink-800">
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-pink-500 animate-pulse" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-pink-600 dark:text-pink-400">
              Dear Friend,
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              On your special day, I want to take a moment to celebrate you and all the joy you bring to my life. Your
              friendship means the world to me, and I'm so grateful for all the memories we've created together.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              May this year bring you endless happiness, success in all your endeavors, and countless reasons to smile.
              You deserve all the wonderful things life has to offer.
            </p>
            <p className="text-xl font-medium text-right text-pink-600 dark:text-pink-400 mt-6">
              With love and best wishes,
            </p>
            <p className="text-xl font-bold text-right text-pink-600 dark:text-pink-400">Your Friend</p>
          </CardContent>
        </Card>

        {/* Birthday Wishes */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-600 dark:text-pink-400">
            Birthday Wishes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              "May your day be as bright as your smile!",
              "Wishing you a year filled with beautiful moments!",
              "May all your dreams and wishes come true!",
              "Here's to another year of amazing adventures!",
            ].map((wish, i) => (
              <Card
                key={i}
                className="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 border-pink-200 dark:border-pink-800 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <p className="text-lg text-gray-700 dark:text-gray-300">{wish}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-6 bg-pink-200/50 backdrop-blur-sm dark:bg-pink-900/50 text-center">
        <p className="text-pink-700 dark:text-pink-300">Made with ❤️ for your birthday | {new Date().getFullYear()}</p>
      </footer>
    </main>
  )
}
