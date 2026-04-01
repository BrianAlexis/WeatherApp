import { CloudOff } from "lucide-react"

interface Props {
    message: string
}

const ErrorMessage = ({ message }: Props) => {
    return (
        <div className="bg-red-500/20 backdrop-blur-md border border-red-300/50 rounded-2xl p-6 text-white max-w-md">
            <div className="flex items-center gap-3">
                <CloudOff size={32} />
                <div>
                    <h3 className="font-semibold text-lg">{message}</h3>
                </div>
            </div>
        </div>
    )
}
export default ErrorMessage