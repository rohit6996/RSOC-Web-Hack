import { Commit, PullRequest, PRContext as PRContextType } from "@/types/pr"
import { SocketEvent } from "@/types/socket"
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import toast from "react-hot-toast"
import { v4 as uuidv4 } from "uuid"
import { useAppContext } from "./AppContext"
import { useFileSystem } from "./FileContext"
import { useSocket } from "./SocketContext"

const PRContext = createContext<PRContextType | null>(null)

export const usePR = (): PRContextType => {
    const context = useContext(PRContext)
    if (!context) {
        throw new Error("usePR must be used within a PRContextProvider")
    }
    return context
}

export function PRContextProvider({ children }: { children: ReactNode }) {
    const { socket } = useSocket()
    const { currentUser } = useAppContext()
    const { fileStructure, updateDirectory, activeFile, setOpenFiles, setActiveFile } = useFileSystem()

    const [pullRequests, setPullRequests] = useState<PullRequest[]>([])
    const [commits, setCommits] = useState<Commit[]>([])

    // Listen for incoming PR requests
    useEffect(() => {
        const handleRequestPR = ({ pr }: { pr: PullRequest }) => {
            setPullRequests((prev) => [pr, ...prev])
            toast.success(`${pr.author.username} submitted a Pull Request: ${pr.title}`)
        }

        const handleUpdatePR = ({ pr, action }: { pr: PullRequest; action: "approve" | "reject" }) => {
            setPullRequests((prev) => prev.filter((p) => p.id !== pr.id))
            
            if (action === "approve") {
                // Add to history
                setCommits((prev) => [
                    {
                        id: uuidv4(),
                        title: pr.title,
                        description: pr.description,
                        author: pr.author,
                        createdAt: new Date().toISOString(),
                    },
                    ...prev,
                ])

                // Since PR merged, sync file context if not the one who approved (this is naive, usually host syncs this on next interaction, but we can do it locally too)
                
                // Open the first file from the PR if one exists
                const firstFile = pr.files.find(f => f.type === "file")
                // Or try searching deeper if the first top-level item wasn't a file
                let fileToOpen = firstFile
                if (!fileToOpen && pr.files.length > 0) {
                     const findDeepFile = (items: any[]): any => {
                         for (const item of items) {
                             if (item.type === "file") return item
                             if (item.children) {
                                 const f = findDeepFile(item.children)
                                 if (f) return f
                             }
                         }
                         return null
                     }
                     fileToOpen = findDeepFile(pr.files)
                }

                if (fileToOpen) {
                     setOpenFiles([fileToOpen])
                     setActiveFile(fileToOpen)
                }

                toast.success(`Pull Request '${pr.title}' was approved!`)
            } else {
                toast.error(`Pull Request '${pr.title}' was rejected.`)
            }
        }

        socket.on(SocketEvent.REQUEST_PR, handleRequestPR)
        socket.on(SocketEvent.UPDATE_PR, handleUpdatePR)

        return () => {
            socket.off(SocketEvent.REQUEST_PR, handleRequestPR)
            socket.off(SocketEvent.UPDATE_PR, handleUpdatePR)
        }
    }, [socket])

    const createPR = useCallback(
        (title: string, description: string) => {
            if (!currentUser) return

            // Deep clone to avoid mutating the live fileStructure
            const currentFiles = JSON.parse(JSON.stringify(fileStructure.children || []))
            
            // Inject the currently active file's unsaved content
            if (activeFile) {
                const injectActiveFile = (items: any[]) => {
                    for (const item of items) {
                        if (item.type === "file" && item.id === activeFile.id) {
                            item.content = activeFile.content
                        } else if (item.children) {
                            injectActiveFile(item.children)
                        }
                    }
                }
                injectActiveFile(currentFiles)
            }

            const newPR: PullRequest = {
                id: uuidv4(),
                title,
                description,
                files: currentFiles,
                author: currentUser,
                createdAt: new Date().toISOString(),
            }

            setPullRequests((prev) => [newPR, ...prev])
            socket.emit(SocketEvent.REQUEST_PR, { pr: newPR })
            toast.success("Pull Request created successfully!")
        },
        [currentUser, fileStructure, activeFile, socket]
    )

    const approvePR = useCallback(
        (pr: PullRequest) => {
            if (!currentUser) return // You could restrict this to host only later

            // Overwrite local file structure with PR's file structure
            updateDirectory(fileStructure.id, pr.files)

            // Remove PR and add commit history locally
            setPullRequests((prev) => prev.filter((p) => p.id !== pr.id))
            setCommits((prev) => [
                {
                    id: uuidv4(),
                    title: pr.title,
                    description: pr.description,
                    author: pr.author,
                    createdAt: new Date().toISOString(),
                },
                ...prev,
            ])

            socket.emit(SocketEvent.UPDATE_PR, { pr, action: "approve" })

            const firstFile = pr.files.find(f => f.type === "file")
            let fileToOpen = firstFile
            if (!fileToOpen && pr.files.length > 0) {
                 const findDeepFile = (items: any[]): any => {
                     for (const item of items) {
                         if (item.type === "file") return item
                         if (item.children) {
                             const f = findDeepFile(item.children)
                             if (f) return f
                         }
                     }
                     return null
                 }
                 fileToOpen = findDeepFile(pr.files)
            }

            if (fileToOpen) {
                 setOpenFiles([fileToOpen])
                 setActiveFile(fileToOpen)
            }

            toast.success("Pull Request approved! Codebase updated.")
        },
        [fileStructure.id, socket, updateDirectory, currentUser, setOpenFiles, setActiveFile]
    )

    const rejectPR = useCallback(
        (pr: PullRequest) => {
            setPullRequests((prev) => prev.filter((p) => p.id !== pr.id))
            socket.emit(SocketEvent.UPDATE_PR, { pr, action: "reject" })
            toast.success("Pull Request rejected.")
        },
        [socket]
    )

    return (
        <PRContext.Provider
            value={{
                pullRequests,
                commits,
                createPR,
                approvePR,
                rejectPR,
                setPullRequests,
                setCommits,
            }}
        >
            {children}
        </PRContext.Provider>
    )
}
