interface IUserCardProps {
  name: string
  image: string
}

export default function UserCard({name, image}: IUserCardProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="min-w-0">
        <img
          className="size-10 rounded-md"
          src={image}
          alt={`user - ${name}`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-left text-md font-medium text-foreground">
          {name}
        </p>
      </div>
    </div>
  )
}