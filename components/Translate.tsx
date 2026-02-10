'use client';

export default function Translate() {
  return (
    <div id="libre-container">
      <h1>LibreTranslate</h1>
      <iframe
        title="LibreTranslate"
        src="https://libretranslate.com/?source=ja&target=en"
        style={{ width: '100%', height: '70vh', border: 0 }}
      />
    </div>
  );
}