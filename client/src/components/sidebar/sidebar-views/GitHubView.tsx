import { useState } from "react"
import { PiGitPullRequest, PiGitCommit, PiGitBranch } from "react-icons/pi"
import toast from "react-hot-toast"
import { usePR } from "@/context/PRContext"

function GitHubView() {
    const { pullRequests, commits, createPR, approvePR, rejectPR } = usePR()
    const [activeTab, setActiveTab] = useState<"prs" | "commits">("prs")
    const [newPrTitle, setNewPrTitle] = useState("")

    const handleCreatePR = () => {
        if (!newPrTitle.trim()) {
            return toast.error("Please enter a title for the Pull Request")
        }
        createPR(newPrTitle, "")
        setNewPrTitle("")
    }

    return (
        <div className="flex h-full flex-col gap-4 p-4 text-white">
            <h1 className="flex items-center gap-2 text-xl font-bold">
                <PiGitBranch size={24} /> Version Control
            </h1>

            {/* Create PR Section */}
            <div className="flex flex-col gap-2 rounded-lg bg-darkHover p-3">
                <label className="text-sm font-semibold text-gray-300">Push My Changes</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newPrTitle}
                        onChange={(e) => setNewPrTitle(e.target.value)}
                        className="w-full rounded-md border-none bg-dark px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Commit message / PR Title"
                        onKeyDown={(e) => e.key === "Enter" && handleCreatePR()}
                    />
                    <button
                        onClick={handleCreatePR}
                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-black hover:bg-primary/90"
                    >
                        Push
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-darkHover pb-2 text-sm mt-2">
                <button
                    onClick={() => setActiveTab("prs")}
                    className={`flex items-center gap-1 ${activeTab === "prs" ? "text-primary" : "text-gray-400 hover:text-white"}`}
                >
                    <PiGitPullRequest size={18} /> Pull Requests ({pullRequests.length})
                </button>
                <button
                    onClick={() => setActiveTab("commits")}
                    className={`flex items-center gap-1 ${activeTab === "commits" ? "text-primary" : "text-gray-400 hover:text-white"}`}
                >
                    <PiGitCommit size={18} /> History ({commits.length})
                </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {activeTab === "prs" ? (
                    pullRequests.length > 0 ? (
                        pullRequests.map((pr) => (
                            <div
                                key={pr.id}
                                className="mb-3 block rounded-lg bg-darkHover p-3 transition-colors"
                            >
                                <div className="mb-2 text-sm font-semibold leading-tight text-white">
                                    {pr.title}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                    <span>By {pr.author.username}</span>
                                    <span>•</span>
                                    <span>{new Date(pr.createdAt).toLocaleTimeString()}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => approvePR(pr)}
                                        className="flex-1 rounded-md bg-green-600/20 text-green-500 py-1.5 text-xs font-semibold hover:bg-green-600/30"
                                    >
                                        Approve & Merge
                                    </button>
                                    <button
                                        onClick={() => rejectPR(pr)}
                                        className="flex-1 rounded-md bg-red-600/20 text-red-500 py-1.5 text-xs font-semibold hover:bg-red-600/30"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 mt-4 text-sm">No open pull requests.</div>
                    )
                ) : (
                    commits.length > 0 ? (
                        commits.map((c) => (
                            <div
                                key={c.id}
                                className="mb-3 block rounded-lg bg-darkHover p-3 transition-colors"
                            >
                                <div className="mb-1 text-sm font-semibold leading-tight text-white">
                                    {c.title}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span>Merged by {c.author.username}</span>
                                    <span>•</span>
                                    <span>{new Date(c.createdAt).toLocaleTimeString()}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 mt-4 text-sm">No update history yet.</div>
                    )
                )}
            </div>
        </div>
    )
}

export default GitHubView
