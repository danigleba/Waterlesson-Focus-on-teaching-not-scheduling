import Image from "next/image"

export default function FeaturedOn() {
    return (  
        <div className="flex items-center justify-center mx-6">
            <div className="flex flex-wrap justify-center items-center w-full gap-6 md:gap-12">
                <p className="text-[#acacac] md:text-sm">Featured on</p>
                <div>
                    <Image alt="reddit log" width={130} height={130} src="/logos/producthunt.png" />
                </div>
                <div>
                    <Image alt="reddit log" width={130} height={130} src="/logos/hackernews.png" />
                </div>                
                <div>
                    <Image alt="reddit log" width={35} height={35} src="/logos/x.png" />
                </div>                
                <div>
                    <Image alt="reddit log" width={100} height={100} src="/logos/reddit.png" />
                </div>            
            </div>
        </div>
    )
}