import { motion } from "framer-motion"
import { ArrowRight, Terminal, Braces, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"
import FeaturesSection from "@/components/landing/FeaturesSection"

function WelcomePage() {
    const navigate = useNavigate()

    return (
        <div className="gradient-bg min-h-screen text-white">
            {/* Decorative floating elements */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div
                    className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full opacity-[0.03]"
                    style={{
                        background:
                            "radial-gradient(circle, #39E079 0%, transparent 70%)",
                        animation: "float 6s ease-in-out infinite",
                    }}
                />
                <div
                    className="absolute right-[15%] top-[60%] h-96 w-96 rounded-full opacity-[0.03]"
                    style={{
                        background:
                            "radial-gradient(circle, #34d8eb 0%, transparent 70%)",
                        animation: "float 8s ease-in-out infinite 2s",
                    }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
                {/* Floating icon accents */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute left-[8%] top-[25%] hidden text-primary lg:block"
                >
                    <Terminal size={48} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute right-[8%] top-[30%] hidden text-primary lg:block"
                >
                    <Braces size={40} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-[25%] left-[15%] hidden text-primary lg:block"
                >
                    <Zap size={36} />
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8"
                >
                    <span className="glass-card inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-300">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                        Open Source & Free
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                >
                    Real-Time Collaborative{" "}
                    <span className="gradient-text">Code Editor</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-4 text-xl font-medium text-gray-300 sm:text-2xl"
                >
                    Code together. Build together.{" "}
                    <span className="text-primary">Anywhere.</span>
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-10 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg"
                >
                    Create a room, invite your team, and start building
                    together. Write code in real time, run programs, sketch
                    ideas on a shared drawing board, and communicate through
                    built-in group chat — all in one place.
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(57, 224, 121, 0.3)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/join")}
                    className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-emerald-400 px-8 py-4 text-lg font-semibold text-gray-900 transition-all"
                >
                    Let's Work
                    <ArrowRight
                        size={20}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </motion.button>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-8"
                >
                    <div className="flex flex-col items-center gap-2 text-xs text-gray-500">
                        <span>Scroll to explore</span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="h-6 w-4 rounded-full border border-gray-600 p-1"
                        >
                            <div className="h-1.5 w-full rounded-full bg-gray-500" />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <FeaturesSection />

            {/* Footer */}
            <footer className="border-t border-white/5 px-6 py-8 text-center text-sm text-gray-500">
                <p>
                    Built with 💚 by the{" "}
                    <span className="text-primary">Code Fusion</span> team
                </p>
            </footer>
        </div>
    )
}

export default WelcomePage
