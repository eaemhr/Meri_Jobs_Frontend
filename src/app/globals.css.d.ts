// This file tells TypeScript that importing CSS is valid
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}