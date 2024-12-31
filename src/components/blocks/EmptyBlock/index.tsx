import { Icon } from "@phosphor-icons/react"

interface IEmptyBlockProps {
  text: string
  icon: Icon
}

export default function EmptyBlock({text, icon: IconElement}: IEmptyBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 h-full">
      <IconElement size={60} className="text-muted-foreground" weight="light" />
      <p className="text-sm text-muted-foreground">
        {text}
      </p>
    </div>
  )
}