import { motion } from "framer-motion"
import {
    Code2,
    MessageSquare,
    Pencil,
    Languages,
    Play,
    Sparkles,
} from "lucide-react"

const features = [
    {
        icon: Code2,
        title: "Real-Time Editing",
        description:
            "Collaborate on code simultaneously with your team. See changes appear instantly as others type.",
    },
    {
        icon: MessageSquare,
        title: "Group Chat",
        description:
            "Built-in messaging to discuss ideas, debug together, and coordinate without leaving the editor.",
    },
    {
        icon: Pencil,
        title: "Drawing Board",
        description:
            "Sketch diagrams, wireframes, and flowcharts on a shared canvas to visualize your ideas.",
    },
    {
        icon: Languages,
        title: "Multi-Language Support",
        description:
            "Write in JavaScript, Python, C++, and many more languages with full syntax highlighting.",
    },
    {
        icon: Play,
        title: "Run Code",
        description:
            "Execute your code directly in the browser and see output in real time — no setup required.",
    },
    {
        icon: Sparkles,
        title: "AI Copilot",
        description:
            "Get AI-powered code generation and suggestions to accelerate your development workflow.",
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
}

function FeaturesSection() {
    return (
        <section className="w-full px-6 py-24 sm:px-12 lg:px-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
            >
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                    Everything you need to{" "}
                    <span className="gradient-text">build together</span>
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-400">
                    A complete collaborative development environment packed with
                    powerful features.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            className="glass-card group p-6"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                                <Icon size={24} />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-white">
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-400">
                                {feature.description}
                            </p>
                        </motion.div>
                    )
                })}
            </motion.div>
        </section>
    )
}

export default FeaturesSection
