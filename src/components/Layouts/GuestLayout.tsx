import { ReactNode } from "react";

interface LayoutPropsType {
    children?: ReactNode
}

export default function GuestLayout({ children }: LayoutPropsType) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}