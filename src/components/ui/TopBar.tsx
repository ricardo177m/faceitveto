export default function TopBar() {
  return (
    <div className="w-full border-b border-b-dark-600 py-6 px-4 mb-4 flex flex-row gap-4 items-center">
      <img src="/images/faceitveto.svg" alt="Logo" className="w-48 h-8 mr-2" />
      <div>
        <span className="py-1 px-2 rounded-md bg-dark-600 text-sm">Beta</span>
      </div>
    </div>
  );
}
