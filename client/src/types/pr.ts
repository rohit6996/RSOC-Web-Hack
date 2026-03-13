import { FileSystemItem } from "@/types/file"
import { User } from "@/types/user"

export interface PullRequest {
    id: string
    title: string
    description: string
    files: FileSystemItem[]
    author: User
    createdAt: string
}

export interface Commit {
    id: string
    title: string
    description: string
    author: User
    createdAt: string
}

export interface PRContext {
    pullRequests: PullRequest[]
    commits: Commit[]
    createPR: (title: string, description: string) => void
    approvePR: (pr: PullRequest) => void
    rejectPR: (pr: PullRequest) => void
    setPullRequests: React.Dispatch<React.SetStateAction<PullRequest[]>>
    setCommits: React.Dispatch<React.SetStateAction<Commit[]>>
}
