
export default function Alerta({ children }) {
    return (
        <div className="text-xs text-center my-2 bg-red-100 text-red-500 border-l-4 border-l-red-500 font-bold p-3 uppercase">
            {children}
        </div>
    )
}
