import { useState, useEffect, createContext, useContext, ReactNode } from "react"

interface MobileUser {
  id: string
  email: string
  phone: string
  fullName: string
  payAfricaId: string
  solanaAddress: string
  balance: number
  country: string
  createdAt: string
}

interface MobileAuthContextType {
  user: MobileUser | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  updateBalance: (amount: number) => void
  setPayAfricaId: (id: string) => void
  setSolanaAddress: (address: string) => void
}

const MobileAuthContext = createContext<MobileAuthContextType | undefined>(undefined)

// Generate PayAfrica ID from name
function generatePayAfricaId(name: string): string {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, ".")
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${cleanName}.${random}`
}

// Generate mock Solana address
function generateSolanaAddress(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  let address = ""
  for (let i = 0; i < 44; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return address
}

const STORAGE_KEY = "payafrica_mobile_user"

export function MobileAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MobileUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for existing user
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const saveUser = (userData: MobileUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    setUser(userData)
  }

  const signUp = async (email: string, _password: string, fullName: string) => {
    try {
      setLoading(true)

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newUser: MobileUser = {
        id: `user_${Date.now()}`,
        email,
        phone: "",
        fullName,
        payAfricaId: generatePayAfricaId(fullName),
        solanaAddress: generateSolanaAddress(),
        balance: 0,
        country: "NG",
        createdAt: new Date().toISOString(),
      }

      saveUser(newUser)
      return { error: null }
    } catch (error) {
      console.error("Signup error:", error)
      return { error: error as Error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, _password: string) => {
    try {
      setLoading(true)

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Check for existing user
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.email === email) {
          setUser(parsed)
          return { error: null }
        }
      }

      // Create demo user if not exists
      const demoUser: MobileUser = {
        id: `user_demo_${Date.now()}`,
        email,
        phone: "",
        fullName: "Demo User",
        payAfricaId: generatePayAfricaId("Demo User"),
        solanaAddress: generateSolanaAddress(),
        balance: 245.23,
        country: "NG",
        createdAt: new Date().toISOString(),
      }

      saveUser(demoUser)
      return { error: null }
    } catch (error) {
      console.error("Login error:", error)
      return { error: error as Error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount }
      saveUser(updatedUser)
    }
  }

  const setPayAfricaId = (id: string) => {
    if (user) {
      const updatedUser = { ...user, payAfricaId: id }
      saveUser(updatedUser)
    }
  }

  const setSolanaAddress = (address: string) => {
    if (user) {
      const updatedUser = { ...user, solanaAddress: address }
      saveUser(updatedUser)
    }
  }

  return (
    <MobileAuthContext.Provider
      value={{ user, loading, signUp, signIn, signOut, updateBalance, setPayAfricaId, setSolanaAddress }}
    >
      {children}
    </MobileAuthContext.Provider>
  )
}

export function useMobileAuth() {
  const context = useContext(MobileAuthContext)
  if (!context) {
    throw new Error("useMobileAuth must be used within MobileAuthProvider")
  }
  return context
}
