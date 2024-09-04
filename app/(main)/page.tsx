import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Spacer } from "@nextui-org/spacer";

export default async function Home() {

  return (
    <>
    <Spacer className="lg:hidden" y={10} />
    <div className="flex flex-col justify-center gap-5 pt-4">
      <div className="border justify-center">
      <h1 className={title()}>Discover & &nbsp;</h1>
      <h1 className={title({ color: "violet" })}>Buy&nbsp;</h1>
      <br />
      <h1 className={title()}>
        auction real estate effortlessly, regardless of your experience.
      </h1>
      </div>
      <Image
        shadow="lg"
        alt="Card background"
        className="z-0 w-full object-cover"
        src="landing_bg1.png"
      />
      <div className="flex justify-center">
        <Button as={Link} color="warning" variant="shadow" className="w-[200px]" href="/properties">Browse Auction Listing</Button>
      </div>
    </div>
    </>
  )
}