"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./editor"), { ssr: false });

export default function PostEditor() {
  return <Editor docId="1" content={""} />;
}
