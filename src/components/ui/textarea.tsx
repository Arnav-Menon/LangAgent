import React from "react";

export function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const baseStyles = "w-full rounded border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";
  
  return <textarea className={`${baseStyles} ${className}`} {...props} />;
}

export default Textarea;