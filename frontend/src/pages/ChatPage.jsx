import ChatAssistant from "../components/ChatAssistant";

export default function ChatPage() {
  return (
    <main className="min-h-[75vh] bg-[radial-gradient(ellipse_at_50%_0%,rgba(187,247,208,0.34),transparent_42%),linear-gradient(180deg,#f5faf5_0%,#fbfdfb_360px)] py-3 sm:py-5">
      <div className="section-container flex justify-center">
        <ChatAssistant />
      </div>
    </main>
  );
}
