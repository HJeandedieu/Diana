export default function ThinkingIndicator() {
  return (
    <div className="flex flex-col gap-3 py-4 w-full">
      <div className="flex flex-col w-full items-start">
        <div className="flex gap-2 justify-center items-center py-2">
          <div className="w-6 h-6 rounded-full border border-[#1E3550] flex items-center justify-center">
            <span className="text-[#C8D9E6] text-xs">D</span>
          </div>
          <span className="text-sm text-[#C8D9E6]">Diana</span>
        </div>
        <div className="flex items-center gap-1.5 px-1 py-2">
          <span
            className="w-2 h-2 rounded-full bg-[#567C8D] animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-[#567C8D] animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-[#567C8D] animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
