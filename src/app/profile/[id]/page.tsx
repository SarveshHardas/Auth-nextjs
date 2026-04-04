type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function UserProfile({ params }: Props) {

  const { id } = await params

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>

      <p className="text-4xl">
        This is the profile page of user:
        <span className="p-2 rounded bg-orange-500 text-black">
          {id}
        </span>
      </p>

    </div>
  )
}